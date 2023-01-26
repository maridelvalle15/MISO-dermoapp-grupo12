from flask import Flask
import os

def create_app(config_name):

    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://user:password@localhost/gastronomia"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    return app