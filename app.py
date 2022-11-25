from flask import Flask, request
from dotenv import load_dotenv
import json, random


app = Flask(__name__)
load_dotenv()
#Python-dotenv (Keep your secrets safe)

@app.route('/')
def home():
    return "Hello World"

@app.route('/diagnostico', methods=['POST'])
def diagnostico():
    sintomas_paciente = request.get_json()

    lesiones_json = "enfermedades_sintomas.json"
    data = json.loads(open(lesiones_json).read())

    try:
        enfermedades = data[sintomas_paciente["lesion"]][sintomas_paciente["forma"]][sintomas_paciente["numero"]][sintomas_paciente["distribucion"]]["enfermedades"]

        #porcentaje_string = str(round(100/len(enfermedades),2)) + "%" // en caso que necesitemos bajar tiempos de respuesta
        porcentaje = round(100/len(enfermedades),2)
        ranges = construccion_porcentajes_certitud(enfermedades,porcentaje)

        # Construccion del diagnostico
        diagnostico = {}
        for index,enfermedad in enumerate(enfermedades):
            numero_opcion = index + 1
            opcion = "Opcion " + str(numero_opcion) + ": "
            porcentaje_string = str(random.randint(int(ranges[index][0]),int(ranges[index][1]))) + "%"
            diagnostico[opcion] = enfermedad + " " + porcentaje_string

        return diagnostico

    except KeyError:
        return {"message": "Las lesiones ingresadas no coinciden con un diagnóstico posible."}, 404

    return "hola"

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