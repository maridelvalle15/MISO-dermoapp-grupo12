import os
from random import randint

from celery import Celery

os.environ.setdefault("REDIS_HOST", "localhost")

celery_app = Celery(
    "tareas",
    broker=f'redis://{os.environ["REDIS_HOST"]}:6379/0',
    backend=f'redis://{os.environ["REDIS_HOST"]}:6379/0',
)


@celery_app.task(name="solicitar_diagnostico")
def solicitar_diagnostico(**kwargs):
    type = kwargs.get('type')
    if type == "automatic":
        return "Este es tu diagnóstico automático"
    else:
        return "Este es un diagnóstico manual"
