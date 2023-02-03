from flaskr import create_app
from flask_restful import Api
from .models import db
from .views import HolaView
import logging


app = create_app('gestion_casos')
app_context = app.app_context()
app_context.push()
logging.basicConfig(level=logging.DEBUG)


db.init_app(app)
db.create_all()

api = Api(app)

api.add_resource(HolaView, '/api/suministro-lesion')

if __name__ == "__main__":
    app.run(debug=True)