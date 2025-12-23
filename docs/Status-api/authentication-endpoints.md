# Authentication

Public routes for user sign-in, sign-up, token refresh, and GitHub OAuth authentication.

## Overview

The authentication endpoints provide secure user authentication and authorization mechanisms for accessing the STATUS system.

## Public Routes

### Sign In

**POST** `/users/signIn`

Authenticates a user and generates access and refresh tokens.

**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "totpToken": "string"
}
```

**Response (200 OK):**
```json
{
  "username": "string",
  "email": "string",
  "authority": "string",
  "accessToken": "string",
  "refreshToken": "string",
  "nodeRedToken": "string",
  "nodeRedAccess": "boolean"
}
```

### Sign Up

**POST** `/users/signUp`

Creates a new user account (requires admin privileges).

**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "email": "string",
  "authority": "USER"
}
```

**Response (201 Created):**
```json
{
  "message": "User {username} created successfully with authority {authority}"
}
```

### Token Refresh

**GET** `/users/auth/refresh`

Refreshes the access token using a valid refresh token.

**Response (200 OK):**
```json
{
  "accessToken": "string"
}
```

### Sign Out

**GET** `/users/signOut`

Logs out a user by clearing all cookies (accessToken, refreshToken, nodeRedToken).

**Response (204 No Content):** No content with success message

## GitHub OAuth Authentication

### GitHub Auth

**GET** `/github/auth`

Retrieves GitHub access token using authorization code from OAuth flow.

**Query Parameters:**
- `code` (required): Authorization code obtained from GitHub OAuth flow

**Response (200 OK):**
```json
{
  "access_token": "string",
  "token_type": "string"
}
```

### Get Header

**GET** `/header`

Retrieves authorization header from request.

**Response (200 OK):**
```json
{
  "authorizationHeader": "string"
}
```

## Authentication Flow

The authentication system uses JWT tokens with the following characteristics:

- **Access Token**: 1-hour expiration, stored in HTTP-only cookie
- **Refresh Token**: 7-day expiration, stored in HTTP-only cookie and database
- **Node-RED Token**: Additional token for DEVELOPER/ADMIN users (7 days)

Token verification and automatic refresh is handled by the `verifyAuthority` middleware.

## Security

- All passwords are hashed using bcrypt
- All authentication endpoints use HTTP-only cookies for token storage
- The sign-up endpoint requires admin privileges via `verifyAdmin` middleware
- 2FA (Two-Factor Authentication) is supported using TOTP tokens
- GitHub OAuth integration requires `GH_CLIENT_ID` and `GH_CLIENT_SECRET` environment variables
- Node-RED tokens are automatically generated for users with DEVELOPER or ADMIN authority levels
- JWT tokens include expiration times
- Refresh tokens can be revoked
