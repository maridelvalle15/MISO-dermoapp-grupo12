from ..models import db, LesionTipo, LesionForma, LesionNumero, LesionDistribucion, MatchEspecialidades
from ..models.logica import Logica

class Seeds():
    def __init__(self):
       self.logica = Logica()

    def poblar_lesion_tipo(self, codigo, nombre):
        lesion_tipo = self.logica.lesion_tipo_valida(codigo, nombre)
        if  lesion_tipo is None:
            lesion_tipo = LesionTipo(
                codigo=codigo,
                nombre=nombre
            )
            db.session.add(lesion_tipo)
            db.session.commit()

        return lesion_tipo

    def poblar_lesion_forma(self, codigo, nombre):
        lesion_forma = self.logica.lesion_forma_valida(codigo, nombre)
        if  lesion_forma is None:
            lesion_forma = LesionForma(
                codigo=codigo,
                nombre=nombre
            )
            db.session.add(lesion_forma)
            db.session.commit()

        return lesion_forma

    def poblar_lesion_numero(self, codigo, nombre):
        lesion_numero = self.logica.lesion_numero_valida(codigo, nombre)
        if  lesion_numero is None:
            lesion_numero = LesionNumero(
                codigo=codigo,
                nombre=nombre
            )
            db.session.add(lesion_numero)
            db.session.commit()

        return lesion_numero

    def poblar_lesion_distribucion(self, codigo, nombre):
        lesion_distribucion = self.logica.lesion_distribucion_valida(codigo, nombre)
        if  lesion_distribucion is None:
            lesion_distribucion = LesionDistribucion(
                codigo=codigo,
                nombre=nombre
            )
            db.session.add(lesion_distribucion)
            db.session.commit()

        return lesion_distribucion

    def poblar_match_especialidades(self, especialidad, lesion, piel):
        lesion_id = LesionTipo.query.filter(LesionTipo.nombre == lesion).first().id
        match_especialidad = self.logica.match_especialidad_valida(especialidad, lesion, piel)
        if  match_especialidad is None:
            match_especialidad = MatchEspecialidades(
                especialidad=especialidad,
                tipo_lesion=lesion_id,
                tipo_piel=piel
            )
            db.session.add(match_especialidad)
            db.session.commit()

        return match_especialidad