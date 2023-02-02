from flask_sqlalchemy import SQLAlchemy

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
    tipo_lesion = db.Column(db.Integer, db.ForeignKey('lesion_tipo.id'), primary_key=True)
    forma = db.Column(db.Integer, db.ForeignKey('lesion_forma.id'), primary_key=True)
    numero_lesiones = db.Column(db.Integer, db.ForeignKey('lesion_numero.id'), primary_key=True)
    distribucion = db.Column(db.Integer, db.ForeignKey('lesion_distribucion.id'), primary_key=True)
    imagen_caso = db.Column(db.String(250), unique=False)
    tipo_solucion = db.Column(db.String(20), unique=False)
    paciente_id = db.Column(db.Integer, unique=True)