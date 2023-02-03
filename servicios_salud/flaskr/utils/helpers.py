import os
import boto3, botocore
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def construir_descripcion_caso(objetos_lesion,adicional):
    descripcion = 'Tipo de lesion: ' + objetos_lesion['tipo_lesion'].nombre + '\n' + \
        'Forma de la lesion: ' + objetos_lesion['forma_lesion'].nombre + '\n' + \
        'Numero de lesiones: ' + objetos_lesion['numero_lesion'].nombre + '\n' + \
        'Distribucion: ' + objetos_lesion['distribucion_lesion'].nombre + '\n' \
        'Informacion adicional: ' + adicional

    return descripcion
    
def upload_file_to_s3(file):

    s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

    try:
        s3.upload_fileobj(
            file,
            os.getenv("AWS_BUCKET_NAME"),
            'imagenes-creacion-caso/' + file.filename,
            ExtraArgs={
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return e
    

    # after upload file to s3 bucket, return filename of the uploaded file
    return file.filename

# function to check file extension
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS