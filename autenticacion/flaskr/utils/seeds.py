from ..models import db, Ubicacion, Especialidad, Rol, logica

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
            db.session.add(ubicacion)
            db.session.commit()

        return ubicacion

    def poblar_especialidad(self, nombre_especialidad):
        especialidad = self.logica.especialidad_valida(nombre_especialidad)
        
        if especialidad is None:
            especialidad = Especialidad(
                nombre=nombre_especialidad
            )
            db.session.add(especialidad)
            db.session.commit()

        return especialidad

    def poblar_rol(self, nombre_rol):
        rol = self.logica.rol_valido(nombre_rol)
        if rol is None:
            rol = Rol(
                nombre=nombre_rol
            )
            db.session.add(rol)
            db.session.commit()

        return rol