import os

from celery import Celery
from flask import request
from flask_restful import Resource

from receptor.tareas import enrutador

os.environ.setdefault("REDIS_HOST", "localhost")
print(f'Tareas: {os.environ["REDIS_HOST"]}')
celery_app = Celery(
    "tareas",
    broker=f'redis://{os.environ["REDIS_HOST"]}:6379/0',
    backend=f'redis://{os.environ["REDIS_HOST"]}:6379/0',
)


class VistaExperimento(Resource):
    def post(self):
        promesa = enrutador.apply_async(kwargs=request.json, queue="principal")
        respuesta = promesa.get()
        return respuesta[0], respuesta[1]