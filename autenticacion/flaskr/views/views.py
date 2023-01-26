from ..models import UsuarioSchema
from flask_restful import Resource

usuario_schema = UsuarioSchema()

class RegistroView(Resource):

    def get(self):
        return {"message":"usuario creado exitosamente"}, 200