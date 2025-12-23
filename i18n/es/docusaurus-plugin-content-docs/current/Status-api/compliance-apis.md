# Dominio de Cumplimiento

Endpoints RESTful para gestionar catálogos, controles, cálculos y puntos en la jerarquía de cumplimiento.

## Descripción General

Las APIs del Dominio de Cumplimiento proporcionan endpoints integrales para gestionar todos los aspectos de la jerarquía de cumplimiento, desde catálogos hasta puntos de garantía. Estas APIs están organizadas en cuatro dominios principales: Catálogos, Controles, Cálculos y Puntos.

## Catálogos

### Resumen de Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/catalogs/drafts` | Crea un nuevo catálogo en borrador |
| PATCH | `/catalogs/:id/finalize` | Finaliza un catálogo en borrador |
| GET | `/catalogs` | Recupera todos los catálogos de cumplimiento |
| GET | `/catalogs/:id` | Recupera un catálogo específico por ID |
| POST | `/catalogs` | Crea un nuevo catálogo de cumplimiento |
| PATCH | `/catalogs/:id` | Actualiza un catálogo existente |
| DELETE | `/catalogs/:id` | Elimina un catálogo |
| GET | `/catalogs/:catalogId/controls` | Recupera todos los controles de un catálogo específico |
| POST | `/catalogs/:tpaId/points` | Calcula puntos de garantía para un cálculo |

### Operaciones en Borrador

#### Crear Catálogo en Borrador

**POST** `/catalogs/drafts`

Crea un nuevo catálogo en borrador. Los catálogos en borrador se pueden modificar libremente antes de finalizar.

**Cuerpo de la Solicitud:**
```json
{
  "name": "Nuevo Catálogo en Borrador",
  "description": "Descripción del catálogo"
}
```

