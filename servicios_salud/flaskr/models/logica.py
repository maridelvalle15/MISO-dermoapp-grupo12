from ..models import Caso, db, LesionTipo, LesionForma, LesionNumero, LesionDistribucion, MatchEspecialidades, Diagnostico, ImagenCaso
from ..utils.helpers import construir_descripcion_caso
from sqlalchemy import exc
import flaskr

class Logica():

    def __init__(self) -> None:
        # Necesario para llamado entre metodos
        pass

    def obtener_especialidad_caso(self,tipo_lesion,tipo_piel):
        especialidad = MatchEspecialidades.query.filter(MatchEspecialidades.tipo_lesion==tipo_lesion)\
            .filter(MatchEspecialidades.tipo_piel==tipo_piel).first().especialidad
        return especialidad

    def crear_caso(self,objetos_lesion, adicional,imagen_lesion,id_usuario,tipo_piel,nombre,ubicacion_id):
        descripcion = construir_descripcion_caso(objetos_lesion, adicional)
        especialidad = self.obtener_especialidad_caso(objetos_lesion['tipo_lesion'].id,tipo_piel)
        nuevo_caso = Caso(descripcion=descripcion,
            tipo_lesion=objetos_lesion['tipo_lesion'].id,
            forma=objetos_lesion['forma_lesion'].id,
            numero_lesiones=objetos_lesion['numero_lesion'].id,
            distribucion=objetos_lesion['distribucion_lesion'].id,
            tipo_solucion='',imagen_caso=imagen_lesion,paciente_id=id_usuario,tipo_piel=tipo_piel,
            especialidad_asociada=especialidad,
            nombre_paciente=nombre,
            ubicacion_id=ubicacion_id
            )
        try:
            db.session.add(nuevo_caso)
            db.session.commit()
        except exc.SQLAlchemyError as e:
            flaskr.logger.error(e)    
            db.session.rollback()
            return {"message":"Error al crear caso"}, 500

        return nuevo_caso

    def obtener_objetos_lesion(self,tipo='',forma='',numero='',distribucion=''):
        tipo_lesion = LesionTipo.query.filter(LesionTipo.codigo==tipo).first()
        forma_lesion = LesionForma.query.filter(LesionForma.codigo==forma).first()
        numero_lesion = LesionNumero.query.filter(LesionNumero.codigo==numero).first()
        distribucion_lesion = LesionDistribucion.query.filter(LesionDistribucion.codigo==distribucion).first()

        objetos = {
            'tipo_lesion': tipo_lesion,
            'forma_lesion': forma_lesion,
            'numero_lesion': numero_lesion,
            'distribucion_lesion': distribucion_lesion
        }

        return objetos

    def lesion_tipo_valida(self,codigo,nombre):
        lesion_tipo = LesionTipo.query.filter(
            LesionTipo.codigo == codigo,LesionTipo.nombre == nombre
        ).first()

        return lesion_tipo

    def lesion_forma_valida(self,codigo,nombre):
        lesion_forma = LesionForma.query.filter(
            LesionForma.codigo == codigo,LesionForma.nombre == nombre
        ).first()

        return lesion_forma

    def lesion_numero_valida(self,codigo,nombre):
        lesion_numero = LesionNumero.query.filter(
            LesionNumero.codigo == codigo,LesionNumero.nombre == nombre
        ).first()

        return lesion_numero

    def lesion_distribucion_valida(self,codigo,nombre):
        lesion_distribucion = LesionDistribucion.query.filter(
            LesionDistribucion.codigo == codigo,LesionDistribucion.nombre == nombre
        ).first()

        return lesion_distribucion

    def obtener_casos_disponibles(self,especialidad, ubicacion_id):
        casos_especialidad = Caso.query.filter(Caso.especialidad_asociada==especialidad)
        if casos_especialidad.all():   
            casos_sin_asignar = casos_especialidad.filter(Caso.medico_asignado == None)
            if casos_sin_asignar.all():
                casos_ubicacion = casos_sin_asignar.filter(Caso.ubicacion_id==ubicacion_id)

                return casos_ubicacion.all()
            else:
                return []
        else:
            return []

    def match_especialidad_valida(self,especialidad, lesion, piel):
        match_especialidad = MatchEspecialidades.query.filter(
            MatchEspecialidades.especialidad == especialidad,
            MatchEspecialidades.tipo_lesion == lesion,
            MatchEspecialidades.tipo_piel == piel
        ).first()

        return match_especialidad

    def obtener_casos_paciente(self,id_paciente):
        casos = Caso.query.filter(Caso.paciente_id==id_paciente)\
            .filter(Caso.medico_asignado == None).all()
        
        return casos
        
    def crear_diagnostico(self,caso,diagnosticos):
        diagnostico = Diagnostico(tipo='automatico',
            descripcion=str(diagnosticos),
            caso=caso.id)
        try:
            db.session.add(diagnostico)
            db.session.commit()

        except exc.SQLAlchemyError as e:
            flaskr.logger.error(e)    
            db.session.rollback()
            return {"message":"Error al crear diagnostico"}, 500

    def crear_imagen_caso(self,caso_id,imagen):
        imagen_caso = ImagenCaso(caso_id=caso_id,imagen=imagen)
        try:
            db.session.add(imagen_caso)
            db.session.commit()

        except exc.SQLAlchemyError as e:
            flaskr.logger.error(e)    
            db.session.rollback()
            return {"message":"Error al crear diagnostico"}, 500

        return imagen_caso

    def obtener_informacion_caso(self,caso_id):
        caso = Caso.query.filter(Caso.id==caso_id).first()
        imagenes_array = []
        imagenes = ImagenCaso.query.filter(ImagenCaso.caso_id==caso_id).all()
        for imagen in imagenes:
            imagenes_array.append(imagen.imagen)
        if caso:
            caso_dict = {
                'id': caso.id,
                'descripcion': caso.descripcion,
                'image': caso.imagen_caso,
                'tipo_solucion': caso.tipo_solucion,
                'nombre_paciente': caso.nombre_paciente,
                'medico_asignado': caso.medico_asignado,
                'tipo_piel': caso.tipo_piel,
                'fecha': str(caso.fecha_creacion),
                'imagenes_extra': imagenes_array
            }
            return caso_dict

    def reclamar_caso(self,caso_id, id_usuario):
        caso = Caso.query.filter(Caso.id==caso_id).first()
        if caso is not None:
            caso.medico_asignado = id_usuario
            try:
                db.session.add(caso)
                db.session.commit()
                return caso

            except exc.SQLAlchemyError as e:
                flaskr.logger.error(e)    
                db.session.rollback()
                return False
        else:
            return False