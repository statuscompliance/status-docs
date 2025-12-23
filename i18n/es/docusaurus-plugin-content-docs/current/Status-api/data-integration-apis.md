# Integración de Datos

## Descripción General

Las APIs de Integración de Datos constan de tres componentes principales: **Databinder** para la gestión de fuentes de datos externas, **Linker** para coordinar múltiples fuentes de datos, **Gestión de ámbitos** para el control de acceso, y **Proxy de Grafana** para la integración de dashboards.

## Databinder

### Ruta Base

`/databinder`

### Gestión de Fuentes de Datos

| Método  | Endpoint              | Descripción                                      | Requiere Auth |
|---------|-----------------------|--------------------------------------------------|---------------|
| GET     | `/ds`                 | Listar fuentes de datos del usuario              | Sí            |
| GET     | `/ds/:id`             | Obtener fuente de datos específica                | Sí            |
| POST    | `/ds`                 | Crear nueva fuente de datos                      | Sí            |
| PATCH   | `/ds/:id`             | Actualizar fuente de datos                       | Sí            |
| DELETE  | `/ds/:id`             | Eliminar fuente de datos                        | Sí            |

### Operaciones de Fuentes de Datos

| Método  | Endpoint                    | Descripción                                     | Requiere Auth |
|---------|----------------------------|-------------------------------------------------|---------------|
| POST    | `/ds/:id/test`              | Probar conexión de fuente de datos             | Sí            |
| POST    | `/ds/:id/fetch`             | Obtener datos de la fuente de datos            | Sí            |
| GET     | `/ds/:id/methods`           | Listar métodos disponibles                      | Sí            |
| GET     | `/ds/:id/methods/:methodName`| Obtener detalles del método                     | Sí            |
| GET     | `/ds/:id/methods/all`       | Obtener detalles de todos los métodos           | Sí            |

### Definiciones de Fuentes de Datos

| Método  | Endpoint                 | Descripción                                       | Requiere Auth |
|---------|--------------------------|---------------------------------------------------|---------------|
| GET     | `/definitions/available`  | Listar tipos de fuentes de datos disponibles       | No            |

### Características Clave de Databinder

**Tipos de Fuentes de Datos Soportados:**
- `rest-api` - Integración genérica con API REST con varios métodos de autenticación (bearer, basic, cookie, headers personalizados)
- `microsoft-graph` - API de Microsoft Graph para integración con Office 365
- `owncloud` - Integración con almacenamiento de archivos OwnCloud

**Capacidades de Obtención de Datos:**
- Mapeo de propiedades para transformación de datos
- Soporte de paginación
- Múltiples formatos de respuesta (full, batch, iterator, stream)
- Filtrado y ordenamiento avanzado
- Sobrescritura de autenticación por solicitud

### Ejemplos de Creación de Fuentes de Datos

#### API REST con Autenticación Bearer

**POST** `/ds`

**Cuerpo de la Solicitud:**
```json
{
  "name": "API Externa con Autenticación",
  "definitionId": "rest-api",
  "config": {
    "baseUrl": "https://api.example.com",
    "defaultEndpoint": "/data",
    "auth": {
      "type": "bearer",
      "token": "your-api-token"
    },
    "timeout": 10000,
    "headers": {
      "Accept": "application/json",
      "User-Agent": "MyApp/1.0"
    }
  },
  "description": "API REST externa con autenticación",
  "environment": "production"
}
```

**Respuesta (200 OK):**
```json
{
  "message": "Datasource created successfully",
  "instanceId": "123_external_api_1634567890123",
  "availableMethods": ["getAll", "getById", "create", "update", "delete", "default"],
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "API Externa con Autenticación",
  "definitionId": "rest-api",
  "config": {
    "baseUrl": "https://api.example.com",
    "defaultEndpoint": "/data"
  }
}
```

#### API de Microsoft Graph

**POST** `/ds`

**Cuerpo de la Solicitud:**
```json
{
  "name": "Directorio de la Empresa",
  "definitionId": "microsoft-graph",
  "config": {
    "tenantId": "12345678-1234-1234-1234-123456789012",
    "clientId": "87654321-4321-4321-4321-210987654321",
    "clientSecret": "your-client-secret",
    "scopes": ["https://graph.microsoft.com/.default"]
  },
  "description": "Microsoft Graph para acceso al directorio de usuarios",
  "environment": "production"
}
```

