from flaskr import create_app
from flask_restful import Api
from .models import db
from .views import SuministroLesionView, CasosPacientesView, HealthCheckView, DiagnosticoAutomaticoView, InformacionDiagnosticoView, \
                    ReclamarCasoView, DiagnosticoMedicoView, DiagnosticoPacienteView, RechazarDiagnosticoView, TipoConsultaView, LiberarCasoView, \
                        SolicitarTratamientoView, DetallePacienteView, AgendaMedicoView
import logging
from .utils.seeds import Seeds
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate

app = create_app('gestion_dermatologia')
app_context = app.app_context()
app_context.push()
logging.basicConfig(level=logging.DEBUG)


db.init_app(app)
db.create_all()

migrate = Migrate(app, db)

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

seeds.poblar_match_especialidades('General','ampolla','normal')
seeds.poblar_match_especialidades('General','ampolla','mixta')
seeds.poblar_match_especialidades('General','ulcera','normal')
seeds.poblar_match_especialidades('General','ulcera','mixta')
seeds.poblar_match_especialidades('General','vesicula','normal')
seeds.poblar_match_especialidades('General','vesicula','mixta')

seeds.poblar_match_especialidades('Clinica','macula','normal')
seeds.poblar_match_especialidades('Clinica','macula','seca')
seeds.poblar_match_especialidades('Clinica','macula','grasa')
seeds.poblar_match_especialidades('Clinica','macula','mixta')
seeds.poblar_match_especialidades('Clinica','macula','sensible')
seeds.poblar_match_especialidades('Clinica','parche','normal')
seeds.poblar_match_especialidades('Clinica','parche','seca')
seeds.poblar_match_especialidades('Clinica','parche','grasa')
seeds.poblar_match_especialidades('Clinica','parche','mixta')
seeds.poblar_match_especialidades('Clinica','parche','sensible')

seeds.poblar_match_especialidades('Cosmetica','placa','seca')
seeds.poblar_match_especialidades('Cosmetica','placa','grasa')
seeds.poblar_match_especialidades('Cosmetica','placa','sensible')

seeds.poblar_match_especialidades('Laser','papula','normal')
seeds.poblar_match_especialidades('Laser','papula','mixta')

seeds.poblar_match_especialidades('Quirurgica','nodulo','normal')
seeds.poblar_match_especialidades('Quirurgica','nodulo','seca')
seeds.poblar_match_especialidades('Quirurgica','nodulo','grasa')
seeds.poblar_match_especialidades('Quirurgica','nodulo','mixta')
seeds.poblar_match_especialidades('Quirurgica','nodulo','sensible')

cors = CORS(app)

api = Api(app)

# Gestion Dermatologia
api.add_resource(SuministroLesionView, '/api/suministro-lesion/', '/api/suministro-lesion/<int:caso_id>')
api.add_resource(DetallePacienteView, '/api/detalle-paciente/<int:caso_id>')

# Gestion Casos
api.add_resource(CasosPacientesView, '/api/casos-pacientes')
api.add_resource(ReclamarCasoView, '/api/reclamar-caso')
api.add_resource(LiberarCasoView, '/api/liberar-caso')
api.add_resource(TipoConsultaView, '/api/tipo-consulta')

# Gestion Diagnosticos
api.add_resource(DiagnosticoAutomaticoView, '/api/diagnostico-automatico')
api.add_resource(InformacionDiagnosticoView, '/api/informacion-diagnostico/<int:caso_id>')
api.add_resource(DiagnosticoMedicoView, '/api/diagnostico-medico')
api.add_resource(DiagnosticoPacienteView, '/api/diagnostico-paciente')
api.add_resource(RechazarDiagnosticoView, '/api/rechazar-diagnostico')

# Citas
api.add_resource(SolicitarTratamientoView, '/api/solicitar-cita', '/api/solicitar-cita/<int:caso_id>')
api.add_resource(AgendaMedicoView, '/api/agenda-medico')

api.add_resource(HealthCheckView, '/api/health-check')

if __name__ == "__main__":
    app.run(debug=True)