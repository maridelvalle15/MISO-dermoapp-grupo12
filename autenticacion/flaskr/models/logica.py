from ..models import UsuarioMedico, UsuarioPaciente, db, Ubicacion, Especialidad, Rol, Usuario
from sqlalchemy import exc

class Logica():
    @staticmethod
    def crear_usuario(password='',email='',nombre='',direccion='',ubicacion='',
                    licencia='',especialidad='',
                    edad='',cedula='',tipo_piel='',imagen_piel='',
                    rol='Medico'):
        if rol.nombre == 'Medico':
            nuevo_usuario = UsuarioMedico(
                    password=password,email=email,nombre=nombre,direccion=direccion,ubicacion_id=ubicacion,
                    licencia=licencia,especialidad_id=especialidad)    
        
        else:
            nuevo_usuario = UsuarioPaciente(
                password=password,email=email,nombre=nombre,direccion=direccion,ubicacion_id=ubicacion,
                edad=edad,cedula=cedula,tipo_piel=tipo_piel,imagen_piel=imagen_piel)    

        nuevo_usuario.roles.append(rol)
        try:
            db.session.add(nuevo_usuario)
            db.session.commit()
        except exc.SQLAlchemyError:
            db.session.rollback()
            return {"message":"Error al crear usuario"}, 500

        return nuevo_usuario

    @staticmethod
    def ubicacion_valida(pais='',ciudad=''):
        ubicacion = Ubicacion.query.filter(
            Ubicacion.pais == pais,Ubicacion.ciudad == ciudad
        ).first()

        return ubicacion

    @staticmethod
    def especialidad_valida(especialidad=''):
        especialidad = Especialidad.query.filter(Especialidad.nombre==especialidad).first()
    
        return especialidad

    @staticmethod
    def rol_valido(rol=''):
        rol = Rol.query.filter(Rol.nombre==rol).first()
    
        return rol

    @staticmethod
    def usuario_valido(email=''):
        usuario = Usuario.query.filter(Usuario.email==email).first()
    
        return usuario