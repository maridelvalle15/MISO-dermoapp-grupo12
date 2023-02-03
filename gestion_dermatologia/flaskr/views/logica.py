from ..models import LesionTipo, LesionForma, LesionNumero, LesionDistribucion

class Logica():
    def __init__(self):
        # Se necesita el self para llamar entre metodos
        pass

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

    def construir_descripcion_caso(self,objetos_lesion,adicional):
        descripcion = 'Tipo de lesion: ' + objetos_lesion['tipo_lesion'].nombre + '\n' + \
            'Forma de la lesion: ' + objetos_lesion['forma_lesion'].nombre + '\n' + \
            'Numero de lesiones: ' + objetos_lesion['numero_lesion'].nombre + '\n' + \
            'Distribucion: ' + objetos_lesion['distribucion_lesion'].nombre + '\n' \
            'Informacion adicional: ' + adicional

        return descripcion
