from flask import Flask, request
from dotenv import load_dotenv
import json 


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

    enfermedades = data[sintomas_paciente["lesion"]][sintomas_paciente["forma"]][sintomas_paciente["numero"]][sintomas_paciente["distribucion"]]["enfermedades"]

    diagnostico = {}
    porcentaje = str(round(100/len(enfermedades),2)) + "%"

    for index,enfermedad in enumerate(enfermedades):
        numero_opcion = index + 1
        opcion = "Opción " + str(numero_opcion) + ": "
        
        diagnostico[opcion] = enfermedad + " " + porcentaje

    print(diagnostico)

    try:
        print("")
    except KeyError:
        print("ID doesn't exist")

    # if (request.get_json()):
    #     print ("hola")
    # else:
    #     print(request.get_json())
    return "hola";