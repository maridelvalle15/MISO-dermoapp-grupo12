from ..models import db, Ubicacion, Especialidad, Rol, logica
from sqlalchemy import exc

class Seeds():
    def __init__(self):
       self.logica = logica.Logica()

    def poblar_ubicacion(self, pais, ciudad):
        ubicacion = self.logica.ubicacion_valida(pais,ciudad)
        if  ubicacion is None:
            ubicacion = Ubicacion(
                pais=pais,
                ciudad=ciudad
            )
            try:
                db.session.add(ubicacion)
                db.session.commit()
            except exc.SQLAlchemyError as e:
                flaskr.logger.error(e)
                db.session.rollback()

        return ubicacion

    def poblar_especialidad(self, nombre_especialidad):
        especialidad = self.logica.especialidad_valida(nombre_especialidad)
        
        if especialidad is None:
            especialidad = Especialidad(
                nombre=nombre_especialidad
            )
            try:
                db.session.add(especialidad)
                db.session.commit()
            except exc.SQLAlchemyError as e:
                flaskr.logger.error(e)
                db.session.rollback()

        return especialidad

    def poblar_rol(self, nombre_rol):
        rol = self.logica.rol_valido(nombre_rol)
        if rol is None:
            rol = Rol(
                nombre=nombre_rol
            )
            try:
                db.session.add(rol)
                db.session.commit()
            except exc.SQLAlchemyError as e:
                flaskr.logger.error(e)
                db.session.rollback()

        return rol