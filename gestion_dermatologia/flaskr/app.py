from flaskr import create_app
from flask_restful import Api
from .models import db
from .views import SuministroLesionView
import logging


app = create_app('gestion_dermatologia')
app_context = app.app_context()
app_context.push()
logging.basicConfig(level=logging.DEBUG)


db.init_app(app)
db.create_all()

api = Api(app)

api.add_resource(SuministroLesionView, '/api/suministro-lesion')

if __name__ == "__main__":
    app.run(debug=True)