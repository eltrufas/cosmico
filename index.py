from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import BaseConfig
from flask_bcrypt import Bcrypt
from flask_socketio import SocketIO

app = Flask(__name__, static_folder="./static/build/static",
    template_folder="./static/build")
app.config.from_object(BaseConfig)
socketio = SocketIO(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
