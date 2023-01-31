from ..models import UsuarioSchema, db, UsuarioMedico, Usuario, Ubicacion, UbicacionSchema, UsuarioMedicoSchema, EspecialidadSchema, Especialidad, Rol
from ..models.logica import Logica
from flask_restful import Resource
from flask import request
import secrets

usuario_schema = UsuarioSchema()
ubicacion_schema = UbicacionSchema()
usuario_medico_schema = UsuarioMedicoSchema()
especialidad_schema = EspecialidadSchema()

class RegistroView(Resource):
    def __init__(self, **kwargs):
       self.user_manager= kwargs['user_manager']
       self.logica = Logica()

    def post(self):
        usuario = self.logica.usuario_valido(email=request.json["email"])
        if usuario is not None:
            return {"message":"El usuario ya existe"}, 400

        if request.json["tipo_usuario"] == "MEDICO":
            email = request.json["email"]
            nombre = request.json["nombre"]
            direccion = request.json["direccion"]

            
            ubicacion = self.logica.ubicacion_valida(request.json["pais"],request.json["ciudad"])
            if ubicacion is None:
                return {"message":"ubicacion no valida"}, 400

            especialidad = self.logica.especialidad_valida(request.json["especialidad"])
            if especialidad is None:
                return {"message":"especialidad no valida"}, 400

            licencia = request.json["licencia"]
            medico = Rol.query.filter(Rol.nombre=='Medico').first()
            
            longitud_password = 13
            password = secrets.token_urlsafe(longitud_password)

            self.logica.crear_usuario(self.user_manager,password,email,nombre,direccion,ubicacion.id,licencia,especialidad.id,medico)

        return {"message":"usuario creado exitosamente", "password": password}, 200

    def get(self):
        return {"message":"hola"}, 200