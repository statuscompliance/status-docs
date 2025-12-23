# Configuración del Sistema

Endpoints exclusivos para administradores para gestionar la disponibilidad de endpoints, configuración de servicios y límites del sistema.

## Descripción General

Las APIs de Configuración del Sistema proporcionan control administrativo sobre la disponibilidad de endpoints, configuraciones de servicios y límites de recursos. Estos endpoints están restringidos a usuarios con rol de ADMIN y están montados bajo `/api/v1/config` (configurable mediante la variable de entorno `API_PREFIX`).

## Configuración Base

### Resumen de Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/config` | Recupera todas las configuraciones de endpoints del sistema |
| POST | `/config` | Recupera una configuración de endpoint específica por ruta de endpoint |
| PUT | `/config` | Actualiza el estado de disponibilidad de una configuración de endpoint |

### Obtener Todas las Configuraciones

**GET** `/config`

Recupera todas las configuraciones de endpoints del sistema.

**Autenticación:** Solo administradores (token Bearer requerido)

**Ejemplo de Uso:**
```bash
curl -X GET http://localhost:3000/api/v1/config \
  -H "Authorization: Bearer <token_acceso_admin>"
```

#### ✅ 200 OK - Configuraciones Obtenidas

- **Content-Type:** `application/json`
- **Descripción:** Todas las configuraciones de endpoints obtenidas exitosamente
- **Ejemplo:**

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

#### ❌ 401 No Autorizado

- **Content-Type:** `application/json`
- **Descripción:** No se proporcionó token
- **Ejemplo:**

  ```json
  {
    "message": "No se proporcionó token"
  }
  ```

#### ❌ 403 Prohibido

- **Content-Type:** `application/json`
- **Descripción:** El usuario no es administrador
- **Ejemplo:**

  ```json
  {
    "message": "El usuario no es administrador"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error de base de datos
- **Ejemplo:**

  ```json
  {
    "message": "Error de base de datos"
  }
  ```

### Obtener Configuración por Endpoint

**POST** `/config`

Recupera una configuración de endpoint específica por ruta de endpoint.

**Cuerpo de la Solicitud:**
```json
{
  "endpoint": "/users"
}
```

**Ejemplo de Uso:**
```bash
curl -X POST http://localhost:3000/api/v1/config \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_acceso_admin>" \
  -d '{
    "endpoint": "/users"
  }'
```

#### ✅ 200 OK - Configuración Obtenida

- **Content-Type:** `application/json`
- **Descripción:** Configuración obtenida exitosamente
- **Ejemplo:**

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

#### ❌ 401 No Autorizado

- **Content-Type:** `application/json`
- **Descripción:** No se proporcionó token
- **Ejemplo:**

  ```json
  {
    "message": "No se proporcionó token"
  }
  ```

#### ❌ 404 No Encontrado

- **Content-Type:** `application/json`
- **Descripción:** Configuración no encontrada
- **Ejemplo:**

  ```json
  {
    "message": "Configuración no encontrada"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error de base de datos
- **Ejemplo:**

  ```json
  {
    "message": "Error de base de datos"
  }
  ```

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

**Ejemplo de Uso:**
```bash
curl -X PUT http://localhost:3000/api/v1/config \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_acceso_admin>" \
  -d '{
    "endpoint": "/users",
    "available": false
  }'
```

#### ✅ 200 OK - Configuración Actualizada

- **Content-Type:** `application/json`
- **Descripción:** Configuración actualizada exitosamente
- **Ejemplo:**

  ```json
  {
    "message": "Configuración <id> actualizada exitosamente"
  }
  ```

**Nota:** Este endpoint actualiza automáticamente la caché de configuración en memoria después de actualizar.

#### ❌ 400 Solicitud Incorrecta - Falta Endpoint

- **Content-Type:** `application/json`
- **Descripción:** Falta el parámetro endpoint
- **Ejemplo:**

  ```json
  {
    "message": "El parámetro endpoint es requerido"
  }
  ```

#### ❌ 401 No Autorizado

- **Content-Type:** `application/json`
- **Descripción:** No se proporcionó token
- **Ejemplo:**

  ```json
  {
    "message": "No se proporcionó token"
  }
  ```

#### ❌ 404 No Encontrado

- **Content-Type:** `application/json`
- **Descripción:** Configuración no encontrada
- **Ejemplo:**

  ```json
  {
    "message": "Configuración no encontrada"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error de base de datos
- **Ejemplo:**

  ```json
  {
    "message": "Error de base de datos"
  }
  ```

## Límite de Asistente

### Resumen de Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/config/assistant/limit` | Recupera el límite actual de creación de asistentes |
| PUT | `/config/assistant/limit/:limit` | Actualiza el límite de creación de asistentes |

### Obtener Límite de Asistente

**GET** `/config/assistant/limit`

Recupera el límite actual de creación de asistentes.

**Ejemplo de Uso:**
```bash
curl -X GET http://localhost:3000/api/v1/config/assistant/limit \
  -H "Authorization: Bearer <token_acceso_admin>"
```

#### ✅ 200 OK - Límite de Asistente Obtenido

- **Content-Type:** `application/json`
- **Descripción:** Límite actual de asistentes obtenido exitosamente
- **Ejemplo:**

  ```json
  {
    "limit": 100
  }
  ```

#### ❌ 400 Solicitud Incorrecta - Límite No Establecido

- **Content-Type:** `application/json`
- **Descripción:** Límite no establecido en la configuración
- **Ejemplo:**

  ```json
  {
    "message": "Límite no establecido en la configuración"
  }
  ```

#### ❌ 404 No Encontrado

- **Content-Type:** `application/json`
- **Descripción:** Configuración de asistente no encontrada
- **Ejemplo:**

  ```json
  {
    "message": "Configuración de asistente no encontrada"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error de base de datos
- **Ejemplo:**

  ```json
  {
    "message": "Error al obtener límite de asistente"
  }
  ```

### Actualizar Límite de Asistente

**PUT** `/config/assistant/limit/:limit`

Actualiza el límite de creación de asistentes.

**Parámetros de Ruta:**
- `limit` (entero): El nuevo valor del límite (debe ser ≥ 1)

**Ejemplo de Uso:**
```bash
curl -X PUT http://localhost:3000/api/v1/config/assistant/limit/200 \
  -H "Authorization: Bearer <token_acceso_admin>"
```

#### ✅ 200 OK - Límite Actualizado

- **Content-Type:** `application/json`
- **Descripción:** Límite de asistente actualizado exitosamente
- **Ejemplo:**

  ```json
  {
    "message": "Límite actualizado exitosamente"
  }
  ```

**Reglas de Validación:**
- El límite debe ser un entero ≥ 1
- El límite no puede ser menor que el número actual de asistentes
- Actualiza automáticamente la caché después de actualizar

#### ❌ 400 Solicitud Incorrecta - Límite Inválido

- **Content-Type:** `application/json`
- **Descripción:** Valor de límite inválido o límite menor que los asistentes actuales
- **Ejemplo:**

  ```json
  {
    "message": "El límite debe ser al menos 1"
  }
  ```

#### ❌ 404 No Encontrado

- **Content-Type:** `application/json`
- **Descripción:** Configuración de asistente no encontrada
- **Ejemplo:**

  ```json
  {
    "message": "Configuración de asistente no encontrada"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error de base de datos
- **Ejemplo:**

  ```json
  {
    "message": "Error de base de datos"
  }
  ```

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
