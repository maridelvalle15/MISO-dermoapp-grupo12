from ..models import UsuarioSchema, db, UsuarioMedico, Usuario, Ubicacion, UbicacionSchema, UsuarioMedicoSchema, EspecialidadSchema, Especialidad, Rol
from ..models.logica import Logica
from .logica import procesar_imagen
from flask_restful import Resource
from flask import request
import secrets, datetime
from flask_jwt_extended import create_access_token

usuario_schema = UsuarioSchema()
ubicacion_schema = UbicacionSchema()
usuario_medico_schema = UsuarioMedicoSchema()
especialidad_schema = EspecialidadSchema()

class RegistroView(Resource):
    def __init__(self, **kwargs):
       self.user_manager= kwargs['user_manager']
       self.logica = Logica()

    def post(self):
        email = request.form.get("correo")
        nombre = request.form.get("nombre")
        direccion = request.form.get("direccion")
        usuario = self.logica.usuario_valido(email=email)

        if usuario is not None:
            return {"message":"El usuario ya existe"}, 400

        ubicacion = self.logica.ubicacion_valida(request.form.get("pais"),request.form.get("ciudad"))
        if ubicacion is None:
            return {"message":"ubicacion no valida"}, 400

        longitud_password = 13
        password = secrets.token_urlsafe(longitud_password)

        if request.form.get("tipousuario") == "MEDICO":
            especialidad = self.logica.especialidad_valida(request.form.get("especialidad"))
            if especialidad is None:
                return {"message":"especialidad no valida"}, 400

            licencia = request.form.get("licencia")
            medico = Rol.query.filter(Rol.nombre=='Medico').first()    

            self.logica.crear_usuario(self.user_manager,password,email,nombre,direccion,ubicacion.id,
                licencia,especialidad.id,
                '','','','',
                medico)

        elif request.form.get("tipousuario") == "PACIENTE":
            edad = request.form.get("edad")
            cedula = request.form.get("cedula")
            tipo_piel = request.form.get("tipopiel")
            imagen_piel = request.files.get("image", "")
            
            if imagen_piel != "":
                imagen_procesada = procesar_imagen(imagen_piel)

                if imagen_procesada is False:
                    return {"message":"error al procesar la imagen"}, 400
            else:
                imagen_procesada = imagen_piel

            paciente = Rol.query.filter(Rol.nombre=='Paciente').first()

            self.logica.crear_usuario(self.user_manager,password,email,nombre,direccion,ubicacion.id,
                '','',
                edad,cedula,tipo_piel,imagen_procesada,
                paciente)

        else:
            return {"message":"tipo de usuario no valido"}, 400

        return {"message":"usuario creado exitosamente", "password": password}, 200

    def get(self):
        return {"message":"hola"}, 200

class LogInView(Resource):

    def post(self):
        
        usuario = Usuario.query.filter(Usuario.email == request.form.get("correo"), Usuario.password == request.form.get("password")).first()
        db.session.commit()
        if usuario is None:
            return {"message":"El usuario no existe"}, 404
        else:
            expire_date =  datetime.timedelta(days=1)
            token_de_acceso = create_access_token(identity = usuario.id,expires_delta = expire_date)
            return {"message":"Inicio de sesión exitoso", "token": token_de_acceso, "user_id": usuario.id}, 200