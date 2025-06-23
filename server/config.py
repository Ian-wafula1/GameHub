from flask_bcrypt import Bcrypt
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()

app = Flask(__name__)
app.secret_key = b'\r\xdd}\xa1\x1dK\x11\xe2\xef\xc1\x99\xb2:\xc8\xcc\x0e'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///games.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.sort_keys = True
app.json.compact = False

db.init_app(app)
migrate = Migrate(app, db)

bcrypt = Bcrypt(app)
CORS(app)

api = Api(app)