**Respuesta (201 Creado):**
```json
{
  "id": "catalog-id",
  "name": "Nuevo Catálogo en Borrador",
  "description": "Descripción del catálogo",
  "status": "draft",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Finalizar Catálogo

**PATCH** `/catalogs/:id/finalize`

Finaliza un catálogo en borrador. Una vez finalizado, el catálogo tiene modificaciones restringidas.

**Respuesta (200 OK):**
```json
{
  "id": "catalog-id",
  "name": "Catálogo Finalizado",
  "status": "finalized",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Operaciones Estándar

#### Listar Catálogos

**GET** `/catalogs`

#### Obtener Catálogo

**GET** `/catalogs/:id`

Recupera un catálogo específico por ID.

**Respuesta (200 OK):**
```json
{
  "id": "catalog-id",
  "name": "Nombre del Catálogo",
  "description": "Descripción del catálogo",
  "status": "finalized",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Crear Catálogo

**POST** `/catalogs`

Crea un nuevo catálogo de cumplimiento.

**Cuerpo de la Solicitud:**
```json
{
  "name": "Nuevo Catálogo",
  "description": "Descripción del catálogo"
}
```

**Respuesta (201 Creado)**

#### Actualizar Catálogo

**PATCH** `/catalogs/:id`

Actualiza un catálogo existente.

**Cuerpo de la Solicitud:**
```json
{
  "name": "Nombre de Catálogo Actualizado",
  "description": "Descripción actualizada"
}
```

**Respuesta (200 OK)**

#### Eliminar Catálogo

**DELETE** `/catalogs/:id`

Elimina un catálogo.

**Respuesta (200 OK)**

### Controles

#### Obtener Controles del Catálogo

**GET** `/catalogs/:catalogId/controls`

Recupera todos los controles de un catálogo específico.

**Parámetros de Consulta:**
- `status` (opcional): Filtrar controles por estado (`finalized` o `draft`). Si se omite, devuelve todos los controles.

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Nombre del Control",
    "description": "Descripción del control",
    "catalogId": "catalog-id",
    "status": "finalized",
    "type": "automated"
  }
]
```

### Cálculo de Puntos

#### Calcular Puntos

**POST** `/catalogs/:tpaId/points`

Calcula y recupera puntos de garantía para un cálculo mediante el ID de Acuerdo de Bluejay (tpaId). Este endpoint se integra con el Servicio de Registro externo para obtener estados de garantía.

**Parámetros de Consulta:**
- `from` (opcional): Fecha de inicio para el cálculo de puntos (formato ISO 8601)
- `to` (opcional): Fecha de fin para el cálculo de puntos (formato ISO 8601)
- `environment` (opcional): Nombre del entorno (predeterminado: `production`)

**Cuerpo de la Solicitud:**
```json
{
  "controlIds": ["control-id-1", "control-id-2"]
}
```

O:
```json
{
  "controlIds": "control-id-1,control-id-2"
}
```

**Respuesta (200 OK):**
```json
{
  "storedPoints": [
    {
      "id": "point-id",
      "computationId": "computation-id",
      "value": 95.5,
      "timestamp": "2024-01-01T00:00:00Z",
      "agreementId": "tpa-xxx"
    }
  ],
  "updatedCount": 2
}
```

## Controles

### Resumen de Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/controls/drafts` | Crea un nuevo control en borrador |
| PATCH | `/controls/:id/finalize` | Finaliza un control en borrador |
| GET | `/controls` | Recupera todos los controles |
| GET | `/controls/pending` | Recupera todos los controles pendientes |
| GET | `/controls/:id` | Recupera un control específico por ID |
| POST | `/controls` | Crea un nuevo control |
| PATCH | `/controls/:id` | Actualiza un control existente |
| DELETE | `/controls/:id` | Elimina un control |
| GET | `/controls/:id/panels` | Recupera todos los paneles asociados a un control |
| POST | `/controls/:id/panel/:panelId` | Agrega un panel a un control |
| DELETE | `/controls/:id/panels/:panelId` | Elimina un panel de un control |

### Operaciones en Borrador

#### Crear Control en Borrador

**POST** `/controls/drafts`

Crea un nuevo control en borrador. Los controles en borrador se pueden modificar libremente antes de finalizar.

**Cuerpo de la Solicitud:**
```json
{
  "name": "Control en Borrador",
  "description": "Descripción del control",
  "catalogId": "catalog-id",
  "type": "automated",
  "criteria": {}
}
```

**Respuesta (201 Creado)**

#### Finalizar Control

**PATCH** `/controls/:id/finalize`

Finaliza un control en borrador. Una vez finalizado, el control tiene modificaciones restringidas.

**Respuesta (200 OK)**

### Operaciones Estándar

#### Listar Controles

**GET** `/controls`

Recupera todos los controles.

**Parámetros de Consulta:**
- `status` (opcional): Filtrar controles por estado (`finalized` o `draft`). Si se omite, devuelve todos los controles.

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Nombre del Control",
    "description": "Descripción del control",
    "catalogId": "catalog-id",
    "status": "finalized",
    "type": "automated"
  }
]
```

#### Obtener Controles Pendientes

**GET** `/controls/pending`

Recupera todos los controles pendientes.

**Parámetros de Consulta:**
- `status` (opcional): Filtrar controles por estado (`finalized` o `draft`).

**Respuesta (200 OK)**

#### Obtener Control

**GET** `/controls/:id`

Recupera un control específico por ID.

**Respuesta (200 OK)**

#### Crear Control

**POST** `/controls`

Crea un nuevo control.

**Cuerpo de la Solicitud:**
```json
{
  "name": "Nombre del Control",
  "description": "Descripción del control",
  "catalogId": "catalog-id",
  "type": "automated",
  "criteria": {}
}
```

**Respuesta (201 Creado)**

#### Actualizar Control

**PATCH** `/controls/:id`

Actualiza un control existente.

**Cuerpo de la Solicitud:**
```json
{
  "name": "Nombre de Control Actualizado",
  "description": "Descripción actualizada"
}
```

**Respuesta (200 OK)**

#### Eliminar Control

**DELETE** `/controls/:id`

Elimina un control.

**Respuesta (200 OK)**

### Gestión de Paneles

#### Obtener Paneles de Control

**GET** `/controls/:id/panels`

Recupera todos los paneles asociados a un control.

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "controlId": 1,
    "name": "Nombre del Panel"
  }
]
```

#### Agregar Panel al Control

**POST** `/controls/:id/panel/:panelId`

Agrega un panel a un control.

**Respuesta (200 OK)**

#### Eliminar Panel del Control

**DELETE** `/controls/:id/panels/:panelId`

Elimina un panel de un control.

**Respuesta (200 OK)**

## Cálculos

### Resumen de Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/computations/:id` | Recupera un cálculo por grupo de cálculo (UUID) |
| POST | `/computations/bulk` | Crea múltiples cálculos a la vez |
| DELETE | `/computations` | Elimina todos los cálculos |
| GET | `/controls/:controlId/computations` | Recupera todos los cálculos para un control específico |
| GET | `/controls/:controlId/computations/:createdAt` | Recupera cálculos para un control filtrados por fecha |
| PUT | `/controls/:controlId/computations` | Establece el intervalo de cálculo para un cálculo |
| DELETE | `/controls/:controlId/computations` | Elimina todos los cálculos de un control específico |

### Operaciones Estándar

#### Obtener Cálculo

**GET** `/computations/:id`

