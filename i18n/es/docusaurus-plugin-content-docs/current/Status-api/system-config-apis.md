# Configuración del Sistema

Endpoints exclusivos para administradores para gestionar la disponibilidad de endpoints, configuración de servicios y límites del sistema.

## Descripción General

Las APIs de Configuración del Sistema proporcionan control administrativo sobre la disponibilidad de endpoints, configuraciones de servicios y límites de recursos. Estos endpoints están restringidos a usuarios con rol de ADMIN y están montados bajo `/api/v1/config` (configurable mediante la variable de entorno `API_PREFIX`).

## Configuración Base

### Obtener Todas las Configuraciones

**GET** `/config`

Recupera todas las configuraciones de endpoints del sistema.

**Autenticación:** Solo administradores (token Bearer requerido)

**Respuesta (200 OK):**
```json
[
  {
    "id": "uuid",
    "endpoint": "/users",
    "available": true,
    "limit": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Respuestas de Error:**
- `401 Unauthorized`: No se proporcionó token
- `403 Forbidden`: El usuario no es administrador
- `500 Internal Server Error`: Error de base de datos

### Obtener Configuración por Endpoint

**POST** `/config`

Recupera una configuración de endpoint específica por ruta de endpoint.

**Cuerpo de la Solicitud:**
```json
{
  "endpoint": "/users"
}
```

**Respuesta (200 OK):**
```json
{
  "id": "uuid",
  "endpoint": "/users",
  "available": true,
  "limit": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Respuestas de Error:**
- `404 Not Found`: Configuración no encontrada
- `500 Internal Server Error`: Error de base de datos

### Actualizar Configuración

**PUT** `/config`

Actualiza el estado de disponibilidad de una configuración de endpoint.

**Cuerpo de la Solicitud:**
```json
{
  "endpoint": "/users",
  "available": false
}
```

**Respuesta (200 OK):**
```json
{
  "message": "Configuration <id> updated successfully"
}
```

**Nota:** Este endpoint actualiza automáticamente la caché de configuración en memoria después de actualizar.

**Respuestas de Error:**
- `400 Bad Request`: Falta el parámetro endpoint
- `404 Not Found`: Configuración no encontrada
- `500 Internal Server Error`: Error de base de datos

## Límite de Asistente

### Obtener Límite de Asistente

**GET** `/config/assistant/limit`

Recupera el límite actual de creación de asistentes.

**Respuesta (200 OK):**
```json
{
  "limit": 100
}
```

**Respuestas de Error:**
- `400 Bad Request`: Límite no establecido en la configuración
- `404 Not Found`: Configuración de asistente no encontrada

### Actualizar Límite de Asistente

**PUT** `/config/assistant/limit/:limit`

Actualiza el límite de creación de asistentes.

**Parámetros de Ruta:**
- `limit` (entero): El nuevo valor del límite (debe ser ≥ 1)

**Respuesta (200 OK):**
```json
{
  "message": "Limit updated successfully"
}
```

**Reglas de Validación:**
- El límite debe ser un entero ≥ 1
- El límite no puede ser menor que el número actual de asistentes
- Actualiza automáticamente la caché después de actualizar

**Respuestas de Error:**
- `400 Bad Request`: Valor de límite inválido o límite menor que los asistentes actuales
- `404 Not Found`: Configuración de asistente no encontrada
- `500 Internal Server Error`: Error de base de datos

## Modelo de Datos de Configuración

El modelo `Configuration` almacena la configuración de endpoints en PostgreSQL con el siguiente esquema:

| Campo       | Tipo        | Descripción                                    |
|-------------|-------------|------------------------------------------------|
| `id`        | UUID        | Clave primaria                                 |
| `endpoint`  | String(50)  | Ruta del endpoint API                         |
| `available` | Boolean     | Si el endpoint está habilitado (default: true) |
| `limit`     | Integer     | Límite de recurso opcional (default: 1)        |
| `createdAt` | Timestamp   | Hora de creación del registro                 |
| `updatedAt` | Timestamp   | Hora de última actualización del registro      |

## Sistema de Disponibilidad de Endpoints

El sistema utiliza middleware para hacer cumplir la disponibilidad de endpoints antes de procesar solicitudes:

1. **Verificación de Caché**: Lee de `configurationsCache` en memoria para rendimiento
2. **Coincidencia de Prefijos**: Utiliza coincidencia de prefijo más largo para encontrar la configuración aplicable
3. **Aplicación de Disponibilidad**: Devuelve 404 si el endpoint está deshabilitado

### Gestión de Caché

La caché se gestiona a través de tres funciones:
- `getConfigurationsCache()`: Devuelve la caché actual
- `setConfigurationsCache(value)`: Establece el valor de la caché
- `updateConfigurationsCache()`: Actualiza la caché desde la base de datos

**Importante:** La caché se actualiza automáticamente cuando las configuraciones se actualizan a través de la API, pero no cuando se modifican directamente en la base de datos.

## Aplicación de Límites de Asistente

El middleware `assistantlimitReached` hace cumplir los límites de creación comparando el conteo actual de asistentes con el límite configurado. Cuando se alcanza el límite, devuelve HTTP 429 "Limit reached".

## Autenticación

Todos los endpoints requieren autenticación JWT con rol de ADMIN:

```
Authorization: Bearer <admin-jwt-token>
```

Los intentos de acceso no autorizado se registran y pueden activar alertas de seguridad.

## Notas

- Todos los endpoints de configuración requieren autoridad de ADMIN
- El sistema utiliza coincidencia de prefijos con preferencia de coincidencia más larga para control jerárquico de endpoints
- La caché se actualiza automáticamente cuando las configuraciones se actualizan a través de la API
- El entorno de prueba usa `API_PREFIX` vacío mientras que producción usa el prefijo configurado
