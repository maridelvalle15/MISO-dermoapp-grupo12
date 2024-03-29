# DermoApp Grupo 12

###### Bienvenido al repositorio del código del conjunto de aplicaciones para DermoApp del Grupo 12. A continuación encontrará las instrucciones de configuración y ejecución de la aplicación, así como algunas consideraciones.

## Configuración aplicación backend: autenticacion

 * Base de datos: se puede configurar una base de datos SQLite o Postgres, a través de la variable de ambiente DB_URI (como se puede ver en el archivo .env.example). Para funcionamiento local, se puede colocar en el archivo .env o setearlo a través de la ejecución de EXPORT en consola. Para configurarlo en el contenedor de docker, debe colocarse en el archivo variables-prod-autenticacion.env. El archivo de variables de ambiente debe estar en la carpeta autenticacion
 * Configuración bucket S3: igual que el punto anterior, para local y el contenedor de docker, pero en las variables de ambiente: AWS_BUCKET_NAME, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY y AWS_DOMAIN

## Ejecución aplicación backend: autenticacion

 * Local: en la carpeta flask ejecutar flask run
 * Contenedor de docker: en la carpeta autenticacion, ejecutar docker compose build y luego docker compose up

## Consideraciones aplicación backend: autenticacion

 * Las especialidades permitidas son: General, Clinica, Cosmetica, Laser, Quirurgica (se cargan a la base de datos al levantar la aplicación).
 * Los tipos de piel que maneja la aplicación son: normal, seca, grasa, mixta, sensible (no están cargadas en la aplicación pero son las que maneja la aplicación para gestionar los casos de los pacientes).
 * Para los servicios de registro y suministro de información de la lesión, se requiere cargar imágenes por parte del usuario. Para que funcione correctamente se deben configurar las variables de ambiente indicadas en el archivo .env.example con las credenciales programáticas de AWS para su correcto funcionamiento
* Información permitida de ubicacion para registro: 
   - Pais - Ciudad: (co, bog) - (ve, ccs) - (ar, bai) - (ca, yyz)

## Configuración aplicación backend: servicios_salud

 * Base de datos: misma configuración que la aplicación backend autenticación, pero para la configuracion del contenedor de docker, el archivo de variables de ambiente debe llamarse variables-prod-salud. El archivo de variables de ambiente debe estar en la carpeta servicios_salud
 * Configuración bucket S3: misma configuración que la aplicación backend autenticación
 * Url de acceso a la aplicación backend autenticación: así como en la configuración de base de datos y bucket S3, para local y el contenedor de docker, pero en la variable de ambiente AUTH_BASE_URI
 * Uso de cola de tareas para asignación de cita: se debe configurar la variable de ambiente REDIS_HOST de acuerdo si se esta accediendo localmente (localhost) o desde los contenedores docker (redis)

## Ejecución aplicación backend: servicios_salud

 * Local: en la carpeta flask ejecutar flask run
 * Contenedor de docker: en la carpeta autenticacion, ejecutar docker compose build y luego docker compose up
 * El servicio de autenticación debe estar ejecutándose para el correcto funcionamiento del servicio servicios_salud
 * El worker de celery y el servicio de redis (configurados en el archivo docker-compose) deben estar ejecutándose para el correcto funcionamiento del servicio servicios_salud

## Consideraciones aplicación backend: servicios_salud

 * Información de lesión permitida: el backend recibe los códigos que corresponden a cada uno de los ítems que conforman la información de la lesión. A continuación la información permitida incluyendo los códigos correspondientes:
   - Tipo de lesión: mac - macula ; pap - papula ; par - parche ; pla - placa ; nod - nodulo ; amp - ampolla ; ulc - ulcera ; ves - vesicula
   - Forma de lesión: ani - anillo ; dom - domo ; enr - enrollada ; ind - indefinida ; ova - ovalada ; red - redonda
   - Número de lesiones: dis - diseminada ; mul - multiple ; rec - recurrente ; sol - solitaria
   - Distribución de lesión: asi - asimetrica ; con - confluente ; esp - esparcida ; sim - simetrica
* Match de especialidad del médico con lesiones del paciente y tipo de piel: se implementa una tabla match_especialidades que contiene una 3-tupla en la que se encuentra qué tipos de lesion y piel corresponden a las distintas especialidades que maneja la aplicación. Se describen a continuación:
   - General - ampolla - normal
   - General - ampolla - mixta
   - General - ulcera - normal
   - General - ulcera - mixta
   - General - vesicula - normal
   - General - vesicula - mixta
   - Clinica - macula - normal
   - Clinica - macula - seca
   - Clinica - macula - grasa
   - Clinica - macula - mixta
   - Clinica - macula - sensible
   - Clinica - parche - normal
   - Clinica - parche - seca
   - Clinica - parche - grasa
   - Clinica - parche - mixta
   - Clinica - parche - sensible
   - Cosmetica - placa - seca
   - Cosmetica - placa - grasa
   - Cosmetica - placa - sensible
   - Laser - papula - normal
   - Laser - papula - mixta
   - Quirurgica - nodulo - normal
   - Quirurgica - nodulo - seca
   - Quirurgica - nodulo - grasa
   - Quirurgica - nodulo - mixta
   - Quirurgica - nodulo - sensible

   ## Consideraciones productivas
   * Los archivos variables-prod-autenticacion.env y variables-prod-salud.env deben existir en el bucket de s3 dermoapp-config. Esto para que al momento del despliegue se puedan tomar las variables con valores de credenciales productivas y que no deben ser expuestas en el repositorio publico

   ## DevOps
   ### Integración Continua
   * Tanto las aplicaciones backend en flask (autenticacion y servicios salud) como la aplicacion frontend en angular tienen configurados workflows en github actions para ejecutar las pruebas unitarias y mostrar los porcentajes de cobertura. Se ejecutan cuando se abre un pull request a cualquier rama.
   ### Despliegue Continuo
   * Las aplicaciones backend en flask tienen configurados workflows en github actions para hacer deploy de la aplicacion a instancias EC2 creadas y ejecutándose en AWS. De igual forma, la aplicación web tiene configurado su respectivo workflow en github actions para hacer deploy a un bucket S3 en AWS. Se configuran SECRETS en el repositorio para poder realizar la conexión ssh y ejecutar los comandos necesarios para actualizar el código y levantar los contenedores de docker. Se ejecutan cuando se cierra un pull request a la rama main.