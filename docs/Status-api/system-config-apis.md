# System Configuration

Admin-only endpoints for managing endpoint availability, service settings, and system-wide limits.

## Overview

The System Configuration provide administrative control over endpoint availability, service configurations, and resource limits. These endpoints are restricted to users with ADMIN role and are mounted under `/api/v1/config` (configurable via `API_PREFIX` environment variable).

## Base Configuration

### Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/config` | Retrieves all endpoint configurations from the system |
| POST | `/config` | Retrieves a specific endpoint configuration by endpoint path |
| PUT | `/config` | Updates an endpoint configuration's availability status |

### Get All Configurations

**GET** `/config`

Retrieves all endpoint configurations from the system.

**Authentication:** Admin only (Bearer token required)

**Usage Example:**
```bash
curl -X GET http://localhost:3000/api/v1/config \
  -H "Authorization: Bearer <admin_access_token>"
```

#### ✅ 200 OK - Configurations Retrieved

- **Content-Type:** `application/json`
- **Description:** All endpoint configurations retrieved successfully
- **Example:**

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

#### ❌ 401 Unauthorized

- **Content-Type:** `application/json`
- **Description:** No token provided
- **Example:**

  ```json
  {
    "message": "No token provided"
  }
  ```

#### ❌ 403 Forbidden

- **Content-Type:** `application/json`
- **Description:** User is not admin
- **Example:**

  ```json
  {
    "message": "User is not admin"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Database error
- **Example:**

  ```json
  {
    "message": "Failed to get configurations"
  }
  ```

### Get Configuration by Endpoint

**POST** `/config`

Retrieves a specific endpoint configuration by endpoint path.

**Request Body:**
```json
{
  "endpoint": "/users"
}
```

**Usage Example:**
```bash
curl -X POST http://localhost:3000/api/v1/config \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_access_token>" \
  -d '{
    "endpoint": "/users"
  }'
