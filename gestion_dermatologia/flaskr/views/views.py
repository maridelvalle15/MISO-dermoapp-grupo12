from flask_restful import Resource
from flask import request, jsonify
import requests, os, json


class SuministroLesionView(Resource):

    def post(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)
        #print(json.loads(response.content.decode('utf8').replace("'", '"')), flush=True)
        json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
        if response.status_code == 200:
            return {"message":"hola","rol": json_response['rol']}, 200
        else:
            return {"message":"Unauthorized"}, 401