# System Configuration

Admin-only endpoints for managing endpoint availability, service settings, and system-wide limits.

## Overview

The System Configuration provide administrative control over endpoint availability, service configurations, and resource limits. These endpoints are restricted to users with ADMIN role and are mounted under `/api/v1/config` (configurable via `API_PREFIX` environment variable).

## Base Configuration

### Get All Configurations

**GET** `/config`

Retrieves all endpoint configurations from the system.

**Authentication:** Admin only (Bearer token required)

**Response (200 OK):**
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

**Error Responses:**
- `401 Unauthorized`: No token provided
- `403 Forbidden`: User is not admin
- `500 Internal Server Error`: Database error

### Get Configuration by Endpoint

**POST** `/config`

Retrieves a specific endpoint configuration by endpoint path.

**Request Body:**
```json
{
  "endpoint": "/users"
}
```

**Response (200 OK):**
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

**Error Responses:**
- `404 Not Found`: Configuration not found
- `500 Internal Server Error`: Database error

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

**Response (200 OK):**
```json
{
  "message": "Configuration <id> updated successfully"
}
```

**Note:** This endpoint automatically refreshes the in-memory configuration cache after updating.

**Error Responses:**
- `400 Bad Request`: Missing endpoint parameter
- `404 Not Found`: Configuration not found
- `500 Internal Server Error`: Database error

## Assistant Limit

### Get Assistant Limit

**GET** `/config/assistant/limit`

Retrieves the current assistant creation limit.

**Response (200 OK):**
```json
{
  "limit": 100
}
```

**Error Responses:**
- `400 Bad Request`: Limit not set in configuration
- `404 Not Found`: Assistant configuration not found

### Update Assistant Limit

**PUT** `/config/assistant/limit/:limit`

Updates the assistant creation limit.

**Path Parameters:**
- `limit` (integer): The new limit value (must be ≥ 1)

**Response (200 OK):**
```json
{
  "message": "Limit updated successfully"
}
```

**Validation Rules:**
- Limit must be an integer ≥ 1
- Limit cannot be less than the current number of assistants
- Automatically refreshes cache after update

**Error Responses:**
- `400 Bad Request`: Invalid limit value or limit less than current assistants
- `404 Not Found`: Assistant configuration not found
- `500 Internal Server Error`: Database error

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
