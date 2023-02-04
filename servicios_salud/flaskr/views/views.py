from flask_restful import Resource
from flask import request
import requests, os, json
from ..models.logica import Logica
from .logica import procesar_imagen
from ..utils.helpers import construir_casos_mostrar

class SuministroLesionView(Resource):

    def post(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
        rol = json_response['rol']
        id_usuario = json_response['id_usuario']
        nombre = json_response['id_usuario']

        if (rol == 'Paciente') and (response.status_code == 200):
            tipo_lesion = request.form.get('tipo')
            forma = request.form.get('forma')
            numero = request.form.get('cantidad')
            distribucion = request.form.get('distribucion')
            adicional = request.form.get('adicional')
            imagen_lesion = request.files.get('image')
            tipo_piel = json_response['tipo_piel']

            if (imagen_lesion != "") and (imagen_lesion is not None):
                imagen_procesada = procesar_imagen(imagen_lesion)

                if imagen_procesada is False:
                    return {"message":"error al procesar la imagen"}, 400
            else:
                imagen_procesada = imagen_lesion

            logica = Logica()

            objetos_lesion = logica.obtener_objetos_lesion(tipo_lesion,forma,numero,distribucion)
            nuevo_caso = logica.crear_caso(objetos_lesion,adicional,imagen_procesada,id_usuario,tipo_piel,nombre)
            
            return {"message":"Caso creado exitosamente", "id_caso": nuevo_caso.id}, 200
        else:
            return {"message":"Unauthorized"}, 401

class CasosPacientesView(Resource):
    def get(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
        rol = json_response['rol']
        especialidad = json_response['especialidad']

        if (rol == 'Medico') and (response.status_code == 200):

            logica = Logica()
            casos_disponibles = logica.obtener_casos_disponibles(especialidad)

            casos_mostrar = construir_casos_mostrar(casos_disponibles)
            
            return {"message":"hola", "casos": casos_mostrar}, 200
        else:
            return {"message":"Unauthorized"}, 401