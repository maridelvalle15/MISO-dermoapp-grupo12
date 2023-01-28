from flask import Flask
import os

def create_app(config_name):

    app = Flask(__name__)
    print(os.environ.get("DB_URI"))
    if (os.environ.get("DB_URI")) is not None :
        app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_URI")
    else : 
        app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://user:password@localhost/gastronomia"

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['USER_EMAIL_SENDER_EMAIL'] = "email@email.com"
    app.config['SECRET_KEY'] = "key"

    return app