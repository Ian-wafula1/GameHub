from flask_bcrypt import Bcrypt
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy import MetaData
from flask_jwt_extended import  JWTManager
import string, random, os
from dotenv import load_dotenv

load_dotenv()
metadata = MetaData()

db = SQLAlchemy(metadata=metadata)

def generate_receipt(length=12):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

authorizations = {
    'Bearer': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    }
}

app = Flask(
    __name__,
    static_url_path='',
    static_folder='static',
)
app.secret_key = b'\r\xdd}\xa1\x1dK\x11\xe2\xef\xc1\x99\xb2:\xc8\xcc\x0e'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = b'\r\xdd}\xa1\x1dK\x11\xe2\xef\xc1\x99\xb2:\xc8\xcc\x0e'
app.json.sort_keys = True
app.json.compact = False

jwt = JWTManager(app)

db.init_app(app)
migrate = Migrate(app, db)

bcrypt = Bcrypt(app)
CORS(app)

api = Api(app, doc=False)