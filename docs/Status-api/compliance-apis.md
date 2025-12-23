# Compliance Domain

RESTful endpoints for managing catalogs, controls, computations, and points in the compliance hierarchy.

## Overview

The Compliance Domain APIs provide comprehensive endpoints for managing all aspects of the compliance hierarchy, from catalogs to guarantee points. These APIs are organized under four main domains: Catalogs, Controls, Computations, and Points.

## Catalogs

### Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/catalogs/drafts` | Create a new draft catalog |
| PATCH | `/catalogs/:id/finalize` | Finalize a draft catalog |
| GET | `/catalogs` | Retrieve all compliance catalogs |
| GET | `/catalogs/:id` | Retrieve a specific catalog by ID |
| POST | `/catalogs` | Create a new compliance catalog |
| PATCH | `/catalogs/:id` | Update an existing catalog |
| DELETE | `/catalogs/:id` | Delete a catalog |
| GET | `/catalogs/:catalogId/controls` | Retrieve all controls for a specific catalog |
| POST | `/catalogs/:tpaId/points` | Calculate guarantee points for a computation |

### Draft Operations

#### Create Draft Catalog

**POST** `/catalogs/drafts`

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

**PATCH** `/catalogs/:id/finalize`

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

**GET** `/catalogs`

Retrieve all compliance catalogs.

**Usage Example:**
```bash
curl -X GET http://localhost:3000/api/v1/catalogs \
  -H "Authorization: Bearer <access_token>"
```

**Query Parameters:**
- `status` (optional): Filter by status (`finalized` or `draft`). If omitted, returns all catalogs.

#### ✅ 200 OK - Catalogs Retrieved

- **Content-Type:** `application/json`
- **Description:** List of all compliance catalogs
- **Example:**

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

#### ❌ 401 Unauthorized

- **Content-Type:** `application/json`
- **Description:** Unauthorized - Invalid or missing token
- **Example:**

  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Failed to retrieve catalogs
- **Example:**

  ```json
  {
    "message": "Failed to retrieve catalogs"
  }
  ```

#### Get Catalog

**GET** `/catalogs/:id`

Retrieve a specific catalog by ID.

**Usage Example:**
```bash
curl -X GET http://localhost:3000/api/v1/catalogs/catalog-id \
  -H "Authorization: Bearer <access_token>"
```

#### ✅ 200 OK - Catalog Retrieved

- **Content-Type:** `application/json`
- **Description:** Specific catalog details
- **Example:**

  ```json
  {
    "id": "catalog-id",
    "name": "Catalog Name",
    "description": "Catalog description",
    "status": "finalized",
    "createdAt": "2024-01-01T00:00:00Z"
  }
  ```

#### ❌ 404 Not Found

- **Content-Type:** `application/json`
- **Description:** Catalog not found
- **Example:**

  ```json
  {
    "message": "Catalog not found"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Failed to get catalog
- **Example:**

  ```json
  {
    "message": "Failed to retrieve catalog"
  }
  ```

#### Create Catalog

**POST** `/catalogs`

Create a new compliance catalog.

**Request Body:**
```json
{
  "name": "New Catalog",
  "description": "Catalog description"
}
```

**Usage Example:**
```bash
curl -X POST http://localhost:3000/api/v1/catalogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "name": "New Catalog",
    "description": "Catalog description"
  }'
```

#### ✅ 201 Created - Catalog Created Successfully

- **Content-Type:** `application/json`
- **Description:** Catalog created successfully
- **Example:**

  ```json
  {
    "id": "catalog-id",
    "name": "New Catalog",
    "description": "Catalog description",
    "status": "finalized",
    "createdAt": "2024-01-01T00:00:00Z"
  }
  ```

#### ❌ 400 Bad Request

- **Content-Type:** `application/json`
- **Description:** Invalid input data
- **Example:**

  ```json
  {
    "message": "Invalid catalog data"
  }
  ```

#### ❌ 401 Unauthorized

- **Content-Type:** `application/json`
- **Description:** Unauthorized
- **Example:**

  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Failed to create catalog
- **Example:**

  ```json
  {
    "message": "Failed to create catalog"
  }
  ```

#### Update Catalog

**PATCH** `/catalogs/:id`

Update an existing catalog.

**Request Body:**
```json
{
  "name": "Updated Catalog Name",
  "description": "Updated description"
}
```

**Usage Example:**
```bash
curl -X PATCH http://localhost:3000/api/v1/catalogs/catalog-id \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "name": "Updated Catalog Name",
    "description": "Updated description"
  }'
