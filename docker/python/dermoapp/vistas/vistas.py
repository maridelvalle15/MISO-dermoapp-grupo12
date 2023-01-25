from flask_restful import Resource

class VistaBasica(Resource):
    def get(self):
        return "hola amigos"