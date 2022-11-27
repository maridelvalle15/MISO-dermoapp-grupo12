import os

from celery import Celery

os.environ.setdefault("REDIS_HOST", "localhost")
print(f'Tareas: {os.environ["REDIS_HOST"]}')
celery_app = Celery(
    "tareas",
    broker=f'redis://{os.environ["REDIS_HOST"]}:6379/0',
    backend=f'redis://{os.environ["REDIS_HOST"]}:6379/0',
)

@celery_app.task(name="solicitar_diagnostico")
def enrutador(**kwargs):
    peticion = celery_app.send_task("solicitar_diagnostico", kwargs=kwargs, queue="dx")
    respuesta = peticion.get(disable_sync_subtasks=False)

    return respuesta
