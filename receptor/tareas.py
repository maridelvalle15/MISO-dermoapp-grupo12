import os

from celery import Celery
import celery

os.environ.setdefault("REDIS_HOST", "localhost")
print(f'Tareas: {os.environ["REDIS_HOST"]}')
celery_app = Celery(
    "tareas",
    broker=f'redis://{os.environ["REDIS_HOST"]}:6379/0',
    backend=f'redis://{os.environ["REDIS_HOST"]}:6379/0',
)

@celery_app.task(name="registrar")
def registrar(peticiones, mensaje, respuesta):
    respuestas = [verifyTaskState(peticion) for peticion in peticiones]
    with open("reporte.csv", "a+") as file:
        file.write(
            f'{mensaje["mensaje"]},{respuestas[0][1]},{respuestas[1][1]},{respuestas[2][1]},{respuesta[0].get("mensaje", "error")},{respuesta[1]}\n'
        )


@celery_app.task(name="receptor")
def receptor(peticiones):
    for peticion in peticiones:
        respuesta= verifyTaskState(peticion)
        if respuesta[1] == 200:
            return respuesta
    return {}, 500


@celery_app.task(name="enrutador")
def enrutador(**kwargs):
    peticiones = [
        celery_app.send_task("solicitar_diagnostico", kwargs=kwargs, queue="pruebas1"),
        celery_app.send_task("solicitar_diagnostico", kwargs=kwargs, queue="pruebas2"),
        celery_app.send_task("solicitar_diagnostico", kwargs=kwargs, queue="pruebas3"),
    ]
    respuesta_receptor = receptor.apply_async(
        args=([peticion.id for peticion in peticiones],), queue="principal"
    )
    respuesta = respuesta_receptor.get(disable_sync_subtasks=False)
    celery_app.send_task('registrar',args=([peticion.id for peticion in peticiones], kwargs, respuesta),queue="principal")
    return respuesta[0], respuesta[1]

def verifyTaskState(peticion):
    try:
        task = celery_app.AsyncResult(peticion)
        return task.get(disable_sync_subtasks=False, timeout=2)
    except:
        return [{},500]