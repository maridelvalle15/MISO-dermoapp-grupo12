from flask import Flask

def create_app(nombre):
    app = Flask(nombre)
    return app