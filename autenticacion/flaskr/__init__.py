from flask import Flask
import os

def create_app(config_name):

    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://user:password@localhost/gastronomia"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['USER_EMAIL_SENDER_EMAIL'] = "email@email.com"
    app.config['SECRET_KEY'] = "key"

    return app