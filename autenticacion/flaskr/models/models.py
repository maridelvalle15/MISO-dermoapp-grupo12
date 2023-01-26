from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

db = SQLAlchemy()

class Ubicacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pais = db.Column(db.String(50))
    ciudad = db.Column(db.String(50))

class Especialidad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(50))
    nombre = db.Column(db.String(100), unique=False)
    direccion = db.Column(db.String(200), unique=False)
    ubicacion_id = db.Column(db.Integer, db.ForeignKey('ubicacion.id'), primary_key=False)
    
class UsuarioMedico(Usuario):
    __mapper_args__ = {'polymorphic_identity': 'usuario_medico'}
    id = db.Column(db.Integer, db.ForeignKey('usuario.id'), primary_key=True)
    licencia = db.Column(db.String(50))
    especialidad_id = db.Column(db.Integer, db.ForeignKey('especialidad.id'), primary_key=True)
    
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