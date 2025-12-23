# Compliance Domain

RESTful endpoints for managing catalogs, controls, computations, and points in the compliance hierarchy.

## Overview

The Compliance Domain APIs provide comprehensive endpoints for managing all aspects of the compliance hierarchy, from catalogs to guarantee points. These APIs are organized under four main domains: Catalogs, Controls, Computations, and Points.

## Catalogs

### Base Path

`/api/catalogs`

### Draft Operations

#### Create Draft Catalog

**POST** `/api/catalogs/drafts`

Create a new draft catalog. Draft catalogs can be modified freely before finalization.

**Request Body:**
```json
{
  "name": "New Draft Catalog",
  "description": "Catalog description"
}
```

**Response (201 Created):**
```json
{
  "id": "catalog-id",
  "name": "New Draft Catalog",
  "description": "Catalog description",
  "status": "draft",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Finalize Catalog

**PATCH** `/api/catalogs/:id/finalize`

Finalize a draft catalog. Once finalized, the catalog has restricted modifications.

**Response (200 OK):**
```json
{
  "id": "catalog-id",
  "name": "Finalized Catalog",
  "status": "finalized",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Standard Operations

#### List Catalogs

**GET** `/api/catalogs`

Retrieve all compliance catalogs.

**Query Parameters:**
- `status` (optional): Filter by status (`finalized` or `draft`). If omitted, returns all catalogs.

**Response (200 OK):**
```json
[
  {
    "id": "catalog-id",
    "name": "Catalog Name",
    "description": "Catalog description",
    "status": "finalized",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Get Catalog

**GET** `/api/catalogs/:id`

Retrieve a specific catalog by ID.

**Response (200 OK):**
```json
{
  "id": "catalog-id",
  "name": "Catalog Name",
  "description": "Catalog description",
  "status": "finalized",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Create Catalog

**POST** `/api/catalogs`

Create a new compliance catalog.

**Request Body:**
```json
{
  "name": "New Catalog",
  "description": "Catalog description"
}
```

**Response (201 Created)**

#### Update Catalog

**PATCH** `/api/catalogs/:id`

Update an existing catalog.

**Request Body:**
```json
{
  "name": "Updated Catalog Name",
  "description": "Updated description"
}
```

**Response (200 OK)**

#### Delete Catalog

**DELETE** `/api/catalogs/:id`

Delete a catalog.

**Response (200 OK)**

### Controls

#### Get Catalog Controls

**GET** `/api/catalogs/:catalogId/controls`

Retrieve all controls for a specific catalog.

**Query Parameters:**
- `status` (optional): Filter controls by status (`finalized` or `draft`). If omitted, returns all controls.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Control Name",
    "description": "Control description",
    "catalogId": "catalog-id",
    "status": "finalized",
    "type": "automated"
  }
]
```

### Points Calculation

#### Calculate Points

**POST** `/api/catalogs/:tpaId/points`

Calculate and retrieve guarantee points for a computation by Bluejay Agreement ID (tpaId). This endpoint integrates with the external Registry Service to fetch guarantee states.

**Query Parameters:**
- `from` (optional): Start date for points calculation (ISO 8601 format)
- `to` (optional): End date for points calculation (ISO 8601 format)
- `environment` (optional): Environment name (default: `production`)

**Request Body:**
```json
{
  "controlIds": ["control-id-1", "control-id-2"]
}
```

Or:
```json
{
  "controlIds": "control-id-1,control-id-2"
}
```

**Response (200 OK):**
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

## Controls

### Base Path

`/api/controls`

### Draft Operations

**POST** `/api/controls/drafts`

Create a new draft control. Draft controls can be modified freely before finalization.

**Request Body:**
```json
{
  "name": "Draft Control",
  "description": "Control description",
  "catalogId": "catalog-id",
  "type": "automated",
  "criteria": {}
}
```

**Response (201 Created)**

#### Finalize Control

**PATCH** `/api/controls/:id/finalize`

Finalize a draft control. Once finalized, the control has restricted modifications.

**Response (200 OK)**

### Standard Operations

#### List Controls

**GET** `/api/controls`

Retrieve all controls.

**Query Parameters:**
- `status` (optional): Filter controls by status (`finalized` or `draft`). If omitted, returns all controls.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Control Name",
    "description": "Control description",
    "catalogId": "catalog-id",
    "status": "finalized",
    "type": "automated"
  }
]
```

#### Get Pending Controls

**GET** `/api/controls/pending`

Retrieve all pending controls.

**Query Parameters:**
- `status` (optional): Filter controls by status (`finalized` or `draft`).

