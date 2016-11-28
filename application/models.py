from index import db, bcrypt
from sqlalchemy.orm import relationship

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))

    def __init__(self, email, password):
        self.email = email
        self.active = True
        self.password = User.hashed_password(password)

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password)

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None


class Sensor(db.Model):
    __tablename__ = 'sensor'

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(255), unique=True)
    sensor_type = db.Column(db.Enum('boolean', 'scalar', 'vector', name='sensor_types'))

    readings = relationship("DataPoint", back_populates="sensor")

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'sensor_type': self.sensor_type
        }


class DataPoint(db.Model):
    __tablename__ = 'data_point'

    id = db.Column(db.Integer(), primary_key=True)
    date = db.Column(db.DateTime)
    sensor_id = db.Column(db.Integer, db.ForeignKey('sensor.id'))
    sensor = relationship("Sensor", back_populates="readings")
    type = db.Column(db.String(50))

    __mapper_args__ = {
        'polymorphic_identity':'data_point',
        'polymorphic_on':type
    }

    def serialize_point(self):
        obj = {
            'id': self.id,
            'date': str(self.date),
            'type': self.type,
            'sensor_id': self.sensor_id,
        }

        if self.type == 'boolean_data_point':
            obj['value'] = self.boolean_value
        elif self.type == 'scalar_data_point':
            obj['value'] = self.scalar_value
        elif self.type == 'vector_data_point':
            obj['value'] = map(lambda field: field.value, self.fields)

        return obj


    @staticmethod
    def createDataPoint(sensor, data):
        if sensor.sensor_type == 'boolean':
            return BooleanDataPoint(sensor=sensor, boolean_value=data)
        if sensor.sensor_type == 'scalar':
            return ScalarDataPoint(sensor=sensor, scalar_data=data)
        if sensor.sensor_type == 'vector':
            point = VectorDataPoint(sensor=sensor)
            for place, value in enumerate(data):
                point.fields.append(VectorField(place=place, value=value))
            return point


class BooleanDataPoint(DataPoint):
    __tablename__ = 'boolean_data_point'

    id = db.Column(db.Integer(), db.ForeignKey('data_point.id'), primary_key=True)
    boolean_value = db.Column(db.Boolean)

    __mapper_args__ = {
        'polymorphic_identity':'boolean_data_point',
    }


class ScalarDataPoint(DataPoint):
    __tablename__ = 'scalar_data_point'

    id = db.Column(db.Integer(), db.ForeignKey('data_point.id'),
        primary_key=True)
    scalar_value = db.Column(db.Float())

    __mapper_args__ = {
        'polymorphic_identity': 'scalar_data_point'
    }


class VectorDataPoint(DataPoint):
    __tablename__ = 'vector_data_point'

    id = db.Column(db.Integer(), db.ForeignKey('data_point.id'), primary_key=True)
    dimension = db.Column(db.Integer())
    fields = relationship('VectorField', order_by='VectorField.place', back_populates='data_point')


    __mapper_args__ = {
        'polymorphic_identity': 'vector_data_point',
    }


class VectorField(db.Model):
    __tablename__ = 'vector_field'

    id = db.Column(db.Integer(), primary_key=True)
    data_point_id = db.Column(db.Integer(), db.ForeignKey('data_point.id'))
    data_point = relationship('VectorDataPoint', back_populates='fields')

    place = db.Column(db.Integer())
    value = db.Column(db.Float())

