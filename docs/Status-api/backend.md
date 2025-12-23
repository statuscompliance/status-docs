# Backend API

The STATUS Backend API provides the core functionality for data management and business logic.

## Overview

The backend API handles data storage and retrieval, business logic processing, authentication and authorization, and integration with external services.

## Authentication

All backend endpoints require JWT authentication via Bearer token:

```
Authorization: Bearer <jwt-token>
```

## Core

### Get User Profile

**GET** `/api/users/profile`

Retrieves the authenticated user's profile information.

**Response (200 OK):**
```json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "authority": "USER"
}
```

### Update User Profile

**PATCH** `/api/users/profile`

Updates the authenticated user's profile information.

**Request Body:**
```json
{
  "email": "string"
}
```

**Response (200 OK):**
```json
{
  "message": "Profile updated successfully"
}
```

## Notes

- All endpoints are prefixed with the `API_PREFIX` configured in environment variables
- Authentication is required for all protected routes
- Rate limiting may apply to certain endpoints