### Ejemplos de Obtención de Datos

#### Obtención Básica de Datos

**POST** `/ds/:id/fetch`

**Cuerpo de la Solicitud:**
```json
{
  "methodName": "default",
  "options": {
    "method": "GET"
  }
}
```

#### Datos Paginados con Filtrado

**POST** `/ds/:id/fetch`

**Cuerpo de la Solicitud:**
```json
{
  "methodName": "getAll",
  "options": {
    "responseFormat": "full",
    "pagination": {
      "enabled": true,
      "pageSize": 20,
      "startPage": 1
    },
    "query": {
      "filters": {
        "category": "technology",
        "status": "published",
        "price_gte": 50
      },
      "sort": [
        {
          "field": "createdAt",
          "direction": "desc"
        },
        {
          "field": "title",
          "direction": "asc"
        }
      ]
    }
  }
}
```

#### Obtención con Mapeo de Propiedades

**POST** `/ds/:id/fetch`

**Cuerpo de la Solicitud:**
```json
{
  "methodName": "getUsers",
  "propertyMapping": {
    "title": "name",
    "created_at": "createdTimestamp",
    "updated_at": "modifiedTimestamp",
    "user_id": "userId",
    "is_active": "isActive"
  },
  "options": {
    "method": "GET"
  }
}
```

**Respuesta (200 OK):**
```json
{
  "message": "Data fetched successfully",
  "datasourceId": "123e4567-e89b-12d3-a456-426614174000",
  "datasourceName": "User API",
  "methodUsed": "getUsers",
  "result": [
    {
      "id": 1,
      "name": "Nombre del Perfil de Usuario",
      "createdTimestamp": "2023-01-15T10:30:00Z",
      "modifiedTimestamp": "2023-10-15T14:20:00Z",
      "userId": 42,
      "isActive": true
    }
  ],
  "callInfo": {
    "executionId": "exec_123_1634567890123_xyz789",
    "executionDuration": "182ms",
    "httpCallDetails": {
      "httpMethod": "GET",
      "fullUrl": "https://api.example.com/users",
      "baseUrl": "https://api.example.com",
      "endpoint": "/users"
    }
  },
  "metadata": {
    "propertyMapping": {
      "applied": true,
      "mappingRules": {
        "title": "name",
        "created_at": "createdTimestamp",
        "updated_at": "modifiedTimestamp",
        "user_id": "userId",
        "is_active": "isActive"
      }
    }
  }
}
```

## Linker

### Ruta Base

`/databinder/linker`

### Gestión de Linkers

| Método  | Endpoint   | Descripción                                | Requiere Auth |
|---------|------------|--------------------------------------------|---------------|
| GET     | `/`        | Listar linkers del usuario                 | Sí            |
| GET     | `/:id`     | Obtener linker específico                  | Sí            |
| POST    | `/`        | Crear nuevo linker                         | Sí            |
| PATCH   | `/:id`     | Actualizar linker                          | Sí            |
| DELETE  | `/:id`     | Eliminar linker                            | Sí            |

### Operaciones de Linker

| Método  | Endpoint           | Descripción                                           | Requiere Auth |
|---------|--------------------|-------------------------------------------------------|---------------|
| POST    | `/:id/execute`     | Ejecutar linker (obtener de todas las fuentes de datos)| Sí            |
| GET     | `/:id/datasources` | Obtener fuentes de datos en el linker                 | Sí            |

### Características de Linker

**Estrategias de Fusión:**
- `concat` - Concatenar arrays de todas las fuentes de datos
- `merge` - Fusionar objetos de todas las fuentes de datos
- `override` - Usar solo el resultado de la última fuente de datos
- `indexed` - Devolver objeto indexado por ID de fuente de datos

**Selección de Método en Tiempo de Ejecución:** Sobrescribir métodos configurados en tiempo de ejecución usando `options.methodName`.

### Ejemplo de Creación de Linker

**POST** `/`

**Cuerpo de la Solicitud:**
```json
{
  "name": "Agregador de Datos Mejorado",
  "defaultMethodName": "getAll",
  "datasourceIds": [
    "123e4567-e89b-12d3-a456-426614174000",
    "987fcdeb-51a2-43d7-b789-123456789abc"
  ],
  "datasourceConfigs": {
    "123e4567-e89b-12d3-a456-426614174000": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "methodConfig": {
        "methodName": "getAll",
        "options": {
          "limit": 100
        }
      },
      "propertyMapping": {
        "userId": "id",
        "userName": "name"
      }
    },
    "987fcdeb-51a2-43d7-b789-123456789abc": {
      "id": "987fcdeb-51a2-43d7-b789-123456789abc",
      "methodConfig": {
        "methodName": "listRecursive",
        "options": {
          "path": "/",
          "maxDepth": 5
        }
      },
      "propertyMapping": {
        "userEmail": "email"
      }
    }
  },
  "description": "Agregador avanzado con mapeos de propiedades",
  "environment": "production"
}
```

**Respuesta (200 OK):**
```json
{
  "message": "Linker created successfully",
  "datasourceCount": 2,
  "id": "456e7890-f23c-45d6-b789-123456789def",
  "name": "Agregador de Datos Mejorado",
  "defaultMethodName": "getAll",
  "datasourceIds": [
    "123e4567-e89b-12d3-a456-426614174000",
    "987fcdeb-51a2-43d7-b789-123456789abc"
  ]
}
```

### Ejemplo de Ejecución de Linker

**POST** `/:id/execute`

**Cuerpo de la Solicitud:**
```json
{
  "options": {
    "methodName": "listFiles",
    "path": "/documents"
  },
  "mergeStrategy": "indexed"
}
```

**Respuesta (200 OK):**
```json
{
  "message": "Linker executed successfully",
  "linkerId": "456e7890-f23c-45d6-b789-123456789def",
  "linkerName": "Agregador de Datos Mejorado",
  "executionStatus": "success",
  "mergeStrategy": "indexed",
  "mergedData": {
    "123e4567-e89b-12d3-a456-426614174000": [
      {
        "id": 1,
        "name": "Documento 1"
      }
    ],
    "987fcdeb-51a2-43d7-b789-123456789abc": [
      {
        "id": 2,
        "email": "user@example.com"
      }
    ]
  },
  "executionMetadata": {
    "linkerId": "456e7890-f23c-45d6-b789-123456789def",
    "executionId": "exec_456_1634567950456_def123",
    "datasourceCount": 2,
    "executionDuration": 245,
    "successfulDatasources": 2,
    "failedDatasources": 0
  },
  "executionSummary": {
    "totalDatasources": 2,
    "successful": 2,
    "failed": 0
  }
}
```

## Gestión de Ámbitos

### Ruta Base

`/scopes`

Los endpoints de gestión de ámbitos proporcionan capacidades de control de acceso y organización de datos.

## Proxy de Grafana

### Ruta Base

`/grafana`

Los endpoints de proxy de Grafana permiten la integración de dashboards y el proxy de visualización.

## Autenticación

Todos los endpoints (excepto `/definitions/available`) requieren autenticación mediante tokens JWT:

```
Authorization: Bearer <jwt-token>
```

Los usuarios solo pueden acceder a las fuentes de datos y linkers que poseen, aplicado mediante verificaciones de propiedad. Algunos endpoints pueden requerir roles de DEVELOPER o ADMIN.

## Notas

- El sistema Databinder proporciona telemetría y registro completo para todas las operaciones
- El mapeo de propiedades permite la transformación de estructuras de datos externas para que coincidan con los requisitos internos
- Todas las configuraciones de fuentes de datos soportan etiquetado de entorno (production, staging, dev)
- El sistema incluye validación incorporada para configuraciones de fuentes de datos y parámetros de métodos
- Las respuestas de error incluyen información detallada sobre los métodos disponibles cuando se solicitan métodos inválidos
- El campo `datasourceConfigs` es obligatorio al crear linkers y debe incluir `methodConfig.methodName` para cada fuente de datos
- La selección de método en tiempo de ejecución permite sobrescribir métodos configurados durante la ejecución
