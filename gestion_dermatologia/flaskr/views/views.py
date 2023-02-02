from flask_restful import Resource
from flask import request
import requests


class SuministroLesionView(Resource):

    def post(self):

        return {"message":"hola"}, 200