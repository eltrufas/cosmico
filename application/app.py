from flask import request, render_template, jsonify, url_for, redirect, g, Response
from models import User, BooleanDataPoint, Sensor, DataPoint
from index import app, db, socketio
from sqlalchemy.exc import IntegrityError
from sqlalchemy import and_, desc
from flask_socketio import emit
from .utils.auth import generate_token, requires_auth, verify_token
from datetime import datetime

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/<path:path>', methods=['GET'])
def any_path(path):
    return render_template('index.html')


@app.route("/api/user", methods=["GET"])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)


@app.route("/api/create_user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    user = User(
        email=incoming["email"],
        password=incoming["password"]
    )
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exists"), 409

    new_user = User.query.filter_by(email=incoming["email"]).first()

    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )


@app.route("/api/get_token", methods=["POST"])
def get_token():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])
    if user:
        return jsonify(token=generate_token(user))

    return jsonify(error=True), 403


@app.route("/api/is_token_valid", methods=["POST"])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403

@app.route("/example_data")
def example_data():
    sensor = db.session.query(Sensor).one()
    dp = BooleanDataPoint(sensor=sensor, value=True)
    db.session.add(dp)
    db.session.commit()

    return 'xD'


@app.route('/api/submit_data', methods=['POST'])
@requires_auth
def submit_data():
    data = request.get_json()

    sensors = {}
    for data_point in data:
        if data_point['sensor_id'] not in sensors:
            sensor = Sensor.query.filter_by(id=data_point['sensor_id']).one()
            sensors[data_point['sensor_id']] = sensor
        else:
            sensor = sensors[data_point['sensor_id']]
        dp = DataPoint.createDataPoint(sensor, data_point['data'])
        dp.date = datetime.fromtimestamp(data_point['date'])

        db.session.add(dp)

    socketio.emit('new_data_point', data, namespace='/api/submit_data')

    db.session.commit()

    return jsonify(success=True)


@app.route('/api/get_data', methods=['POST'])
def get_data():
    data = request.get_json()

    since = datetime.fromtimestamp(float(request.args.get('since') or 0))
    limit = request.args.get('limit') or 100

    sensors = data['sensors']

    if since is None:
        return 'xD', 400

    sensor_ids = map(lambda sensor_id: Sensor.query.get(sensor_id).id, sensors)

    points = db.session.query(DataPoint).filter(and_(DataPoint.sensor_id.in_(sensor_ids), DataPoint.date >= since)).order_by(desc(DataPoint.date)).limit(limit).all()

    return jsonify(map(DataPoint.serialize_point, points))


@app.route('/api/get_frequencies', methods=['POST'])
def get_frequencies():
    data = request.get_json()

    since = datetime.fromtimestamp(float(request.args.get('since')))

    sensors = data['sensors']

    if since is None:
        return 'xD', 400

    results = {}

    for id in sensors:
        results[id] = db.session.query(DataPoint).filter(and_(DataPoint.sensor_id == id, DataPoint.date >= since)).count()

    return jsonify(results)


@app.route('/api/get_individual_data', methods=['POST'])
def get_individual_data():
    data = request.get_json()
    since = datetime.fromtimestamp(float(request.args.get('since')))
    sensors = data['sensors']


    if since is None:
        return 'xD', 400

    results = {}

    for id in sensors:
        print(id)
        points = db.session.query(DataPoint).filter(and_(DataPoint.sensor_id ==
          id, DataPoint.date >= since))
        results[id] = map(DataPoint.serialize_point, points)

    return jsonify(results)


@app.route('/api/download_data', methods=['get'])
def download_data():
    data = request.get_json()
    since = datetime.fromtimestamp(float(request.args.get('since')))
    until = datetime.fromtimestamp(float(request.args.get('until')))

    query = db.session.query(DataPoint).filter(
        and_(DataPoint.date >= since,
        DataPoint.date <= until,
        DataPoint.type == 'boolean_data_point'
    ))
    result = map(DataPoint.serialize_point, query)
    csv = 'Placa,Fecha\n'
    for point in result:
        print point['type']
        csv += str(point['sensor_id']) + ',' + str(point['date']) + '\n'
    return Response(
        csv,
        mimetype="text/csv",
        headers={"Content-disposition":
                 "attachment; filename=datos.csv"})


@app.route('/api/get_sensors', methods=['POST'])
def get_sensors():
    data = request.get_json()
    sensors = data['sensors']

    sensors = map(lambda sensor_id: Sensor.query.get(sensor_id), sensors)

    return jsonify(map(Sensor.serialize, sensors))
