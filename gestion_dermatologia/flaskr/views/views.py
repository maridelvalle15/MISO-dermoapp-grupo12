from flask_restful import Resource
from flask import request
import requests, os, json
from ..models import Caso
from .logica import construir_descripcion_caso


class SuministroLesionView(Resource):

    def post(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
        rol = json_response['rol']

        if (rol == 'PACIENTE') or (response.status_code == 200):
            tipo_lesion = request.form['tipo']
            forma = request.form['forma']
            numero = request.form['cantidad']
            distribucion = request.form['distribucion']
            adicional = request.form['adicional']
            imagen_lesion = request.form['image']
            crear_caso(tipo_lesion,forma,numero,distribucion,adicional,imagen_lesion)
            
            return {"message":"Caso creado exitosamente"}, 200
        else:
            return {"message":"Unauthorized"}, 401