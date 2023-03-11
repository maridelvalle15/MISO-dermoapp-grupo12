import os
from celery import Celery
from celery.utils.log import get_task_logger
from flaskr import create_app
from ..models.models import db


os.environ.setdefault("REDIS_HOST", "localhost")

celery_app = Celery(
    "celery_app",
    broker=f'redis://{os.environ["REDIS_HOST"]}:6379/0',
    backend=f'redis://{os.environ["REDIS_HOST"]}:6379/0',
)

app = create_app('default')
app_context = app.app_context()
app_context.push()


db.init_app(app)
logger = get_task_logger(__name__)

@celery_app.task(name="asignar_cita")
def asignar_cita(id: int):
    # get task
    print("task asignar cita")