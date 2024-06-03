# Node-RED

Node-RED es una plataforma de programación visual basada en Node.js que permite a los usuarios conectar dispositivos y servicios web de forma intuitiva a través de flujos de trabajo gráficos, facilitando la creación de aplicaciones IoT (Internet of Things) y de automatización. En el proyecto de investigación se utilizará para diseñar mashups capaces de medir el cumplimiento de la normativa.

Con el fin de recopilar información de diferentes plataformas para medir el cumplimiento, se han diseñado los siguientes nodos:

<p align="center">
<img src="\img\customNodes.png" alt="portada" width="60%" height="60%"/>
Figura 1. Nodos personalizados de Node-RED.
</p>

A continuación se describe el funcionamiento de cada uno de los nodos de la Figura 1.

- `trello-colector`: Dado el id de un tablero trello, la clave API y el token, devuelve los repositorios github vinculados a cada tarjeta existente.
- `filter-by`: Dado el nombre del atributo que se va a utilizar para los faltantes, el valor del filtro y el tipo de filtro, devuelve los objetos que pasan el filtro.
- `exists-section-in-doc`: Dado el nombre de la organización de GitHub, el nombre del repositorio, la ruta del archivo, el nombre del archivo, la sección que debe contener y el token de GitHub, devuelve true si ese documento contiene la sección dada.
- `exists-url`: devuelve true si una tarjeta de tablero trello tiene un repositorio github asociado. Parámetros de entrada: el id de la tarjeta, la clave API de trello, el token de autorización de trello y el token de GitHub.
- `exists-pipe`: devuelve true si el array dado tiene la misma longitud que el parámetro «count».
- `filter-by-date`: Dado el nombre del atributo a utilizar para filtrar y el periodo a filtrar, devuelve los objetos que pasan el filtro.
- `github-collector`: Dado el nombre de usuario de github, el nombre del repositorio, la ruta del archivo, el nombre del archivo y el token de GitHub, devuelve el contenido del archivo.
- `url-to-doc`: Dado el nombre de la organización de GitHub, el nombre del repositorio, la ruta del archivo, el nombre del archivo, la sección que debe contener y el token de GitHub, devuelve el contenido del archivo.
- `project-to-url`: Dado el id de un tablero trello, el id de una tarjeta trello en el tablero, la clave API y el token trello, devuelve los repositorios github vinculados a la tarjeta dada.

Además de esto, también se ha desarrollado un chatbot para ayudar a los usuarios no técnicos a crear y describir los flujos de Node-RED (Puedes consultar la [<u>Integración OpenAI</u>](/docs/Tooling/openAI)).

Si quieres probar estos nodos sin iniciar sesión en el sistema, puedes seguir la guía de instalación de [<u>Nodos STATUS</u>](/docs/Getting-started/nodeRED)
