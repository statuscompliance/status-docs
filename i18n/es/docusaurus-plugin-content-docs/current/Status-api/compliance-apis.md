# Dominio de Cumplimiento

Endpoints RESTful para gestionar catálogos, controles, cálculos y puntos en la jerarquía de cumplimiento.

## Descripción General

Las APIs del Dominio de Cumplimiento proporcionan endpoints integrales para gestionar todos los aspectos de la jerarquía de cumplimiento, desde catálogos hasta puntos de garantía. Estas APIs están organizadas en cuatro dominios principales: Catálogos, Controles, Cálculos y Puntos.

## Catálogos

### Ruta Base

`/api/catalogs`

### Operaciones en Borrador

#### Crear Catálogo en Borrador

**POST** `/api/catalogs/drafts`

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

**PATCH** `/api/catalogs/:id/finalize`

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

**GET** `/api/catalogs`

Recupera todos los catálogos de cumplimiento.

**Parámetros de Consulta:**
- `status` (opcional): Filtrar por estado (`finalized` o `draft`). Si se omite, devuelve todos los catálogos.

**Respuesta (200 OK):**
```json
[
  {
    "id": "catalog-id",
    "name": "Nombre del Catálogo",
    "description": "Descripción del catálogo",
    "status": "finalized",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Obtener Catálogo

**GET** `/api/catalogs/:id`

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

**POST** `/api/catalogs`

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

**PATCH** `/api/catalogs/:id`

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

**DELETE** `/api/catalogs/:id`

Elimina un catálogo.

**Respuesta (200 OK)**

### Controles

#### Obtener Controles del Catálogo

**GET** `/api/catalogs/:catalogId/controls`

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

**POST** `/api/catalogs/:tpaId/points`

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

### Ruta Base

`/api/controls`

### Operaciones en Borrador

#### Crear Control en Borrador

**POST** `/api/controls/drafts`

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

**PATCH** `/api/controls/:id/finalize`

Finaliza un control en borrador. Una vez finalizado, el control tiene modificaciones restringidas.

**Respuesta (200 OK)**

### Operaciones Estándar

#### Listar Controles

**GET** `/api/controls`

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

**GET** `/api/controls/pending`

Recupera todos los controles pendientes.

**Parámetros de Consulta:**
- `status` (opcional): Filtrar controles por estado (`finalized` o `draft`).

**Respuesta (200 OK)**

#### Obtener Control

**GET** `/api/controls/:id`

Recupera un control específico por ID.

**Respuesta (200 OK)**

#### Crear Control

**POST** `/api/controls`

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

**PATCH** `/api/controls/:id`

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

**DELETE** `/api/controls/:id`

Elimina un control.

**Respuesta (200 OK)**

### Gestión de Paneles

#### Obtener Paneles de Control

**GET** `/api/controls/:id/panels`

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

**POST** `/api/controls/:id/panel/:panelId`

Agrega un panel a un control.

**Respuesta (200 OK)**

#### Eliminar Panel del Control

**DELETE** `/api/controls/:id/panels/:panelId`

Elimina un panel de un control.

**Respuesta (200 OK)**

## Cálculos

### Ruta Base

`/api/computations`

### Operaciones Estándar

#### Obtener Cálculo

**GET** `/api/computations/:id`

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

**POST** `/api/computations/bulk`

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

**DELETE** `/api/computations`

Elimina todos los cálculos.

**Respuesta (204 Sin Contenido)**

### Específicos de Control

#### Obtener Cálculos por Control

**GET** `/api/controls/:controlId/computations`

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

**GET** `/api/controls/:controlId/computations/:createdAt`

Recupera cálculos para un control filtrados por fecha de creación.

**Respuesta (200 OK)**

#### Actualizar Intervalo de Cálculo

**PUT** `/api/controls/:controlId/computations`

Establece el intervalo de cálculo para un cálculo por ID de control y fecha de creación.

**Cuerpo de la Solicitud:**
```json
{
  "interval": "*/5 * * * *"
}
```

**Respuesta (204 Sin Contenido)**

#### Eliminar Cálculos por Control

**DELETE** `/api/controls/:controlId/computations`

Elimina todos los cálculos de un control específico.

**Respuesta (204 Sin Contenido)**

## Puntos

### Ruta Base

`/api/points`

### Operaciones Estándar

#### Obtener Punto

**GET** `/api/points/:id`

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

**DELETE** `/api/points/:id`

Elimina un punto.

**Respuesta (204 Sin Contenido)**

### Específicos de Catálogo

#### Obtener Puntos por ID TPA

**GET** `/api/points/catalog/:tpaId`

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

**PUT** `/api/points/computationGroup/:computationGroup`

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
