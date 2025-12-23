---
sidebar_position: 6
tags:
  - status
  - integraciones
  - Node-RED
  - Grafana
  - OpenAI
keywords:
  - integraciones
  - Node-RED
  - Grafana
  - OpenAI
  - asistentes de IA
  - orquestación de flujos
  - visualización de datos
  - dashboards
  - monitoreo de cumplimiento
  - servicio de registro
  - servicios externos
  - STATUS
  - integración de servicios
authors:
  - name: "Equipo STATUS"
    title: "Colaboradores del Proyecto"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Integraciones con Servicios Externos

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

El sistema STATUS se integra con múltiples servicios externos para proporcionar funcionalidad integral para el monitoreo de cumplimiento, automatización de flujos de trabajo, visualización de datos y análisis impulsado por IA. Esta sección le guiará a través de entender y configurar estas integraciones.

## Visión General

STATUS proporciona integración sin problemas con:

- **Node-RED**: Orquestación de flujos de trabajo y procesamiento de datos
- **Grafana**: Visualización de datos y dashboards de monitoreo
- **OpenAI**: Asistentes impulsados por IA y procesamiento de lenguaje natural
- **Servicio de Registro**: Almacenamiento centralizado de datos de garantía

<div align="center">
![Visión General de Integraciones](/img/integrations/integrationsOverview.png)
**Figura 1:** *Integraciones de servicios externos de STATUS.*
</div>

<Alert>
La mayoría de las integraciones requieren configuración adicional. Asegúrese de tener las credenciales necesarias y derechos de acceso antes de configurar las integraciones.
</Alert>

## Integración con Node-RED

Node-RED es una herramienta poderosa para programar y automatizar flujos visualmente. STATUS usa Node-RED para:

- Ejecutar cálculos de cumplimiento
- Procesar y transformar datos
- Manejar eventos y desencadenar acciones
- Crear flujos de integración personalizados

### Cómo Funciona

Los flujos de Node-RED están vinculados a controles mediante **IDs de Mashup**. Cuando se desencadene un cálculo:

1. STATUS envía una solicitud a Node-RED con el ID de Mashup del control
2. Node-RED ejecuta el flujo correspondiente
3. El flujo recopila evidencia de fuentes de datos
4. La evidencia se procesa según la lógica del control
5. Los resultados se devuelven a STATUS como datos de cálculo

<div align="center">
![Flujo de Node-RED](/img/integrations/nodeRedFlow.png)
**Figura 2:** *Flujo de integración con Node-RED.*
</div>

### Ver Flujos de Node-RED

Para ver flujos de Node-RED vinculados a controles:

1. Navegue a una página de **Detalles de Control**
2. Haga clic en el enlace ***Ver Flujo de Node-RED***
3. Será redirigido a la interfaz de Node-RED
4. El flujo asociado con el control se mostrará

<Disclaimer>
Necesita acceso al servidor de Node-RED para ver y editar flujos. Contacte a su administrador si no tiene acceso.
</Disclaimer>

### Crear un Nuevo Flujo

Para crear un nuevo flujo de Node-RED para un control:

1. Acceda a la interfaz de Node-RED
2. Cree un nuevo flujo
3. Diseñe su flujo usando el editor visual de Node-RED
4. Añada nodos para recopilación de datos, procesamiento y salida
5. Configure el flujo para devolver resultados en el formato esperado
6. Despliegue el flujo
7. Copie el ID del flujo
8. Vincule el flujo a un control estableciendo el ID de Mashup

<div align="center">
![Editor de Node-RED](/img/integrations/nodeRedEditor.png)
**Figura 3:** *Editor visual de Node-RED.*
</div>

### Formato de Entrada/Salida de Flujo

STATUS espera que los flujos devuelvan datos en el siguiente formato:

```json
{
  "value": true,
  "evidences": [
    {
      "key": "evidence_key",
      "value": "evidence_value",
      "result": true,
      "from": "2025-01-01T08:00:00",
      "to": "2025-01-01T17:30:00"
    }
  ]
}
```

<Alert>
Asegúrese de que sus flujos de Node-RED devuelvan datos en el formato correcto. Los formatos incorrectos causarán fallos de cálculo.
</Alert>

### Patrones Comunes de Node-RED

