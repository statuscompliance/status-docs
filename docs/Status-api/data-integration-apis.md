# Data Integration

## Overview

The Data Integration APIs consist of three main components: **Databinder** for external data source management, **Linker** for coordinating multiple datasources, **Scope management** for access control, and **Grafana proxy** for dashboard integration.

## Databinder

### Base Path

`/databinder`

### Datasource Management

| Method   | Endpoint              | Description                                    | Auth Required |
|----------|-----------------------|------------------------------------------------|---------------|
| GET      | `/ds`                 | List user's datasources                         | Yes           |
| GET      | `/ds/:id`             | Get specific datasource                         | Yes           |
| POST     | `/ds`                 | Create new datasource                           | Yes           |
| PATCH    | `/ds/:id`             | Update datasource                              | Yes           |
| DELETE   | `/ds/:id`             | Delete datasource                              | Yes           |

### Datasource Operations

| Method   | Endpoint                    | Description                                   | Auth Required |
|----------|----------------------------|-----------------------------------------------|---------------|
| POST     | `/ds/:id/test`              | Test datasource connection                     | Yes           |
| POST     | `/ds/:id/fetch`             | Fetch data from datasource                    | Yes           |
| GET      | `/ds/:id/methods`           | List available methods                         | Yes           |
| GET      | `/ds/:id/methods/:methodName`| Get method details                            | Yes           |
| GET      | `/ds/:id/methods/all`       | Get all method details                        | Yes           |

### Datasource Definitions

| Method   | Endpoint                 | Description                                    | Auth Required |
|----------|--------------------------|------------------------------------------------|---------------|
| GET      | `/definitions/available`  | List available datasource types                 | No            |

### Key Databinder Features

**Supported Datasource Types:**
- `rest-api` - Generic REST API integration with various auth methods (bearer, basic, cookie, custom headers)
- `microsoft-graph` - Microsoft Graph API for Office 365 integration
- `owncloud` - OwnCloud file storage integration

**Data Fetching Capabilities:**
- Property mapping for data transformation
- Pagination support
- Multiple response formats (full, batch, iterator, stream)
- Advanced filtering and sorting
- Authentication overrides per request

### Create Datasource Examples

#### REST API with Bearer Authentication

**POST** `/ds`

**Request Body:**
```json
{
  "name": "External API with Auth",
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
  "description": "External REST API with authentication",
  "environment": "production"
}
```

**Response (200 OK):**
```json
{
  "message": "Datasource created successfully",
  "instanceId": "123_external_api_1634567890123",
  "availableMethods": ["getAll", "getById", "create", "update", "delete", "default"],
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "External API with Auth",
  "definitionId": "rest-api",
  "config": {
    "baseUrl": "https://api.example.com",
    "defaultEndpoint": "/data"
  }
}
```

#### Microsoft Graph API

**POST** `/ds`

**Request Body:**
```json
{
  "name": "Company Directory",
  "definitionId": "microsoft-graph",
  "config": {
    "tenantId": "12345678-1234-1234-1234-123456789012",
    "clientId": "87654321-4321-4321-4321-210987654321",
    "clientSecret": "your-client-secret",
    "scopes": ["https://graph.microsoft.com/.default"]
  },
  "description": "Microsoft Graph for user directory access",
  "environment": "production"
}
```

### Fetch Data Examples

#### Basic Data Fetch

**POST** `/ds/:id/fetch`

**Request Body:**
```json
{
  "methodName": "default",
  "options": {
    "method": "GET"
  }
}
```

#### Paginated Data with Filtering

**POST** `/ds/:id/fetch`

**Request Body:**
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

#### Fetch with Property Mapping

**POST** `/ds/:id/fetch`

**Request Body:**
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

**Response (200 OK):**
```json
{
  "message": "Data fetched successfully",
  "datasourceId": "123e4567-e89b-12d3-a456-426614174000",
  "datasourceName": "User API",
  "methodUsed": "getUsers",
  "result": [
    {
      "id": 1,
      "name": "User Profile Name",
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

### Base Path

`/databinder/linker`

### Linker Management

| Method   | Endpoint   | Description                              | Auth Required |
|----------|------------|------------------------------------------|---------------|
| GET      | `/`        | List user's linkers                      | Yes           |
| GET      | `/:id`     | Get specific linker                       | Yes           |
| POST     | `/`        | Create new linker                         | Yes           |
| PATCH    | `/:id`     | Update linker                            | Yes           |
| DELETE   | `/:id`     | Delete linker                            | Yes           |

### Linker Operations

| Method   | Endpoint           | Description                                        | Auth Required |
|----------|--------------------|----------------------------------------------------|---------------|
| POST     | `/:id/execute`     | Execute linker (fetch from all datasources)        | Yes           |
| GET      | `/:id/datasources` | Get datasources in linker                          | Yes           |

### Linker Features

**Merge Strategies:**
- `concat` - Concatenate arrays from all datasources
- `merge` - Merge objects from all datasources
- `override` - Use only the last datasource's result
- `indexed` - Return object indexed by datasource ID

**Runtime Method Selection:** Override configured methods at execution time using `options.methodName`.

### Create Linker Example

**POST** `/`

**Request Body:**
```json
{
  "name": "Enhanced Data Aggregator",
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
  "description": "Advanced aggregator with property mappings",
  "environment": "production"
}
```

**Response (200 OK):**
```json
{
  "message": "Linker created successfully",
  "datasourceCount": 2,
  "id": "456e7890-f23c-45d6-b789-123456789def",
  "name": "Enhanced Data Aggregator",
  "defaultMethodName": "getAll",
  "datasourceIds": [
    "123e4567-e89b-12d3-a456-426614174000",
    "987fcdeb-51a2-43d7-b789-123456789abc"
  ]
}
```

### Execute Linker Example

**POST** `/:id/execute`

**Request Body:**
```json
{
  "options": {
    "methodName": "listFiles",
    "path": "/documents"
  },
  "mergeStrategy": "indexed"
}
```

**Response (200 OK):**
```json
{
  "message": "Linker executed successfully",
  "linkerId": "456e7890-f23c-45d6-b789-123456789def",
  "linkerName": "Enhanced Data Aggregator",
  "executionStatus": "success",
  "mergeStrategy": "indexed",
  "mergedData": {
    "123e4567-e89b-12d3-a456-426614174000": [
      {
        "id": 1,
        "name": "Document 1"
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

## Scope Management

### Base Path

`/scopes`

The scope management endpoints provide access control and data organization capabilities.

## Grafana Proxy

### Base Path

`/grafana`

The Grafana proxy endpoints enable dashboard integration and visualization proxying.

## Authentication

All endpoints (except `/definitions/available`) require authentication using JWT tokens:

```
Authorization: Bearer <jwt-token>
```

Users can only access datasources and linkers they own, enforced through ownership checks. Some endpoints may require DEVELOPER or ADMIN roles.

## Notes

- The Databinder system provides comprehensive telemetry and logging for all operations
- Property mapping allows transformation of external data structures to match internal requirements
- All datasource configurations support environment tagging (production, staging, dev)
- The system includes built-in validation for datasource configurations and method parameters
- Error responses include detailed information about available methods when invalid methods are requested
- The `datasourceConfigs` field is mandatory when creating linkers and must include `methodConfig.methodName` for each datasource
- Runtime method selection allows overriding configured methods during execution
