from ..models import UsuarioMedico, db, Ubicacion, Especialidad, Rol, Usuario
class Logica():
    @staticmethod
    def crear_usuario(user_manager=None,password='',email='',nombre='',direccion='',ubicacion='',licencia='',especialidad='',rol='Medico'):
        nuevo_usuario = UsuarioMedico(
                password=user_manager.hash_password(password),email=email,nombre=nombre,direccion=direccion,ubicacion_id=ubicacion,licencia=licencia,especialidad_id=especialidad)    
        nuevo_usuario.roles.append(rol)
        db.session.add(nuevo_usuario)
        db.session.commit()

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