```

#### ✅ 200 OK - Catalog Updated Successfully

- **Content-Type:** `application/json`
- **Description:** Catalog updated successfully
- **Example:**

  ```json
  {
    "id": "catalog-id",
    "name": "Updated Catalog Name",
    "description": "Updated description",
    "status": "finalized",
    "createdAt": "2024-01-01T00:00:00Z"
  }
  ```

#### ❌ 400 Bad Request - Invalid Input

- **Content-Type:** `application/json`
- **Description:** Invalid input data
- **Example:**

  ```json
  {
    "message": "Invalid catalog data"
  }
  ```

#### ❌ 401 Unauthorized

- **Content-Type:** `application/json`
- **Description:** Unauthorized
- **Example:**

  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### ❌ 404 Not Found - Catalog Not Found

- **Content-Type:** `application/json`
- **Description:** Catalog not found
- **Example:**

  ```json
  {
    "message": "Catalog not found"
  }
  ```

#### ❌ 409 Conflict - Catalog Already Finalized

- **Content-Type:** `application/json`
- **Description:** Cannot modify finalized catalog
- **Example:**

  ```json
  {
    "message": "Cannot modify finalized catalog"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Failed to update catalog
- **Example:**

  ```json
  {
    "message": "Failed to update catalog"
  }
  ```

#### Delete Catalog

**DELETE** `/catalogs/:id`

Delete a catalog.

**Usage Example:**
```bash
curl -X DELETE http://localhost:3000/api/v1/catalogs/catalog-id \
  -H "Authorization: Bearer <access_token>"
```

#### ✅ 200 OK - Catalog Deleted Successfully

- **Content-Type:** `application/json`
- **Description:** Catalog deleted successfully
- **Example:**

  ```json
  {
    "message": "Catalog deleted successfully"
  }
  ```

#### ❌ 401 Unauthorized

- **Content-Type:** `application/json`
- **Description:** Unauthorized
- **Example:**

  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### ❌ 404 Not Found - Catalog Not Found

- **Content-Type:** `application/json`
- **Description:** Catalog not found
- **Example:**

  ```json
  {
    "message": "Catalog not found"
  }
  ```

#### ❌ 409 Conflict - Catalog In Use

- **Content-Type:** `application/json`
- **Description:** Catalog is in use by controls
- **Example:**

  ```json
  {
    "message": "Catalog is in use by controls"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Failed to delete catalog
- **Example:**

  ```json
  {
    "message": "Failed to delete catalog"
  }
  ```

### Controls

#### Get Catalog Controls

**GET** `/catalogs/:catalogId/controls`

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

**POST** `/catalogs/:tpaId/points`

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

### Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/controls/drafts` | Create a new draft control |
| PATCH | `/controls/:id/finalize` | Finalize a draft control |
| GET | `/controls` | Retrieve all controls |
| GET | `/controls/pending` | Retrieve all pending controls |
| GET | `/controls/:id` | Retrieve a specific control by ID |
| POST | `/controls` | Create a new control |
| PATCH | `/controls/:id` | Update an existing control |
| DELETE | `/controls/:id` | Delete a control |
| GET | `/controls/:id/panels` | Retrieve all panels associated with a control |
| POST | `/controls/:id/panel/:panelId` | Add a panel to a control |
| DELETE | `/controls/:id/panels/:panelId` | Remove a panel from a control |

### Draft Operations

**POST** `/controls/drafts`

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

**PATCH** `/controls/:id/finalize`

Finalize a draft control. Once finalized, the control has restricted modifications.

**Response (200 OK)**

### Standard Operations

#### List Controls

**GET** `/controls`

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

**GET** `/controls/pending`

Retrieve all pending controls.

**Query Parameters:**
- `status` (optional): Filter controls by status (`finalized` or `draft`).

**Response (200 OK)**

#### Get Control

**GET** `/controls/:id`

Retrieve a specific control by ID.

**Response (200 OK)**

#### Create Control

**POST** `/controls`

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

**PATCH** `/controls/:id`

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

**DELETE** `/controls/:id`

Delete a control.

**Response (200 OK)**

### Panel Management

#### Get Control Panels

**GET** `/controls/:id/panels`

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

**POST** `/controls/:id/panel/:panelId`

Add a panel to a control.

**Response (200 OK)**

#### Delete Panel from Control

**DELETE** `/controls/:id/panels/:panelId`

Remove a panel from a control.

**Response (200 OK)**

## Computations

### Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/computations/:id` | Retrieve a computation by computationGroup (UUID) |
| POST | `/computations/bulk` | Create multiple computations at once |
| DELETE | `/computations` | Delete all computations |
| GET | `/controls/:controlId/computations` | Retrieve all computations for a specific control |
| GET | `/controls/:controlId/computations/:createdAt` | Retrieve computations for a control filtered by date |
| PUT | `/controls/:controlId/computations` | Set compute interval for a computation |
| DELETE | `/controls/:controlId/computations` | Delete all computations for a specific control |

### Standard Operations

#### Get Computation

**GET** `/computations/:id`

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

**POST** `/computations/bulk`

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

**DELETE** `/computations`

Delete all computations.

**Response (204 No Content)**

### Control-Specific

#### Get Computations by Control

**GET** `/controls/:controlId/computations`

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

**GET** `/controls/:controlId/computations/:createdAt`

Retrieve computations for a control filtered by creation date.

**Response (200 OK)**

#### Update Computation Interval

**PUT** `/controls/:controlId/computations`

Set compute interval for a computation by control ID and creation date.

**Request Body:**
```json
{
  "interval": "*/5 * * * *"
}
```

**Response (204 No Content)**

#### Delete Computations by Control

**DELETE** `/controls/:controlId/computations`

Delete all computations for a specific control.

**Response (204 No Content)**

## Points

### Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/points/:id` | Retrieve a point by computationGroup (UUID) |
| DELETE | `/points/:id` | Delete a point |
| GET | `/points/catalog/:tpaId` | Retrieve points by Bluejay Agreement ID |
| PUT | `/points/computationGroup/:computationGroup` | Update points by computation group ID |

### Standard Operations

#### Get Point

**GET** `/points/:id`

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

**DELETE** `/points/:id`

Delete a point.

**Response (204 No Content)**

### Catalog-Specific

#### Get Points by TPA ID

**GET** `/points/catalog/:tpaId`

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

**PUT** `/points/computationGroup/:computationGroup`

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
