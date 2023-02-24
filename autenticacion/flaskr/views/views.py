from ..models import UsuarioSchema, db, UsuarioRol, Usuario, UbicacionSchema, UsuarioMedicoSchema, EspecialidadSchema, UsuarioMedico, Rol, Especialidad, UsuarioPaciente, Ubicacion
from ..models.logica import Logica
from .logica import procesar_imagen, mapear_tipo_piel
from flask_restful import Resource
from flask import request, jsonify
import secrets, datetime, os
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

usuario_schema = UsuarioSchema()
ubicacion_schema = UbicacionSchema()
usuario_medico_schema = UsuarioMedicoSchema()
especialidad_schema = EspecialidadSchema()

class RegistroView(Resource):
    def __init__(self, **kwargs):
       self.user_manager= kwargs['user_manager']
       self.logica = Logica()

    def post(self):
        
        if request.form.to_dict() != {}:
            request_data = request.form.to_dict()
        else:
            request_data = request.json

        email = request_data["correo"]
        nombre = request_data["nombre"]

        usuario = self.logica.usuario_valido(email=email)
        
        if usuario is not None:
            return {"message":"El usuario ya existe"}, 400

        ubicacion = self.logica.ubicacion_valida(request_data["pais"],request_data["ciudad"])

        if ubicacion is None:
            return {"message":"ubicacion no valida"}, 400

        longitud_password = 6
        password = secrets.token_urlsafe(longitud_password)

        if request_data["tipousuario"] == "MEDICO":
            direccion = request_data["direccion"]
            especialidad = self.logica.especialidad_valida(request_data["especialidad"])
            if especialidad is None:
                return {"message":"especialidad no valida"}, 400

            licencia = request_data["licencia"]
            medico = Rol.query.filter(Rol.nombre=='Medico').first()    

            self.logica.crear_usuario(password,email,nombre,direccion,ubicacion.id,
                licencia,especialidad.id,
                '','','','',
                medico)

        elif request_data["tipousuario"] == "PACIENTE":
            direccion = '' # TO-DO: solucionar luego
            edad = request_data["edad"]
            cedula = request_data["cedula"]
            tipo_piel = mapear_tipo_piel(request_data["tipopiel"])
            imagen_piel = request.files.get("image", "")

            usuario = self.logica.usuario_valido(email=email,cedula=cedula)
        
            if usuario is not None:
                return {"message":"El usuario ya existe"}, 400
            
            if imagen_piel != "":
                imagen_procesada = procesar_imagen(imagen_piel)

                if imagen_procesada is False:
                    return {"message":"error al procesar la imagen"}, 400
            else:
                imagen_procesada = imagen_piel

            paciente = Rol.query.filter(Rol.nombre=='Paciente').first()

            self.logica.crear_usuario(password,email,nombre,direccion,ubicacion.id,
                '','',
                edad,cedula,tipo_piel,imagen_procesada,
                paciente)

        else:
            return {"message":"tipo de usuario no valido"}, 400

        return {"message":"usuario creado exitosamente", "password": password}, 200

    @jwt_required()
    def get(self):
        return {"message":"hola"}, 200

class LogInView(Resource):

    def post(self):
        
        usuario = Usuario.query.filter(Usuario.email == request.json["correo"]).first()

        if usuario and usuario.verificar_password(request.json["password"]):
            expire_date =  datetime.timedelta(days=1)
            token_de_acceso = create_access_token(identity = usuario.id,expires_delta = expire_date)
            return {"message":"Inicio de sesión exitoso", "token": token_de_acceso, "user_id": usuario.id}, 200
            
        else:
            return {"message":"El usuario no existe"}, 404

class ValidacionUsuarioView(Resource):

    @jwt_required()
    def get(self):
        id_usuario = get_jwt_identity()
        rol_id = UsuarioRol.query.filter(UsuarioRol.usuario_id == id_usuario).first().rol_id
        rol = Rol.query.filter(Rol.id==rol_id).first().nombre
        nombre = Usuario.query.filter(Usuario.id == id_usuario).first().nombre
        ubicacion = Usuario.query.filter(Usuario.id == id_usuario).first().ubicacion_id
        
        if rol == 'Medico':
            especialidad_id = UsuarioMedico.query.filter(UsuarioMedico.id==id_usuario).first().especialidad_id
            especialidad = Especialidad.query.filter(Especialidad.id == especialidad_id).first().nombre
            tipo_piel = ''
        else:
            especialidad = ''
            especialidad_id = ''
            tipo_piel = UsuarioPaciente.query.filter(UsuarioPaciente.id==id_usuario).first().tipo_piel

        return {"id_usuario":id_usuario, "rol":rol, "especialidad_id":especialidad_id, "especialidad":especialidad, "tipo_piel": tipo_piel, "nombre": nombre, "ubicacion_id": ubicacion}, 200,{'Content-Type': 'application/json'}

class HealthCheckView(Resource):
    def get(self):
        return {"message": os.environ.get("DB_URI")}, 200