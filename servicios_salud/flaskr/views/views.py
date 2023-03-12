from flask_restful import Resource
from flask import request
import requests, os, json
from ..models.logica import Logica
from .logica import procesar_imagen, generar_diagnostico_automatico
from ..utils.helpers import construir_casos_mostrar, construir_casos_mostrar_paciente, upload_file_to_s3, construir_casos_por_reclamar
from celery import Celery

os.environ.setdefault("REDIS_HOST", "localhost")

celery_app = Celery(
    "celery_app",
    broker=f'redis://{os.environ["REDIS_HOST"]}:6379/0',
    include=['flaskr.services.services']
)

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

                caso = logica.obtener_informacion_caso(caso_id, headers)
                
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
            return {"diagnostico": diagnostico.descripcion}, 200

class InformacionDiagnosticoView(Resource):
    def get(self,caso_id):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
        rol = json_response['rol']
        if (rol == 'Paciente') and (response.status_code == 200):

            logica = Logica()

            diagnostico = logica.obtener_diagnostico_caso(caso_id)

            if diagnostico == False:
                return {"message":"No se encontro la informacion del diagnostico"}, 400

            else:
                return {"diagnostico": diagnostico}, 200

        else:
            return {"message":"Unauthorized"}, 401
           
class ReclamarCasoView(Resource):
    def get(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
       
        try:
            rol = json_response['rol']
        except:
            return {"message":"Unauthorized"}, 401
       
        id_usuario = json_response['id_usuario']

        if (rol == 'Medico') and (response.status_code == 200):

            logica = Logica()
            casos_reclamados = logica.casos_reclamados(id_usuario)
            casos_json = construir_casos_por_reclamar(casos_reclamados)

            
            return {"casos": casos_json}, 200
        else:
            return {"message":"Unauthorized"}, 401

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

class DiagnosticoMedicoView(Resource):
    def post(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
        rol = json_response['rol']
        if (rol == 'Paciente') and (response.status_code == 200):
            caso_id = request.json["caso_id"]
            logica = Logica()

            caso = logica.asignar_tipo_caso(caso_id)

            if caso == False:
                return {"message":"No fue posible asignar el tipo de diagnostico al caso"}, 400

            else:
                return {"message": "Tipo de diagnostico medico asignado exitosamente", "caso_id": caso_id}, 200

        else:
            return {"message":"Unauthorized"}, 401

class DiagnosticoPacienteView(Resource):
    def post(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}

        response = requests.get(auth_url_validacion_usuario, headers=headers)

        json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
        rol = json_response['rol']

        if (rol == 'Medico') and (response.status_code == 200):

            caso_id = request.json["caso_id"]
            diagnostico = request.json["diagnostico"]

            logica = Logica()

            diagnostico = logica.crear_diagnostico(caso_id,diagnostico,'medico')

            if diagnostico == False:
                return {"message":"No es posible generar el diagnóstico enviado"}, 400
            
            else:
                return {"message":"Diagnóstico generado"}, 200
        else:
            return {"message":"Unauthorized"}, 401

class RechazarDiagnosticoView(Resource):
    def post(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
        rol = json_response['rol']
        if (rol == 'Paciente') and (response.status_code == 200):
            caso_id = request.json["caso_id"]
            logica = Logica()
            diagnostico_rechazado = logica.rechazar_diagnostico(caso_id)

            if diagnostico_rechazado == False:
                return {"message":"No fue posible rechazar el diagnostico"}, 400

            else:
                return {"message": "Diagnostico rechazado exitosamente", "caso_id": caso_id}, 200

        else:
            return {"message":"Unauthorized"}, 401

class TipoConsultaView(Resource):
    def post(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        if response.status_code == 200:
            json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
            rol = json_response['rol']
            if rol == 'Paciente':
                caso_id = request.json["caso_id"]
                tipo_consulta = request.json["tipo_consulta"]

                if tipo_consulta == 'Presencial' or tipo_consulta=='Telemedicina':

                    logica = Logica()
                    nueva_consulta = logica.asignar_tipo_consulta(caso_id,tipo_consulta)

                    if nueva_consulta == False:
                        return {"message":"No fue posible asignar el tipo de consulta"}, 400

                    else:
                        return {"message": "Tipo de consulta asignado exitosamente", "caso_id": caso_id, "consulta": nueva_consulta.id}, 200
                else:
                    return {"message": "Tipo de consulta no valida. Opciones validas: Presencial - Telemedicina"}, 400
            else:
                return {"message":"Unauthorized"}, 401

        elif response.status_code == 401:
            return {"message":"Unauthorized"}, 401

        else:
            return {"message":"Bad Request"}, 400

class LiberarCasoView(Resource):
    def post(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}

        response = requests.get(auth_url_validacion_usuario, headers=headers)

        if response.status_code == 200:
            json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
            rol = json_response['rol']

            if rol == 'Medico':
                caso_id = request.json["caso_id"]

                logica = Logica()
                caso_liberado = logica.liberar_caso(caso_id)

                if caso_liberado == False:
                    return {"message":"No fue posible liberar el caso"}, 400

                else:
                    return {"message": "Caso liberado exitosamente", "caso_id": caso_id}, 200

        elif response.status_code == 401:
            return {"message":"Unauthorized"}, 401

        else:
            return {"message":"Bad Request"}, 400

class SolicitarTratamientoView(Resource):
    def get(self,caso_id):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        if response.status_code == 200:
            json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
            rol = json_response['rol']
            if rol == 'Paciente':

                logica = Logica()
                cita = logica.obtener_cita(caso_id)

                if cita == False:
                    return {"message":"No se encontro una cita para el caso"}, 400

                else:
                    return {"cita": cita, "caso_id": caso_id}, 200
            else:
                return {"message":"Unauthorized"}, 401

        elif response.status_code == 401:
            return {"message":"Unauthorized"}, 401

        else:
            return {"message":"Bad Request"}, 400

    def post(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        if response.status_code == 200:
            json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
            rol = json_response['rol']
            if rol == 'Paciente':
                caso_id = request.json["caso_id"]

                logica = Logica()
                cita = logica.crear_cita(caso_id)
                print('por enviar a celery',flush=True)

                if cita == False:
                    return {"message":"No pudo completarse la solicitud de tratamiento"}, 400

                else:
                    celery_app.send_task("asignar_cita", [cita.id])
                    return {"message": "Tratamiento solicitado", "caso_id": caso_id}, 200
            else:
                return {"message":"Unauthorized"}, 401

        elif response.status_code == 401:
            return {"message":"Unauthorized"}, 401

        else:
            return {"message":"Bad Request"}, 400

class DetallePacienteView(Resource):
    def get(self, caso_id):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}

        response = requests.get(auth_url_validacion_usuario, headers=headers)

        if response.status_code == 200:
            json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
            rol = json_response['rol']

            if rol == 'Medico':

                logica = Logica()
                paciente = logica.obtener_paciente_caso(caso_id)

                if paciente is False:
                    return {"message":"Bad Request"}, 400
                else:
                    auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/informacion-paciente/' + str(paciente)
                    headers = {'Authorization': request.headers.get('Authorization')}

                    response = requests.get(auth_url_validacion_usuario, headers=headers)

                    if response.status_code == 200:
                        json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
                        print(json_response, flush=True)
                        tipo_piel = json_response['tipo_piel']
                        edad = json_response['edad']
                        cedula = json_response['cedula']
                        ciudad = json_response['ciudad']
                        nombre = json_response['nombre']
                        direccion = json_response['direccion']

                        return {
                            "tipo_piel": tipo_piel,
                            "edad": edad,
                            "cedula": cedula,
                            "ciudad": ciudad,
                            "nombre": nombre,
                            "direccion": direccion
                        }
                    else:
                        return {"message":"Bad Request"}, 400
            else:
                return {"message":"Unauthorized"}, 401

        elif response.status_code == 401:
            return {"message":"Unauthorized"}, 401

        else:
            return {"message":"Bad Request"}, 400

class AgendaMedicoView(Resource):
    def get(self):
        auth_url_validacion_usuario = os.environ.get("AUTH_BASE_URI") + '/api/validacion-usuario'
        headers = {'Authorization': request.headers.get('Authorization')}
    
        response = requests.get(auth_url_validacion_usuario, headers=headers)

        if response.status_code == 200:
            json_response=json.loads(response.content.decode('utf8').replace("'", '"'))
            rol = json_response['rol']
            if rol == 'Medico':

                id_medico = json_response['id_medico']
                logica = Logica()
                agenda = logica.obtener_agenda_medico(id_medico)

                if agenda == False:
                    return {"message":"No se pudo cargar la agenda"}, 400

                else:
                    return {"agenda": agenda}, 200
            else:
                return {"message":"Unauthorized"}, 401

        elif response.status_code == 401:
            return {"message":"Unauthorized"}, 401

        else:
            return {"message":"Bad Request"}, 400