Algunos patrones comunes para flujos de Node-RED en STATUS:

- **Nodos de Solicitud HTTP**: Llamian APIs externas para recopilar evidencia
- **Nodos de Función**: Transforman y procesan datos
- **Nodos de Base de Datos**: Consultan bases de datos para evidencia
- **Nodos de Filtro**: Filtran y validan datos
- **Nodos de Depuración**: Depuran y monitorean la ejecución del flujo

## Integración con Grafana

Grafana proporciona capacidades poderosas de visualización y monitoreo para STATUS.

### Características

La integración con Grafana permite:

- **Crear Dashboards**: Visualizar métricas y tendencias de cumplimiento
- **Monitoreo en Tiempo Real**: Monitorear la salud del sistema y el estado de cumplimiento
- **Gestión de Alertas**: Configurar alertas para violaciones de cumplimiento
- **Visualizaciones Personalizadas**: Crear gráficos, tablas y tableros
- **Variables de Plantilla**: Usar variables dinámicas para dashboards flexibles

<div align="center">
![Dashboard de Grafana](/img/integrations/grafanaDashboard.png)
**Figura 4:** *Ejemplo de dashboard de Grafana.*
</div>

### Acceder a Grafana

Para accedar a Grafana:

1. Navegue a la sección **Dashboards*** en STATUS
2. Haga clic en un dashboard para abrirlo
3. Será redirigido a Grafana con el dashboard precargado

<Disclaimer>
Grafana usa la autenticación de STATUS para acceso sin problemas. Se conectará automáticamente a Grafana cuando acceda desde STATUS.
</Disclaimer>

### Crear un Dashboard

Para crear un nuevo dashboard de Grafana:

1. Navegue a la sección **Dashboards*** en STATUS
2. Haga clic en el botón ***Crear Dashboard***
3. Configure el dashboard:
   - **Nombre**: Nombre descriptivo para el dashboard
   - **Descripción**: Qué muestra el dashboard
   - **Paneles**: Añada paneles y configure visualizaciones
   - **Consultas**: Configure consultas de datos
   - **Variables**: Añada variables de plantilla si es necesario
4. Haga clic en ***Guardar*** para crear el dashboard

<div align="center">
![Crear Dashboard](/img/integrations/createDashboard.png)
**Figura 5:** *Formulario de creación de dashboard.*
</div>

### Paneles de Dashboard

Los dashboards están compuestos por paneles que muestran datos:

- **Series Temporales**: Visualizar datos a lo largo del tiempo
- **Indicadores**: Mostrar valores actuales con umbrales
- **Tablas**: Mostrar datos en formato tabular
- **Paneles de Estadísticas**: Mostrar métricas clave
- **Mapas de Calor**: Mostrar densidad de datos y patrones

<div align="center">
![Panel de Dashboard](/img/integrations/dashboardPanel.png)
**Figura 6:** *Panel de dashboard.*
</div>

### Alertas

Grafana permite configurar alertas basadas en sus datos:

1. Configure condiciones de alerta basadas en umbrales
2. Configure canales de notificación (correo electrónico, Slack, etc.)
3. Defina intervalos de evaluación y agrupación
4. Pruebe alertas para asegurar que funcionen correctamente

<div align="center">
![Configuración de Alerta](/img/integrations/alertConfiguration.png)
**Figura 7:** *Configuración de alerta de Grafana.*
</div>

<Disclaimer>
Las alertas se gestionan en Grafana. Asegúrese de que su instancia de Grafana tenga acceso a los canales de notificación que desea usar.
</Disclaimer>

### Gestión de Dashboards

Puede gestionar dashboards desde la interfaz de STATUS:

- **Editar Dashboard**: Modificar dashboards existentes
- **Eliminar Dashboard**: Eliminar dashboards que ya no necesita
- **Exportar Dashboard**: Exportar configuración de dashboard
- **Importar Dashboard**: Importar dashboards desde archivos
- **Ver Historia**: Rastrear cambios a dashboards

## Integración con OpenAI

STATUS se integra con OpenAI para proporcionar capacidades impulsadas por IA para la gestión de cumplimiento.

### Asistentes de IA

La integración con OpenAI permite:

