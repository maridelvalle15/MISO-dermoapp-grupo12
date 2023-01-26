from ..models import UsuarioSchema, db, UsuarioMedico, Usuario, Ubicacion, UbicacionSchema, UsuarioMedicoSchema, EspecialidadSchema, Especialidad
from flask_restful import Resource
from flask import request

usuario_schema = UsuarioSchema()
ubicacion_schema = UbicacionSchema()
usuario_medico_schema = UsuarioMedicoSchema()
especialidad_schema = EspecialidadSchema()

class RegistroView(Resource):

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
            ubicacion = Ubicacion.query.filter(
                Ubicacion.pais == request.json["pais"],Ubicacion.ciudad == request.json["ciudad"]
            ).first().id
            licencia = request.json["licencia"]
            especialidad = Especialidad.query.filter(Especialidad.nombre==request.json["especialidad"]).first().id
            nuevo_usuario = UsuarioMedico(
                password=password,email=email,nombre=nombre,direccion=direccion,ubicacion_id=ubicacion,licencia=licencia,especialidad_id=especialidad)
        db.session.add(nuevo_usuario)
        db.session.commit()

        return {"message":"usuario creado exitosamente"}, 200