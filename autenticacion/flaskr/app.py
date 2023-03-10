
from flaskr import create_app
from flask_restful import Api
from .models import db, Usuario
from .views import RegistroView, LogInView, ValidacionUsuarioView, HealthCheckView, InformacionPacienteView
from flask_user import UserManager
import pytest
from .utils.seeds import Seeds
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin

app = create_app('autenticacion')
app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()

seeds = Seeds()
seeds.poblar_ubicacion('co', 'bog')
seeds.poblar_ubicacion('vz', 'ccs')
seeds.poblar_rol('Medico')
seeds.poblar_rol('Paciente')
seeds.poblar_especialidad('General')
seeds.poblar_especialidad('Clinica')
seeds.poblar_especialidad('Cosmetica')
seeds.poblar_especialidad('Laser')
seeds.poblar_especialidad('Quirurgica')

cors = CORS(app)

api = Api(app)
user_manager = UserManager(app, db, Usuario)

api.add_resource(RegistroView, '/api/registro', resource_class_kwargs={'user_manager': user_manager})
api.add_resource(LogInView, '/api/login')
api.add_resource(ValidacionUsuarioView, '/api/validacion-usuario')
api.add_resource(HealthCheckView, '/api/health-check')
api.add_resource(InformacionPacienteView, '/api/informacion-paciente/<int:paciente_id>')

jwt = JWTManager(app)

if __name__ == "__main__":
    app.run(debug=True)