```

#### ✅ 200 OK - Configuration Retrieved

- **Content-Type:** `application/json`
- **Description:** Configuration retrieved successfully
- **Example:**

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

#### ❌ 401 Unauthorized

- **Content-Type:** `application/json`
- **Description:** No token provided
- **Example:**

  ```json
  {
    "message": "No token provided"
  }
  ```

#### ❌ 404 Not Found

- **Content-Type:** `application/json`
- **Description:** Configuration not found
- **Example:**

  ```json
  {
    "message": "Configuration not found"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Database error
- **Example:**

  ```json
  {
    "message": "Failed to get configuration"
  }
  ```

### Update Configuration

**PUT** `/config`

Updates an endpoint configuration's availability status.

**Request Body:**
```json
{
  "endpoint": "/users",
  "available": false
}
```

**Usage Example:**
```bash
curl -X PUT http://localhost:3000/api/v1/config \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_access_token>" \
  -d '{
    "endpoint": "/users",
    "available": false
  }'
```

#### ✅ 200 OK - Configuration Updated

- **Content-Type:** `application/json`
- **Description:** Configuration updated successfully
- **Example:**

  ```json
  {
    "message": "Configuration <id> updated successfully"
  }
  ```

**Note:** This endpoint automatically refreshes the in-memory configuration cache after updating.

#### ❌ 400 Bad Request - Missing Endpoint

- **Content-Type:** `application/json`
- **Description:** Missing endpoint parameter
- **Example:**

  ```json
  {
    "message": "Endpoint parameter is required"
  }
  ```

#### ❌ 401 Unauthorized

- **Content-Type:** `application/json`
- **Description:** No token provided
- **Example:**

  ```json
  {
    "message": "No token provided"
  }
  ```

#### ❌ 404 Not Found

- **Content-Type:** `application/json`
- **Description:** Configuration not found
- **Example:**

  ```json
  {
    "message": "Configuration not found"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Database error
- **Example:**

  ```json
  {
    "message": "Failed to update configuration"
  }
  ```

## Assistant Limit

### Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/config/assistant/limit` | Retrieves the current assistant creation limit |
| PUT | `/config/assistant/limit/:limit` | Updates the assistant creation limit |

### Get Assistant Limit

**GET** `/config/assistant/limit`

Retrieves the current assistant creation limit.

**Usage Example:**
```bash
curl -X GET http://localhost:3000/api/v1/config/assistant/limit \
  -H "Authorization: Bearer <admin_access_token>"
```

#### ✅ 200 OK - Assistant Limit Retrieved

- **Content-Type:** `application/json`
- **Description:** Current assistant limit retrieved successfully
- **Example:**

  ```json
  {
    "limit": 100
  }
  ```

#### ❌ 400 Bad Request - Limit Not Set

- **Content-Type:** `application/json`
- **Description:** Limit not set in configuration
- **Example:**

  ```json
  {
    "message": "Limit not set in configuration"
  }
  ```

#### ❌ 404 Not Found

- **Content-Type:** `application/json`
- **Description:** Assistant configuration not found
- **Example:**

  ```json
  {
    "message": "Assistant configuration not found"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Database error
- **Example:**

  ```json
  {
    "message": "Failed to get assistant limit"
  }
  ```

### Update Assistant Limit

**PUT** `/config/assistant/limit/:limit`

Updates the assistant creation limit.

**Path Parameters:**
- `limit` (integer): The new limit value (must be ≥ 1)

**Usage Example:**
```bash
curl -X PUT http://localhost:3000/api/v1/config/assistant/limit/200 \
  -H "Authorization: Bearer <admin_access_token>"
```

#### ✅ 200 OK - Limit Updated

- **Content-Type:** `application/json`
- **Description:** Assistant limit updated successfully
- **Example:**

  ```json
  {
    "message": "Limit updated successfully"
  }
  ```

**Validation Rules:**
- Limit must be an integer ≥ 1
- Limit cannot be less than the current number of assistants
- Automatically refreshes cache after update

#### ❌ 400 Bad Request - Invalid Limit

- **Content-Type:** `application/json`
- **Description:** Invalid limit value or limit less than current assistants
- **Example:**

  ```json
  {
    "message": "Limit must be at least 1"
  }
  ```

#### ❌ 404 Not Found

- **Content-Type:** `application/json`
- **Description:** Assistant configuration not found
- **Example:**

  ```json
  {
    "message": "Assistant configuration not found"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Database error
- **Example:**

  ```json
  {
    "message": "Failed to update assistant limit"
  }
  ```

## Configuration Data Model

The `Configuration` model stores endpoint settings in PostgreSQL with the following schema:

| Field       | Type        | Description                                    |
|-------------|-------------|------------------------------------------------|
| `id`        | UUID        | Primary key                                    |
| `endpoint`  | String(50)  | API endpoint path                              |
| `available` | Boolean     | Whether endpoint is enabled (default: true)    |
| `limit`     | Integer     | Optional resource limit (default: 1)           |
| `createdAt` | Timestamp   | Record creation time                           |
| `updatedAt` | Timestamp   | Record last update time                        |

## Endpoint Availability System

The system uses middleware to enforce endpoint availability before processing requests:

1. **Cache Check**: Reads from in-memory `configurationsCache` for performance
2. **Prefix Matching**: Uses longest-prefix matching to find applicable configuration
3. **Availability Enforcement**: Returns 404 if endpoint is disabled

### Cache Management

The cache is managed through three functions:
- `getConfigurationsCache()`: Returns current cache
- `setConfigurationsCache(value)`: Sets cache value
- `updateConfigurationsCache()`: Refreshes cache from database

**Important:** Cache is automatically refreshed when configurations are updated via API, but not when modified directly in database.

## Assistant Limit Enforcement

The `assistantlimitReached` middleware enforces creation limits by comparing current assistant count with the configured limit. When the limit is reached, it returns HTTP 429 "Limit reached".

## Authentication

All endpoints require JWT authentication with ADMIN role:

```
Authorization: Bearer <admin-jwt-token>
```

Unauthorized access attempts are logged and may trigger security alerts.

## Notes

- All configuration endpoints require ADMIN authority
- The system uses prefix matching with longest-match preference for hierarchical endpoint control
- Cache is automatically refreshed when configurations are updated via API
- Test environment uses empty `API_PREFIX` while production uses configured prefix
