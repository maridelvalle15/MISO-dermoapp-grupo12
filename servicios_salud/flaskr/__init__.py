from flask import Flask
import os

def create_app(config_name):

    app = Flask(__name__)
    
    if (os.environ.get("DB_URI")) is not None :
        app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_URI")
    else : 
        app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/salud.db"

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    return app