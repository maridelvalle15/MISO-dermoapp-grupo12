from flask_cors import CORS
from flask_restful import Api

from . import create_app
from .vistas import VistaBasica

app = create_app("default")
api = Api(app)
CORS(app)

api.add_resource(VistaBasica, "/api")