# BikesShowcase

Hola a todos, este proyecto se trata de un catálogo online totalmente open source pensada para kioskos de tiendas en general, el concepto principal trata de un catálogo de bicicletas con un carrousel de imágenes con un efecto flip gracias a la librería de [SwiperJs](https://swiperjs.com). Como página principal tienes un carrousel configurable y que funciona en tiempo real, asimismo brinda un panel de administración completo, seguro e intuitivo.

## Contenido técnico y gracias a:

* Angular universal
* NestJS
* MongoDb
* Passport
* Socket-io
* Nodemailer
* JWT
* Swagger
* SwipeJs
* Ng2-smart-table
* y mucho mas.

## Pre-requisitos

Se require de una base de datos en MongoDB y de configuraciones iniciales en el lado de las variables de entorno. Por tanto se provee una carpeta de configuración situada en la raiz del proyecto:

./config/env.sample

Debemos cambiar el nombre de este archivo a development.env o a production.env según sea necesario.

Posteriormente en las variables de entorno de nuestro sistema debemos configurar la variable general para elegir la version de nuestras variables de entorno:

`set BIKES=development` // Windows

`BIKES=development` // Linux

> NOTA: para la base de datos tenemos una instancia de Docker que podemos ejecutarla con el comando `npm run start:db` pero no nos olvidemos que antes debemos configurar las credenciales dentro del archivo 'docker-compose.yml'.

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

## Contribución

Siéntanse libres de realizar los Pull Request que quieran para mejorar este proyecto. Eventualmente estaré colocando los nuevos retos, tareas y convenciones que someteré a este proyecto.

## Contacto

Puedes contactarme a mi correo personal: ruslanguns@gmail.com
