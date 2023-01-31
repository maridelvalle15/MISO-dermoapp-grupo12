from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from flask_user import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Ubicacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pais = db.Column(db.String(50))
    ciudad = db.Column(db.String(50))

class Especialidad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))

class Rol(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    nombre = db.Column(db.String(50), unique=True)

class UsuarioRol(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    usuario_id = db.Column(db.Integer(), db.ForeignKey('usuario.id', ondelete='CASCADE'))
    rol_id = db.Column(db.Integer(), db.ForeignKey('rol.id', ondelete='CASCADE'))

class Usuario(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(250))
    nombre = db.Column(db.String(100), unique=False)
    direccion = db.Column(db.String(200), unique=False)
    ubicacion_id = db.Column(db.Integer, db.ForeignKey('ubicacion.id'), primary_key=False)
    roles = db.relationship('Rol', secondary='usuario_rol')

    def verificar_password(self, pwd):
        return check_password_hash(self.password, pwd)
    
class UsuarioMedico(Usuario):
    __mapper_args__ = {'polymorphic_identity': 'usuario_medico'}
    id = db.Column(db.Integer, db.ForeignKey('usuario.id'), primary_key=True)
    licencia = db.Column(db.String(50))
    especialidad_id = db.Column(db.Integer, db.ForeignKey('especialidad.id'), primary_key=True)

class UsuarioPaciente(Usuario):
    __mapper_args__ = {'polymorphic_identity': 'usuario_paciente'}
    id = db.Column(db.Integer, db.ForeignKey('usuario.id'), primary_key=True)
    edad = db.Column(db.Integer)
    cedula = db.Column(db.String(50), unique=True)
    tipo_piel = db.Column(db.String(100), unique=False)
    imagen_piel = db.Column(db.String(250), unique=False)

    def __init__(self, email, password, nombre, direccion, ubicacion_id, edad, cedula, tipo_piel, imagen_piel):
        self.email = email
        self.password = generate_password_hash(password)
        self.nombre = nombre
        self.direccion = direccion
        self.ubicacion_id = ubicacion_id
        self.edad = edad
        self.cedula = cedula
        self.tipo_piel = tipo_piel
        self.imagen_piel = imagen_piel

class UsuarioSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = Usuario
         include_relationships = True
         load_instance = True

class UsuarioMedicoSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = UsuarioMedico
         include_relationships = True
         load_instance = True

class UsuarioPacienteSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = UsuarioPaciente
         include_relationships = True
         load_instance = True

class UbicacionSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = UsuarioMedico
         include_relationships = True
         load_instance = True

class EspecialidadSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = UsuarioMedico
         include_relationships = True
         load_instance = True