# BikesShowcase

Este proyecto se trata de un catálogo online totalmente open source pensada para kioskos de tiendas en general, el concepto principal trata de un catálogo de bicicletas con un carrousel de imágenes con un efecto flip gracias a la librería de [SwiperJs](https://swiperjs.com). Como página principal tienes un carrousel configurable y que funciona en tiempo real, asimismo brinda un panel de administración completo, seguro e intuitivo.

## Contenido técnico y gracias a:

- Angular universal
- NestJS
- MongoDb
- Passport
- Socket-io
- Nodemailer
- JWT
- Swagger
- SwipeJs
- Ng2-smart-table
- y mucho mas.

## Pre-requisitos

Se require de una base de datos en MongoDB y de configuraciones iniciales en el lado de las variables de entorno. Por tanto se provee una carpeta de configuración situada en la raiz del proyecto:

./config/env.sample

Parece doble trabajo pero por seguridad se ha decidido así, necesitamos definir algunas variables de entorno del lado del servidor, muestro el ejemplo en caso de que estemos en Linux, puede variar según el sistema operativo:

```bash
# Definir variables del lado del OS
export BIKES=development # o bien production
export PORT=80
export DB_PORT=27017
export DB_USERNAME=cash
export DB_PASSWORD=123
export DB_NAME=bikes

# Probar dichas variables - Se espera que retornen el valor asignado
echo $BIKES
echo $PORT
echo $DB_PORT
echo $DB_USERNAME
echo $DB_PASSWORD
echo $DB_NAME
```

Las variables de entorno que estemos definiendo en el lado del sistema operativo son solo en el caso que usemos Docker como nuestro anfitrión para lanzar la applicación, podemos ignorar esta parte y ajustar el archivo `docker-compose.yml` según nuestras necesidades.

`BIKES=development` // Linux

> Esta variable define la versión de nuestro deploy.

> NOTA: Si solo queremos lanzar la base de datos, podemos ejecutar el script `npm run start:db` pero no nos olvidemos que antes debemos configurar las credenciales en las variables de entorno de nuestro sistema operativo o dentro del archivo 'docker-compose.yml'.

## Instalación.

Antes de nada tener en cuenta los pre-requisitos para poder usar el proyecto, luego después de descargar/clonar este repositorio, desde la raiz del mismo, ejecutamos el siguiente comando para instalarlo:

`npm i`.

Posteriormente genera el build del proyecto:

`npm run build:ssr`

Y lanza el servidor

`npm run start:ssr`

## Development

Para contribuir o mejorar el proyecto necesitarás tener en cuenta los pre-requisitos y ejecutamos el siguiente comando:

`npm run serve`

> NOTA: Ver el archivo 'package.json' para ver los demás comandos.

## Actualizar proyecto

Antes de actualizar es importante leer el estado de este repositorio y si se encuentran otras actualizaciones en éste mismo.

El proceso de actualización es muy sencillo pero involucra un rebuild del proyecto por completo, para facilitar el proceso he creado un script automático para no estar ejecutando manualmente todo.

### Requisitos técnicos:

- Posibilidad de correr scripts con una terminal de comandos BASH
- [Git](https://git-scm.com/).

### Actualización del código:

`npm run upgrade`

> Es muy importante para que este proceso funcione, que no hayamos hechos cambios en el código huesped, intentemos hacer nuestras modificaciones en una rama paralela o en un directorio por separado para no crear conflictos innecesarios en la actualización.

## Proyectos relacionados

- [Application Script for linux](https://github.com/ruslanguns/linux-application-shortcut) - Author: Ruslan Gonzalez

## Contribución

Siéntanse libres de realizar los Pull Request que quieran para mejorar este proyecto. Eventualmente estaré colocando los nuevos retos, tareas y convenciones que someteré a este proyecto.

## Contacto

Puedes contactarme a mi correo personal: ruslanguns@gmail.com
