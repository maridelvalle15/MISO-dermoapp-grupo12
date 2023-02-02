from flaskr import create_app
from flask_restful import Api
from .models import db
from .views import SuministroLesionView

app = create_app('default')
app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()

api = Api(app)


api.add_resource(SuministroLesionView, '/api/suministro-lesion')

if __name__ == "__main__":
    app.run(debug=True)