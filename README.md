# DermoApp Grupo 12

###### Bienvenido al repositorio del código del conjunto de aplicaciones para DermoApp del Grupo 12. A continuación encontrará las instrucciones de configuración y ejecución de la aplicación, así como algunas consideraciones.

## Configuración aplicación backend: autenticacion

 * Base de datos: se puede configurar una base de datos SQLite o Postgres, a través de la variable de ambiente DB_URI (como se puede ver en el archivo .env.example). Para funcionamiento local, se puede colocar en el archivo .env o setearlo a través de la ejecución de EXPORT en consola. Para configurarlo en el contenedor de docker, debe colocarse en el archivo variables.env
 * Configuración bucket S3: igual que el punto anterior, para local y el contenedor de docker, pero en las variables de ambiente: AWS_BUCKET_NAME, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY y AWS_DOMAIN

## Ejecución aplicación backend: autenticacion

 * Local: en la carpeta flask ejecutar flask run
 * Contenedor de docker: en la carpeta autenticacion, ejecutar docker compose build y luego docker compose up

## Consideraciones aplicación backend: autenticacion

 * Actualmente la única ubicación permitida es Colombia - Bogota. El backend lo recibe con los códigos 'co' y 'bog'.
 * Las especialidades permitidas son: General, Clinica, Cosmetica, Laser, Quirurgica (se cargan a la base de datos al levantar la aplicación).
 * Los tipos de piel que maneja la aplicación son: normal, seca, grasa, mixta, sensible (no están cargadas en la aplicación pero son las que maneja la aplicación para gestionar los casos de los pacientes).

## Configuración aplicación backend: servicios_salud

 * Base de datos: misma configuración que la aplicación backend autenticación
 * Configuración bucket S3: misma configuración que la aplicación backend autenticación
 * Url de acceso a la aplicación backend autenticación: así como en la configuración de base de datos y bucket S3, para local y el contenedor de docker, pero en la variable de ambiente AUTH_BASE_URI

## Ejecución aplicación backend: servicios_salud

 * Local: en la carpeta flask ejecutar flask run
 * Contenedor de docker: en la carpeta autenticacion, ejecutar docker compose build y luego docker compose up

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