Recupera un cálculo por grupo de cálculo (UUID). Soporta ejecución asíncrona con verificación de disponibilidad.

**Respuesta (200 OK):**
```json
{
  "id": "computation-uuid",
  "name": "Nombre del Cálculo",
  "formula": "fórmula de cálculo",
  "computationGroup": "uuid"
}
```

**Respuesta (202 Aceptado):**
```json
{
  "message": "Computation not ready yet"
}
```

#### Crear Cálculos en Lote

**POST** `/computations/bulk`

Crea múltiples cálculos a la vez.

**Cuerpo de la Solicitud:**
```json
{
  "computations": [
    {
      "name": "Cálculo 1",
      "formula": "fórmula 1"
    },
    {
      "name": "Cálculo 2",
      "formula": "fórmula 2"
    }
  ],
  "done": true
}
```

**Respuesta (201 Creado)**

#### Eliminar Todos los Cálculos

**DELETE** `/computations`

Elimina todos los cálculos.

**Respuesta (204 Sin Contenido)**

### Específicos de Control

#### Obtener Cálculos por Control

**GET** `/controls/:controlId/computations`

Recupera todos los cálculos para un control específico.

**Respuesta (200 OK):**
```json
[
  {
    "id": "computation-id",
    "controlId": 1,
    "name": "Nombre del Cálculo",
    "formula": "fórmula de cálculo"
  }
]
```

#### Obtener Cálculos por Control y Fecha

**GET** `/controls/:controlId/computations/:createdAt`

Recupera cálculos para un control filtrados por fecha de creación.

**Respuesta (200 OK)**

#### Actualizar Intervalo de Cálculo

**PUT** `/controls/:controlId/computations`

Establece el intervalo de cálculo para un cálculo por ID de control y fecha de creación.

**Cuerpo de la Solicitud:**
```json
{
  "interval": "*/5 * * * *"
}
```

**Respuesta (204 Sin Contenido)**

#### Eliminar Cálculos por Control

**DELETE** `/controls/:controlId/computations`

Elimina todos los cálculos de un control específico.

**Respuesta (204 Sin Contenido)**

## Puntos

### Resumen de Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/points/:id` | Recupera un punto por grupo de cálculo (UUID) |
| DELETE | `/points/:id` | Elimina un punto |
| GET | `/points/catalog/:tpaId` | Recupera puntos por ID de Acuerdo de Bluejay |
| PUT | `/points/computationGroup/:computationGroup` | Actualiza puntos por ID de grupo de cálculo |

### Operaciones Estándar

#### Obtener Punto

**GET** `/points/:id`

Recupera un punto por grupo de cálculo (UUID).

**Respuesta (200 OK):**
```json
{
  "id": "point-id",
  "computationId": "computation-id",
  "value": 95.5,
  "timestamp": "2024-01-01T00:00:00Z",
  "metadata": {}
}
```

#### Eliminar Punto

**DELETE** `/points/:id`

Elimina un punto.

**Respuesta (204 Sin Contenido)**

### Específicos de Catálogo

#### Obtener Puntos por ID TPA

**GET** `/points/catalog/:tpaId`

Recupera puntos por ID de Acuerdo de Bluejay (tpaId).

**Respuesta (200 OK):**
```json
[
  {
    "id": "point-id",
    "computationId": "computation-id",
    "value": 95.5,
    "timestamp": "2024-01-01T00:00:00Z",
    "agreementId": "tpa-xxx"
  }
]
```

### Grupo de Cálculo

#### Actualizar Puntos por Grupo de Cálculo

**PUT** `/points/computationGroup/:computationGroup`

Actualiza puntos por ID de grupo de cálculo (UUID).

**Cuerpo de la Solicitud:**
```json
{
  "guaranteeValue": 95.5,
  "guaranteeResult": true,
  "metrics": {},
  "scope": {}
}
```

**Respuesta (200 OK):**
```json
{
  "message": "Points updated successfully",
  "points": [
    {
      "id": "point-id",
      "computationId": "computation-id",
      "value": 95.5
    }
  ]
}
```

## Autenticación

Todos los endpoints requieren autenticación JWT mediante token Bearer en el encabezado de autorización:

```
Authorization: Bearer <jwt-token>
```

## Notas

- Todos los endpoints tienen como prefijo el API_PREFIX configurado en el entorno
- Las entidades en borrador se pueden modificar libremente, mientras que las entidades finalizadas tienen modificaciones restringidas
- El endpoint `calculatePoints` se integra con el Servicio de Registro externo para obtener estados de garantía
- Los cálculos soportan ejecución asíncrona con verificación de disponibilidad mediante el UUID del grupo de cálculo
