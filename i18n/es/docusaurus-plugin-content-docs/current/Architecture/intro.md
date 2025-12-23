---
sidebar_position: 1
tags:
  - arquitectura
  - infraestructura
  - despliegue
keywords:
  - arquitectura
  - infraestructura
  - microservicios
  - despliegue
  - Docker
  - diseño del sistema
  - arquitectura de red
---

# Arquitectura

<div class="justified-text">
El sistema STATUS es un completo sistema de gestión del cumplimiento de los procesos empresariales diseñado para integrar múltiples componentes y sistemas externos con el fin de garantizar que los procesos empresariales cumplen las normas reglamentarias y organizativas.

### Arquitectura lógica

La arquitectura del Sistema STATUS se divide en varios componentes clave: Presentación, Lógica de Negocio, Persistencia de Datos, y varios sistemas externos incluyendo Governance, GitHub, Trello, Node-RED, y OpenAI (ver Figura 1).

<p align="center">
<img src="\img\logicArchitecture.png" alt="portada" width="70%" height="70%"/>
Figura 1. Arquitectura lógica
</p>

#### Capa de presentación

La capa de presentación se encarga de interactuar con los usuarios finales. Maneja las entradas del usuario y muestra la información necesaria a los usuarios. Esta capa se comunica con la capa de lógica empresarial para obtener y mostrar los datos, proporcionando una interfaz fácil de usar para las tareas de gestión del cumplimiento.

#### Capa de lógica empresarial

La capa de lógica empresarial es el núcleo del sistema STATUS y encapsula las principales funcionalidades de la aplicación. Se compone de varias interfaces, cada una responsable de una parte distinta de la funcionalidad del sistema:

- **Gestión de control**: Gestiona el flujo de control general y la coordinación de los procesos de cumplimiento.
- Gestión mixta\*\*: Gestiona la integración de varias fuentes de datos y servicios para crear informes de cumplimiento exhaustivos.
- Gestión del catálogo\*\*: Gestiona el catálogo de controles dentro del sistema.
- **Gestión de Chat**: Apoya a los usuarios para facilitar la creación de mashups.
- Gestión de entradas\*\*: Gestiona las entradas de los usuarios relacionadas con los datos de cumplimiento.
- **Gestión de usuarios**: Gestiona los datos, la autenticación y las funciones de los usuarios, garantizando que sólo el personal autorizado pueda acceder a la información relacionada con el cumplimiento y modificarla.

#### Capa de persistencia de datos

La capa de persistencia de datos se encarga de almacenar y recuperar los datos de cumplimiento. Incluye un sólido sistema de base de datos que garantiza la integridad y disponibilidad de los datos. El sistema de base de datos está conectado a un sistema de gestión de documentos (DMS) para gestionar el almacenamiento y la recuperación de documentos, garantizando que todos los documentos de cumplimiento estén almacenados de forma segura y sean fácilmente accesibles.

#### Integración con sistemas externos

El sistema STATUS se integra con varios sistemas externos para mejorar su funcionalidad:

- Sistema Governify\*\*: Proporciona estadísticas de cumplimiento a través de un cuadro de mandos con gráficos.
- Sistema GitHub\*\*: Permite a los usuarios realizar comprobaciones de cumplimiento en dichas plataformas.
- Sistema Trello\*\*: Permite a los usuarios realizar comprobaciones de conformidad en dichas plataformas.
- **Sistema Node-RED**:Proporciona a los técnicos del sistema un editor para crear y modificar mashups existentes.
- Sistema OpenAI\*\*: Incorpora capacidades avanzadas de IA para el procesamiento del lenguaje natural y otras funcionalidades basadas en IA, ayudando a crear y describir mashups.

### Arquitectura de despliegue

<p align="center">
<img src="\img\deployment.png" alt="portada" width="70%" height="70%"/>
Figura 2. Arquitectura de despliegue
</p>

La arquitectura de despliegue del Sistema STATUS implica múltiples dispositivos y entornos de ejecución para garantizar una alta disponibilidad y escalabilidad (véase la Figura 2). Los principales componentes son

- Cliente de usuario\*\*: Ejecuta Node-RED y un navegador web para operaciones del lado del cliente, permitiendo a los usuarios interactuar con el sistema.
- Servidor Web\*\*: Aloja una aplicación ExpressJS en NodeJS, sirviendo como servidor backend que procesa los datos de cumplimiento y las solicitudes de los usuarios.
- Servidor de base de datos\*\*: Utiliza MySQL para el almacenamiento de datos, gestionado a través del ORM Sequelize, garantizando una gestión de datos fiable y eficiente.
- Infraestructura BlueJay\*\*: Proporciona soporte de infraestructura adicional para mostrar gráficos de cumplimiento.
- Servidor OpenAI\*\*: Aloja los servicios OpenAI para las funcionalidades de IA, permitiendo el análisis avanzado de datos y la comprensión del lenguaje natural.

La comunicación entre estos componentes se realiza principalmente a través de protocolos HTTP/HTTPS, lo que garantiza un intercambio de datos seguro y eficiente.

En resumen, el sistema STATUS es un sistema de gestión del cumplimiento de los procesos empresariales robusto y flexible que integra diversos componentes y servicios externos para ofrecer una solución completa de gestión de los procesos de cumplimiento. Su arquitectura modular garantiza la escalabilidad y la facilidad de mantenimiento, lo que lo hace adecuado para una amplia gama de aplicaciones a la hora de garantizar el cumplimiento de las normas reglamentarias y organizativas.

</div>
