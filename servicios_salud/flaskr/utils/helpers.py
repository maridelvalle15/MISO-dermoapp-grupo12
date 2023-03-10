import os, boto3, base64
from werkzeug.utils import secure_filename
from flask import jsonify
import time
from ..models.models import Diagnostico


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def construir_descripcion_caso(objetos_lesion,adicional):
    descripcion = 'Tipo de lesion: ' + objetos_lesion['tipo_lesion'].nombre + '\n' + \
        'Forma de la lesion: ' + objetos_lesion['forma_lesion'].nombre + '\n' + \
        'Numero de lesiones: ' + objetos_lesion['numero_lesion'].nombre + '\n' + \
        'Distribucion: ' + objetos_lesion['distribucion_lesion'].nombre + '\n' \
        'Informacion adicional: ' + adicional

    return descripcion
    
def upload_file_to_s3(file):

    try:
        if type(file) == str:
            filename = (str(time.time())).replace('.','') + '.png'
            session = boto3.Session(
                aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
                aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
                )
            s3 = session.resource('s3')
            s3.Object(os.getenv("AWS_BUCKET_NAME"), 'imagenes-creacion-caso/' + filename).put(Body=base64.b64decode(file))
        else:
            filename = file.filename
            s3 = boto3.client(
                "s3",
                aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
                aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
            )
            s3.upload_fileobj(
                file,
                os.getenv("AWS_BUCKET_NAME"),
                'imagenes-creacion-caso/' + filename,
                ExtraArgs={
                    "ContentType": file.content_type
                }
            )
        

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return False
    

    # after upload file to s3 bucket, return filename of the uploaded file
    return filename

# function to check file extension
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def construir_casos_mostrar(casos):
    lista_casos = []
    for caso in casos:
        json_caso = {
            'id': caso.id,
            'fecha': str(caso.fecha_creacion),
            'tipopiel': caso.tipo_piel,
            'descripcion': caso.descripcion,
            'nombre_paciente': caso.nombre_paciente,
            'estado': caso.status

        }
        lista_casos.append(json_caso)

    return lista_casos

def construir_casos_mostrar_paciente(casos):
    lista_casos = []
    for caso in casos:
        json_caso = {
            'id': caso.id,
            'fecha': str(caso.fecha_creacion),
            'tipodiagnostico': caso.tipo_solucion,
            'status': caso.status

        }
        lista_casos.append(json_caso)

    return lista_casos

def construir_casos_por_reclamar(casos):
    lista_casos = []
    for caso in casos:
        tiene_diagnostico = obtener_diagnostico_caso(caso.id)
        if tiene_diagnostico != False:
            estado_diagnostico = 'Diagnosticado'
        else:
            estado_diagnostico = 'Sin diagnosticar'
        
        json_caso = {
            'caso_id': caso.id,
            'fecha': str(caso.fecha_creacion),
            'descripcion': caso.descripcion,
            'nombre_paciente': caso.nombre_paciente,
            'estado': estado_diagnostico,

        }
        lista_casos.append(json_caso)

    return lista_casos

def obtener_diagnostico_caso(caso_id):
        diagnostico = Diagnostico.query.filter(Diagnostico.caso==caso_id).first()
        if diagnostico:
            return diagnostico
        
        return False
