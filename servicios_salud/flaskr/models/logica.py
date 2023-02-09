from ..models import Caso, db, LesionTipo, LesionForma, LesionNumero, LesionDistribucion, MatchEspecialidades
from ..utils.helpers import construir_descripcion_caso
from sqlalchemy import exc

class Logica():

    def __init__(self) -> None:
        # Necesario para llamado entre metodos
        pass

    def obtener_especialidad_caso(self,tipo_lesion,tipo_piel):
        especialidad = MatchEspecialidades.query.filter(MatchEspecialidades.tipo_lesion==tipo_lesion)\
            .filter(MatchEspecialidades.tipo_piel==tipo_piel).first().especialidad
        return especialidad

    def crear_caso(self,objetos_lesion, adicional,imagen_lesion,id_usuario,tipo_piel,nombre):
        descripcion = construir_descripcion_caso(objetos_lesion, adicional)
        especialidad = self.obtener_especialidad_caso(objetos_lesion['tipo_lesion'].id,tipo_piel)
        nuevo_caso = Caso(descripcion=descripcion,
            tipo_lesion=objetos_lesion['tipo_lesion'].id,
            forma=objetos_lesion['forma_lesion'].id,
            numero_lesiones=objetos_lesion['numero_lesion'].id,
            distribucion=objetos_lesion['distribucion_lesion'].id,
            tipo_solucion='',imagen_caso=imagen_lesion,paciente_id=id_usuario,tipo_piel=tipo_piel,
            especialidad_asociada=especialidad,
            nombre_paciente=nombre
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

    def obtener_casos_disponibles(self,especialidad):
        casos = Caso.query.filter(Caso.especialidad_asociada==especialidad)\
            .filter(Caso.medico_asignado == None).all()
        
        return casos

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
        