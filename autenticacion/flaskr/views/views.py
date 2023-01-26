from ..models import UsuarioSchema, db, UsuarioMedico, Usuario, Ubicacion, UbicacionSchema, UsuarioMedicoSchema, EspecialidadSchema, Especialidad, Rol
from ..models.logica import Logica
from flask_restful import Resource
from flask import request

usuario_schema = UsuarioSchema()
ubicacion_schema = UbicacionSchema()
usuario_medico_schema = UsuarioMedicoSchema()
especialidad_schema = EspecialidadSchema()

class RegistroView(Resource):
    def __init__(self, **kwargs):
       self.user_manager= kwargs['user_manager']

    def post(self):
        if request.json["password1"] != request.json["password2"] :
            return {"message":"La confirmación de la contraseña es inválida"}, 400

        usuario = Usuario.query.filter(Usuario.email == request.json["email"]).first()
        if usuario is not None:
            return {"message":"El usuario ya existe"}, 400

        if request.json["tipo_usuario"] == "MEDICO":
            password = request.json["password1"]
            email = request.json["email"]
            nombre = request.json["nombre"]
            direccion = request.json["direccion"]

            logica = Logica()
            ubicacion = logica.ubicacion_valida(request.json["pais"],request.json["ciudad"])
            if ubicacion is None:
                return {"message":"ubicacion no valida"}, 400

            especialidad = logica.especialidad_valida(request.json["especialidad"])
            if especialidad is None:
                return {"message":"especialidad no valida"}, 400

            licencia = request.json["licencia"]
            medico = Rol.query.filter(Rol.nombre=='Medico').first()
            
            logica.crear_usuario(self.user_manager,password,email,nombre,direccion,ubicacion.id,licencia,especialidad.id,medico)

        return {"message":"usuario creado exitosamente"}, 200