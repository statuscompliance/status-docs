# Integración con Node-RED

Node-RED proporciona un entorno de programación basado en flujos para conectar dispositivos hardware, APIs y servicios en línea.

## Descripción General

El componente Node-RED de la API de STATUS te permite crear flujos de trabajo personalizados, integrar con servicios externos, procesar datos en tiempo real y construir automatizaciones personalizadas.

## Resumen de Endpoints

| Sección | Descripción |
|---------|-------------|
| [Autenticación](#autenticación) | Token de acceso y autenticación de Node-RED |
| [Características](#características) | Capacidades de programación basada en flujos y automatización |

**Nota:** El acceso a Node-RED está restringido a usuarios con niveles de autoridad DEVELOPER o ADMIN. El token de Node-RED se proporciona en la respuesta de [Endpoints de Autenticación](authentication-endpoints.md) al iniciar sesión.

## Autenticación

Todos los endpoints de Node-RED requieren autenticación. Los usuarios con niveles de autoridad DEVELOPER o ADMIN reciben automáticamente un token de Node-RED al iniciar sesión.

### Acceso al Token de Node-RED

El token de Node-RED se proporciona en la respuesta de autenticación:

```json
{
  "nodeRedToken": "string",
  "nodeRedAccess": true
}
```

Utiliza este token para autenticarte con los endpoints de Node-RED.

## Características

- **Programación Basada en Flujos**: Crea flujos de trabajo visuales usando el editor de Node-RED
- **Nodos Personalizados**: Usa nodos personalizados específicos de STATUS para la integración del sistema
- **Procesamiento en Tiempo Real**: Procesa y transforma datos en tiempo real
- **Integración de Servicios**: Conecta a APIs y servicios externos
- **Automatización**: Construye flujos de trabajo automatizados para gestión de cumplimiento y datos

## Notas

- El acceso a Node-RED está restringido a usuarios con niveles de autoridad DEVELOPER o ADMIN
- El token de Node-RED tiene una expiración de 7 días y puede ser renovado
- Los nodos personalizados de STATUS están disponibles para una integración perfecta con el sistema
