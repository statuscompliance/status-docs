# API del Backend

La API del Backend de STATUS proporciona la funcionalidad principal para la gestión de datos y la lógica de negocio.

## Descripción General

La API del backend gestiona el almacenamiento y recuperación de datos, el procesamiento de lógica de negocio, la autenticación y autorización, y la integración con servicios externos.

## Secciones de la API

| Sección | Descripción |
|---------|-------------|
| [Endpoints de Autenticación](authentication-endpoints.md) | Flujos de autenticación detallados incluyendo 2FA y OAuth |
| [Dominio de Cumplimiento](compliance-apis.md) | Endpoints RESTful para gestionar catálogos, controles, cálculos y puntos |
| [Integración de Datos](data-integration-apis.md) | APIs de Databinder, Linker, gestión de ámbitos y proxy de Grafana |
| [Configuración del Sistema](system-config-apis.md) | Endpoints exclusivos para administradores para gestionar disponibilidad y configuraciones de servicios |
| [Asistente de IA](ai-assistant-apis.md) | APIs de asistente OpenAI, hilos de conversación y mensajes (OBSOLETO) |
| [Integración de Node-RED](node-red.md) | Entorno de programación basada en flujo para flujos de trabajo y automatización |

## Notas

- Todos los endpoints tienen como prefijo el `API_PREFIX` configurado en las variables de entorno
- La autenticación es requerida para todas las rutas protegidas
- Es posible que se aplique limitación de velocidad a ciertos endpoints
