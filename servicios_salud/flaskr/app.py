from flaskr import create_app
from flask_restful import Api
from .models import db
from .views import SuministroLesionView, CasosPacientesView
import logging
from .utils.seeds import Seeds


app = create_app('gestion_dermatologia')
app_context = app.app_context()
app_context.push()
logging.basicConfig(level=logging.DEBUG)


db.init_app(app)
db.create_all()

seeds = Seeds()
seeds.poblar_lesion_tipo('mac', 'macula')
seeds.poblar_lesion_tipo('pap', 'papula')
seeds.poblar_lesion_tipo('par', 'parche')
seeds.poblar_lesion_tipo('pla', 'placa')
seeds.poblar_lesion_tipo('nod', 'nodulo')
seeds.poblar_lesion_tipo('amp', 'ampolla')
seeds.poblar_lesion_tipo('ulc', 'ulcera')
seeds.poblar_lesion_tipo('ves', 'vesicula')
seeds.poblar_lesion_forma('ani', 'anillo')
seeds.poblar_lesion_forma('dom', 'domo')
seeds.poblar_lesion_forma('enr', 'enrollada')
seeds.poblar_lesion_forma('ind', 'indefinida')
seeds.poblar_lesion_forma('ova', 'ovalada')
seeds.poblar_lesion_forma('red', 'redonda')
seeds.poblar_lesion_numero('dis', 'diseminada')
seeds.poblar_lesion_numero('mul', 'multiple')
seeds.poblar_lesion_numero('rec', 'recurrente')
seeds.poblar_lesion_numero('sol', 'solitaria')
seeds.poblar_lesion_distribucion('asi', 'asimetrica')
seeds.poblar_lesion_distribucion('con', 'confluente')
seeds.poblar_lesion_distribucion('esp', 'esparcida')
seeds.poblar_lesion_distribucion('sim', 'simetrica')

api = Api(app)

api.add_resource(SuministroLesionView, '/api/suministro-lesion')
api.add_resource(CasosPacientesView, '/api/suministro-lesion')

if __name__ == "__main__":
    app.run(debug=True)