from flaskr import create_app
from flask_restful import Api
from .models import db, Usuario
from .views import RegistroView
from flask_user import UserManager
import pytest
from .utils.seeds import Seeds

app = create_app('default')
app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()

seeds = Seeds()
seeds.poblar_ubicacion('Colombia', 'Bogota')
seeds.poblar_rol('Medico')
seeds.poblar_especialidad('Lunares')

api = Api(app)
user_manager = UserManager(app, db, Usuario)

api.add_resource(RegistroView, '/api/registro', resource_class_kwargs={'user_manager': user_manager})

if __name__ == "__main__":
    app.run(debug=True)