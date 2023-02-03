from flask_restful import Resource
from flask import request
import requests, os, json
from ..models.logica import Logica
from .logica import obtener_objetos_lesion


class SuministroLesionView(Resource):

    def post(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
        rol = json_response['rol']
        id_usuario = json_response['id_usuario']

        if (rol == 'PACIENTE') or (response.status_code == 200):
            tipo_lesion = request.form['tipo']
            forma = request.form['forma']
            numero = request.form['cantidad']
            distribucion = request.form['distribucion']
            adicional = request.form['adicional']
            imagen_lesion = request.form['image']

            logica = Logica()

            objetos_lesion = obtener_objetos_lesion(tipo_lesion,forma,numero,distribucion)
            nuevo_caso = logica.crear_caso(objetos_lesion,adicional,imagen_lesion,id_usuario)
            
            return {"message":"Caso creado exitosamente", "id_caso": nuevo_caso.id}, 200
        else:
            return {"message":"Unauthorized"}, 401