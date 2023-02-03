from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

db = SQLAlchemy()

class LesionTipo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    codigo = db.Column(db.String(3), unique=False)
    nombre = db.Column(db.String(50), unique=False)

class LesionForma(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    codigo = db.Column(db.String(3), unique=False)
    nombre = db.Column(db.String(50), unique=False)

class LesionNumero(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    codigo = db.Column(db.String(3), unique=False)
    nombre = db.Column(db.String(50), unique=False)

class LesionDistribucion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    codigo = db.Column(db.String(3), unique=False)
    nombre = db.Column(db.String(50), unique=False)

class Caso(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.Text)
    tipo_lesion = db.Column(db.Integer, db.ForeignKey('lesion_tipo.id'))
    forma = db.Column(db.Integer, db.ForeignKey('lesion_forma.id'))
    numero_lesiones = db.Column(db.Integer, db.ForeignKey('lesion_numero.id'))
    distribucion = db.Column(db.Integer, db.ForeignKey('lesion_distribucion.id'))
    imagen_caso = db.Column(db.String(250), unique=False)
    tipo_solucion = db.Column(db.String(20), unique=False)
    paciente_id = db.Column(db.Integer, unique=False)

class MatchEspecialidades():
    id = db.Column(db.Integer, primary_key=True)
    especialidad = db.Column(db.Integer, unique=False)
    tipo_lesion = db.Column(db.String(50), unique=False)
    tipo_piel = db.Column(db.String(100), unique=False)

class LesionTipoSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = LesionTipo
         include_relationships = True
         load_instance = True

class LesionFormaSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = LesionForma
         include_relationships = True
         load_instance = True

class LesionNumeroSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = LesionNumero
         include_relationships = True
         load_instance = True

class LesionDistribucionSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = LesionDistribucion
         include_relationships = True
         load_instance = True

class CasoSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = Caso
         include_relationships = True
         load_instance = True

class MatchEspecialidadesSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = MatchEspecialidades
         include_relationships = True
         load_instance = True