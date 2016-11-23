from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from application.app import app, db, socketio

migrate = Migrate(app, db)
manager = Manager(app)

# migrations
manager.add_command('db', MigrateCommand)

manager.add_command("run", socketio.run(
    app,
    host='127.0.0.1',
    port=5000,
    use_reloader=False)
)


@manager.command
def create_db():
    """Creates the db tables."""
    db.create_all()


if __name__ == '__main__':
    manager.run()
