from ..models import Caso, db
from ..views import Logica

class Logica():
    def __init__(self):
        self.logica = Logica()

    def crear_caso(self,objetos_lesion, adicional,id_usuario):
        descripcion = self.logica.construir_descripcion_caso(objetos_lesion, adicional)
        nuevo_caso = Caso(
            descripcion,
            objetos_lesion['tipo_lesion'],objetos_lesion['forma_lesion'],objetos_lesion['numero_lesion'],objetos_lesion['distribucion_lesion'],
            '','',id_usuario
        )
        db.session.add(nuevo_caso)
        db.session.commit()

        return nuevo_caso

        