- **Crear Asistentes**: Crear asistentes inteligentes para tareas específicas de cumplimiento
- **Procesamiento de Lenguaje Natural**: Procesar y analizar documentos de cumplimiento
- **Insights Automatizados**: Generar recomendaciones de cumplimiento
- **Gestión de Conversaciones**: Mantener conversaciones conscientes del contexto

<div align="center">
![Asistente de IA](/img/integrations/aiAssistant.png)
**Figura 8:** *Interfaz de asistente de IA.*
</div>

### Crear un Asistente

Para crear un nuevo asistente de IA:

1. Navegue a la sección **Asistentes***
2. Haga clic en el botón ***Crear Asistente***
3. Configure el asistente:
   - **Nombre**: Nombre descriptivo para el asistente
   - **Descripción**: Qué hace el asistente
   - **Instrucciones**: Guías para el comportamiento del asistente
   - **Modelo**: Seleccione el modelo de OpenAI a usar
   - **Herramientas**: Habilite herramientas como intérprete de código, búsqueda de archivos, etc.
   - **Base de Conocimiento**: Suba documentos relevantes
4. Haga clic en ***Guardar*** para crear el asistente

<div align="center">
![Crear Asistente](/img/integrations/createAssistant.png)
**Figura 9:** *Formulario de creación de asistente.*
</div>

### Chatear con Asistente

Para interactuar con un asistente de IA:

1. Navegue a la sección **Asistentes***
2. Seleccione un asistente
3. Escriba su mensaje en la interfaz de chat
4. El asistente responderá basado en sus instrucciones y conocimiento
5. Continúe la conversación según sea necesario

<Alert>
Los asistentes de IA mantienen el contexto de la conversación, permitiendo conversaciones naturales de múltiples vueltas sobre temas de cumplimiento.
</Alert>

### Capacidades del Asistente

Los asistentes de IA pueden:

- **Responder Preguntas**: Responder preguntas relacionadas con el cumplimiento
- **Analizar Documentos**: Analizar documentos de cumplimiento y regulaciones
- **Generar Informes**: Generar informes y resúmenes de cumplimiento
- **Recomendar Acciones**: Sugerir acciones para problemas de cumplimiento
- **Explicar Conceptos**: Explicar conceptos complejos de cumplimiento

### Gestionar Conversaciones

Puede gestionar sus conversaciones con asistentes:

- **Ver Historia**: Ver conversaciones pasadas
- **Eliminar Conversaciones**: Eliminar conversaciones que ya no necesita
- **Exportar Conversaciones**: Exportar conversaciones para documentación
- **Archivar Conversaciones**: Archivar conversaciones para referencia posterior

<div align="center">
![Historia de Conversaciones](/img/integrations/conversationHistory.png)
**Figura 10:** *Vista de historia de conversaciones.*
</div>

### Configurar la API de OpenAI

Para usar la integración con OpenAI, necesita:

1. Obtener una clave API de OpenAI de https://platform.openai.com
2. Configurar la clave API en los ajustes de STATUS
3. Seleccionar el modelo por defecto a usar
4. Configurar límites de tasa y políticas de uso

<Disclaimer>
El uso de la API de OpenAI incurre en costos. Monitoree su uso y establezca límites apropiados para controlar los costos.
</Disclaimer>

## Integración con el Servicio de Registro

El Servicio de Registro proporciona almacenamiento y gestión centralizados de puntos de garantía.

### Características

El Servicio de Registro ofrece:

- **Almacenamiento Centralizado**: Todos los puntos de garantía en un solo lugar
- **Sincronización de Datos**: Sincronizar datos de cumplimiento a través de servicios
- **Rastreo Histórico**: Mantener registros históricos de cumplimiento
- **Capacidades de Consulta**: Consultas avanzadas de datos de cumplimiento
- **Acceso API**: API RESTful para acceso externo

<div align="center">
![Servicio de Registro](/img/integrations/registryService.png)
**Figura 11:** *Arquitectura del servicio de registro.*
</div>

### Acceder a Datos de Registro

Los puntos de garantía se almacenan automáticamente en el Servicio de Registro cuando se completan los cálculos. Puede:

- **Consultar Datos**: Consultar puntos de garantía vía API
- **Filtrar Resultados**: Filtrar por varios criterios
- **Agregaar Datos**: Agregaar datos para análisis
- **Exportar Datos**: Exportar datos para herramientas externas

