from flask_restful import Resource
from flask import request
import requests, os, json
from ..models.logica import Logica
from .logica import procesar_imagen, generar_diagnostico_automatico
from ..utils.helpers import construir_casos_mostrar, construir_casos_mostrar_paciente, upload_file_to_s3

class SuministroLesionView(Resource):

    def get(self,caso_id=None):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        if caso_id:
            auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
            headers = {'Authorization': request.headers.get('Authorization')}
        
            response = requests.get(auth_url_validacion_usuario, headers=headers)

            if response.status_code == 200:

                logica = Logica()

                caso = logica.obtener_informacion_caso(caso_id)
                
                return caso, 200
            else:
                return {"message":"Unauthorized"}, 401
        else:
        
            json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
            rol = json_response['rol']
            id_usuario = json_response['id_usuario']

            if (rol == 'Paciente') and (response.status_code == 200):

                logica = Logica()

                casos_paciente = logica.obtener_casos_paciente(id_usuario)
                casos = construir_casos_mostrar_paciente(casos_paciente)
                
                return {"casos": casos }, 200
            else:
                return {"message":"Unauthorized"}, 401

    def post(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
        rol = json_response['rol']
        id_usuario = json_response['id_usuario']
        nombre = json_response['nombre']
        ubicacion_id = json_response['ubicacion_id']

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
            nuevo_caso = logica.crear_caso(objetos_lesion,adicional,imagen_procesada,id_usuario,tipo_piel,nombre,ubicacion_id)

            return {"message":"Caso creado exitosamente", "id_caso": nuevo_caso.id}, 200
        else:
            return {"message":"Unauthorized"}, 401

    def put(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
        rol = json_response['rol']

        if (rol == 'Paciente') and (response.status_code == 200):

            caso_id = request.json["caso_id"]
            imagen_lesion = request.json["image"]


            if (imagen_lesion != "") and (imagen_lesion is not None):
                imagen_procesada = upload_file_to_s3(imagen_lesion)

                if imagen_procesada is False:
                    return {"message":"error al procesar la imagen"}, 400
            else:
                imagen_procesada = imagen_lesion

            logica = Logica()

            nueva_imagen_caso = logica.crear_imagen_caso(caso_id,imagen_procesada)

            return {"message":"Imagen guardada exitosamente", "id_imagen_caso": nueva_imagen_caso.id}, 200
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
        ubicacion = json_response['ubicacion_id']

        if (rol == 'Medico') and (response.status_code == 200):

            logica = Logica()
            casos_disponibles = logica.obtener_casos_disponibles(especialidad, ubicacion)

            casos_mostrar = construir_casos_mostrar(casos_disponibles)
            
            return {"message":"hola", "casos": casos_mostrar}, 200
        else:
            return {"message":"Unauthorized"}, 401

class HealthCheckView(Resource):
    def get(self):
        return {"message": os.environ.get("DB_URI")}

class DiagnosticoAutomaticoView(Resource):
    def post(self):
        
        # Leer mensaje de la cola
        # Debe llegar id del caso
        
        caso_id = request.json["caso_id"]
        diagnostico = generar_diagnostico_automatico(caso_id)

        if diagnostico == False:
            # Esto deberia validarse y devolverse en el receptor, aqui solo hacer el diagnostico cuando es posible
            return {"message":"No es posible realizar un diagnóstico al caso asignado"}, 400

        else:
            return {"diagnostico": diagnostico}, 200

class ReclamarCasoView(Resource):
    def post(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
        rol = json_response['rol']
        id_usuario = json_response['id_usuario']

        caso_id = request.json["caso_id"]

        if (rol == 'Medico') and (response.status_code == 200):

            logica = Logica()
            caso = logica.reclamar_caso(caso_id, id_usuario)

            
            return {"message":"Caso asignado", "caso_id": caso.id}, 200
        else:
            return {"message":"Unauthorized"}, 401