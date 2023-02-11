from ..utils.helpers import upload_file_to_s3, allowed_file
from ..models import Caso, LesionDistribucion, LesionForma, LesionNumero, LesionTipo
import json, random

def procesar_imagen(imagen):
    print("DEPURANDO")
    print("IMAGEN")
    # check whether a file is selected
    if imagen.filename == '':
        print('No selected file')
        return False

    # check whether the file extension is allowed (eg. png,jpeg,jpg,gif)
    if imagen and allowed_file(imagen.filename):
        output = upload_file_to_s3(imagen) 
        
        # if upload success,will return file name of uploaded file
        if output:
            # write your code here 
            # to save the file name in database

            print("Success upload")
            return output

        # upload failed, redirect to upload page
        else:
            print("Unable to upload, try again")
            return False
        
    # if file extension not allowed
    else:
        print("File type not accepted,please try again.")
        return False

def generar_diagnostico_automatico(caso_id):
    caso = Caso.query.filter(Caso.id==caso_id).first()
    tipo_id = caso.tipo_lesion
    forma_id = caso.forma
    numero_id = caso.numero_lesiones
    distribucion_id = caso.distribucion

    tipo_lesion = LesionTipo.query.filter(LesionTipo.id==tipo_id).first().nombre
    forma_lesion = LesionForma.query.filter(LesionForma.id==forma_id).first().nombre
    numero_lesion = LesionNumero.query.filter(LesionNumero.id==numero_id).first().nombre
    distribucion_lesion = LesionDistribucion.query.filter(LesionDistribucion.id==distribucion_id).first().nombre



    lesiones_json = "utils/enfermedades_sintomas.json"
    data = json.loads(open(lesiones_json).read())

    try:
        enfermedades = data[tipo_lesion][forma_lesion][numero_lesion][distribucion_lesion]["enfermedades"]

        porcentaje = round(100/len(enfermedades),2)
        ranges = construccion_porcentajes_certitud(enfermedades,porcentaje)

        # Construccion del diagnostico
        diagnosticos = []
        for index,enfermedad in enumerate(enfermedades):
            porcentaje = random.randint(int(ranges[index][0]),int(ranges[index][1]))
            
            # El diagnostico solo se entrega si el % de certitud es mayor a 30
            if porcentaje > 30:
                porcentaje_string = str(porcentaje) + "%"
                diagnostico_dict = {'diagnostico': enfermedad, 'certitud': porcentaje_string}
                diagnosticos.append(diagnostico_dict)

        return diagnosticos

    except KeyError:
         return False

# Se construye diviendo en % iguales el arreglo, y luego creando rangos del 1 al 100
def construccion_porcentajes_certitud(array,percentage):
    ranges = []
    for index,elem in enumerate(array):
        if index == 0:
            primer_percentage_range = 1
        else:
            primer_percentage_range = percentage*index
        ranges.append([primer_percentage_range,percentage*(index+1)])

    return ranges