### API de Registro

El Servicio de Registro proporciona una API RESTful para accedar a datos:

```bash
# Consultar puntos de garantía
GET /api/registry/guarantees?control_id=xxx&from=2025-01-01&to=2025-12-31

# Obtener cumplimiento agregado
GET /api/registry/compliance?catalog_id=xxx&scope=environment:production

# Obtener tendencias históricas
GET /api/registry/trends?control_id=xxx&period=monthly
```

<Alert>
La autenticación de API de Registro usa tokens de STATUS. Asegúrese de tener credenciales de autenticación válidas cuando llame a la API.
</Alert>

## Configuración de Integración

La mayoría de las integraciones requieren configuración antes de su uso.

### Configurar Node-RED

Para configurar la integración con Node-RED:

1. Establezca la variable de entorno `VITE_NODE_RED_URL`
2. Configure la autenticación entre STATUS y Node-RED
3. Asegúrese de que STATUS pueda alcanzar el servidor de Node-RED

### Configurar Grafana

Para configurar la integración con Grafana:

1. Establezca la variable de entorno `VITE_GRAFANA_URL`
2. Configure la autenticación OAuth o clave API
3. Configure fuentes de datos en Grafana para conectarse a las bases de datos de STATUS
4. Configure canales de notificación para alertas

### Configurar OpenAI

Para configurar la integración con OpenAI:

1. Obtenga una clave API de OpenAI
2. Establezca la variable de entorno `OPENAI_API_KEY`
3. Seleccione el modelo por defecto a usar
4. Configure límites de tasa y políticas de uso

### Configurar el Servicio de Registro

Para configurar la integración con el Servicio de Registro:

1. Establezca la variable de entorno `REGISTRY_SERVICE_URL`
2. Configure la autenticación entre STATUS y el Servicio de Registro
3. Configure políticas de sincronización

<Disclaimer>
La configuración de integración requiere que se establezcan variables de entorno en el archivo `.env`. Contacte a su administrador si no tiene acceso a estos ajustes.
</Disclaimer>

## Mejores Prácticas

Siga estas mejores prácticas para el uso eficaz de las integraciones:

1. **Seguridad**: Asegure todas las integraciones con autenticación apropiada
2. **Monitoreo**: Monitoree la salud y el rendimiento de las integraciones
3. **Manejo de Errores**: Implemente un manejo apropiado de errores en flujos y dashboards
4. **Documentación**: Documente sus flujos, dashboards y asistentes
5. **Pruebas**: Pruebe las integraciones a fondo antes de ponerlas en producción
6. **Límites de Tasa**: Respete los límites de tasa para APIs externas
7. **Gestión de Costos**: Monitoree y gestione los costos, especialmente para OpenAI
8. **Respaldo**: Respalde flujos, dashboards y configuraciones importantes

<Alert>
Las integraciones extienden significativamente las capacidades de STATUS pero requieren una configuración y monitoreo cuidadosos. Invierta tiempo en entender cada integración y sus opciones de configuración.
</Alert>

## Solución de Problemas

### Los Flujos de Node-RED No Se Ejutan

Si los flujos de Node-RED no se están ejecutando:

1. Verifique que el servidor de Node-RED sea accesible
2. Verifique que el ID de Mashup sea correcto
3. Revise los registros de flujo en busca de errores
4. Asegúrese de que las fuentes de datos sean accesibles desde Node-RED

### Los Dashboards de Grafana No Cargan

Si los dashboards de Grafana no están cargando:

1. Verifique que la URL de Grafana sea correcta
2. Verifique la autenticación entre STATUS y Grafana
3. Verifique que las fuentes de datos estén configuradas en Grafana
4. Revise los registros de Grafana en busca de errores

### Los Asistentes de OpenAI No Responden

Si los asistentes de OpenAI no están respondiendo:

1. Verifique que la clave API de OpenAI sea válida
2. Verifique que tiene créditos de API disponibles
3. Revise la configuración del asistente
4. Verifique la conectividad de red con OpenAI

<Disclaimer>
Para problemas complejos de integración, revise los registros o contacte soporte para asistencia.
</Disclaimer>
