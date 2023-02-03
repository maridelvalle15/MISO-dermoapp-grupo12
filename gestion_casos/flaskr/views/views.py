from flask_restful import Resource

class HolaView(Resource):
    def get(self):
        return "hola"