**Response (200 OK)**

#### Get Control

**GET** `/api/controls/:id`

Retrieve a specific control by ID.

**Response (200 OK)**

#### Create Control

**POST** `/api/controls`

Create a new control.

**Request Body:**
```json
{
  "name": "Control Name",
  "description": "Control description",
  "catalogId": "catalog-id",
  "type": "automated",
  "criteria": {}
}
```

**Response (201 Created)**

#### Update Control

**PATCH** `/api/controls/:id`

Update an existing control.

**Request Body:**
```json
{
  "name": "Updated Control Name",
  "description": "Updated description"
}
```

**Response (200 OK)**

#### Delete Control

**DELETE** `/api/controls/:id`

Delete a control.

**Response (200 OK)**

### Panel Management

#### Get Control Panels

**GET** `/api/controls/:id/panels`

Retrieve all panels associated with a control.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "controlId": 1,
    "name": "Panel Name"
  }
]
```

#### Add Panel to Control

**POST** `/api/controls/:id/panel/:panelId`

Add a panel to a control.

**Response (200 OK)**

#### Delete Panel from Control

**DELETE** `/api/controls/:id/panels/:panelId`

Remove a panel from a control.

**Response (200 OK)**

## Computations

### Base Path

`/api/computations`

### Standard Operations

#### Get Computation

**GET** `/api/computations/:id`

Retrieve a computation by computationGroup (UUID). Supports asynchronous execution with readiness checking.

**Response (200 OK):**
```json
{
  "id": "computation-uuid",
  "name": "Computation Name",
  "formula": "calculation formula",
  "computationGroup": "uuid"
}
```

**Response (202 Accepted):**
```json
{
  "message": "Computation not ready yet"
}
```

#### Create Bulk Computations

**POST** `/api/computations/bulk`

Create multiple computations at once.

**Request Body:**
```json
{
  "computations": [
    {
      "name": "Computation 1",
      "formula": "formula 1"
    },
    {
      "name": "Computation 2",
      "formula": "formula 2"
    }
  ],
  "done": true
}
```

**Response (201 Created)**

#### Delete All Computations

**DELETE** `/api/computations`

Delete all computations.

**Response (204 No Content)**

### Control-Specific

#### Get Computations by Control

**GET** `/api/controls/:controlId/computations`

Retrieve all computations for a specific control.

**Response (200 OK):**
```json
[
  {
    "id": "computation-id",
    "controlId": 1,
    "name": "Computation Name",
    "formula": "calculation formula"
  }
]
```

#### Get Computations by Control and Date

**GET** `/api/controls/:controlId/computations/:createdAt`

Retrieve computations for a control filtered by creation date.

**Response (200 OK)**

#### Update Computation Interval

**PUT** `/api/controls/:controlId/computations`

Set compute interval for a computation by control ID and creation date.

**Request Body:**
```json
{
  "interval": "*/5 * * * *"
}
```

**Response (204 No Content)**

#### Delete Computations by Control

**DELETE** `/api/controls/:controlId/computations`

Delete all computations for a specific control.

**Response (204 No Content)**

## Points

### Base Path

`/api/points`

### Standard Operations

#### Get Point

**GET** `/api/points/:id`

Retrieve a point by computationGroup (UUID).

**Response (200 OK):**
```json
{
  "id": "point-id",
  "computationId": "computation-id",
  "value": 95.5,
  "timestamp": "2024-01-01T00:00:00Z",
  "metadata": {}
}
```

#### Delete Point

**DELETE** `/api/points/:id`

Delete a point.

**Response (204 No Content)**

### Catalog-Specific

#### Get Points by TPA ID

**GET** `/api/points/catalog/:tpaId`

Retrieve points by Bluejay Agreement ID (tpaId).

**Response (200 OK):**
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

### Computation Group

#### Update Points by Computation Group

**PUT** `/api/points/computationGroup/:computationGroup`

Update points by computation group ID (UUID).

**Request Body:**
```json
{
  "guaranteeValue": 95.5,
  "guaranteeResult": true,
  "metrics": {},
  "scope": {}
}
```

**Response (200 OK):**
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

## Authentication

All endpoints require JWT authentication via Bearer token in the Authorization header:

```
Authorization: Bearer <jwt-token>
```

## Notes

- All endpoints are prefixed with the API_PREFIX configured in the environment
- Draft entities can be modified freely, while finalized entities have restricted modifications
- The `calculatePoints` endpoint integrates with the external Registry Service to fetch guarantee states
- Computations support asynchronous execution with readiness checking via the computationGroup UUID
