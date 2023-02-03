from ..models import Caso, db, LesionTipo, LesionForma, LesionNumero, LesionDistribucion, MatchEspecialidades
from ..utils.helpers import construir_descripcion_caso

class Logica():
    @staticmethod
    def crear_caso(objetos_lesion, adicional,imagen_lesion,id_usuario):
        descripcion = construir_descripcion_caso(objetos_lesion, adicional)
        nuevo_caso = Caso(descripcion=descripcion,
            tipo_lesion=objetos_lesion['tipo_lesion'].id,
            forma=objetos_lesion['forma_lesion'].id,
            numero_lesiones=objetos_lesion['numero_lesion'].id,
            distribucion=objetos_lesion['distribucion_lesion'].id,
            tipo_solucion='',imagen_caso=imagen_lesion,paciente_id=id_usuario)
        db.session.add(nuevo_caso)
        db.session.commit()

        return nuevo_caso

    @staticmethod
    def obtener_objetos_lesion(tipo='',forma='',numero='',distribucion=''):
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

    @staticmethod
    def lesion_tipo_valida(codigo,nombre):
        lesion_tipo = LesionTipo.query.filter(
            LesionTipo.codigo == codigo,LesionTipo.nombre == nombre
        ).first()

        return lesion_tipo

    @staticmethod
    def lesion_forma_valida(codigo,nombre):
        lesion_forma = LesionForma.query.filter(
            LesionForma.codigo == codigo,LesionForma.nombre == nombre
        ).first()

        return lesion_forma

    @staticmethod
    def lesion_numero_valida(codigo,nombre):
        lesion_numero = LesionNumero.query.filter(
            LesionNumero.codigo == codigo,LesionNumero.nombre == nombre
        ).first()

        return lesion_numero

    @staticmethod
    def lesion_distribucion_valida(codigo,nombre):
        lesion_distribucion = LesionDistribucion.query.filter(
            LesionDistribucion.codigo == codigo,LesionDistribucion.nombre == nombre
        ).first()

        return lesion_distribucion

    @staticmethod
    def obtener_casos_disponibles(especialidad):
        casos = Caso.query.all()
        return True

    @staticmethod
    def match_especialidad_valida(especialidad, lesion, piel):
        match_especialidad = MatchEspecialidades.query.filter(
            MatchEspecialidades.especialidad == especialidad,
            MatchEspecialidades.tipo_lesion == lesion,
            MatchEspecialidades.tipo_piel == piel
        ).first()

        return match_especialidad

        