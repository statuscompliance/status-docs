# Authentication

Public routes for user sign-in, sign-up, token refresh, and GitHub OAuth authentication.

## Overview

The authentication endpoints provide secure user authentication and authorization mechanisms for accessing the STATUS system.

## Public Routes

### Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/signIn` | Authenticates a user and generates access and refresh tokens |
| POST | `/users/signUp` | Creates a new user account (requires admin privileges) |
| GET | `/users/auth/refresh` | Refreshes the access token using a valid refresh token |
| GET | `/users/signOut` | Logs out a user by clearing all cookies |
| GET | `/users/whoami` | Returns info about the currently authenticated user |
| POST | `/users/2fa/setup` | Generates a QR code to configure 2FA (admin only) |
| POST | `/users/2fa/verify` | Verifies the 2FA token and enables 2FA (admin only) |
| GET | `/users/2fa/status` | Returns 2FA activation status for the current user |
| POST | `/users/2fa/disable` | Disables 2FA for the current user |

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

**Usage Example:**
```bash
curl -X POST http://localhost:3000/api/v1/users/signIn \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securePassword123",
    "totpToken": "123456"
  }'
```

#### ✅ 200 OK - Authentication Successful

- **Content-Type:** `application/json`
- **Description:** User authenticated successfully, tokens generated
- **Example:**

  ```json
  {
    "username": "john_doe",
    "email": "john.doe@example.com",
    "authority": "ADMIN",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "nodeRedToken": "node_red_token_here",
    "nodeRedAccess": true
  }
  ```

#### ❌ 401 Unauthorized

- **Content-Type:** `application/json`
- **Description:** Invalid password or user not found
- **Example:**

  ```json
  {
    "message": "Invalid password or user not found"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Internal server error during authentication
- **Example:**

  ```json
  {
    "message": "Internal server error"
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

**Usage Example:**
```bash
curl -X POST http://localhost:3000/api/v1/users/signUp \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_access_token>" \
  -d '{
    "username": "jane_doe",
    "password": "securePassword123",
    "email": "jane.doe@example.com",
    "authority": "USER"
  }'
```

#### ✅ 201 Created - User Successfully Created

- **Content-Type:** `application/json`
- **Description:** User account created successfully
- **Example:**

  ```json
  {
    "message": "User jane_doe created successfully with authority USER"
  }
  ```

#### ❌ 400 Bad Request - Username Already Exists

- **Content-Type:** `application/json`
- **Description:** Username already exists in the system
- **Example:**

  ```json
  {
    "message": "Username already exists"
  }
  ```

#### ❌ 403 Forbidden - Admin Required

- **Content-Type:** `application/json`
- **Description:** User does not have admin privileges
- **Example:**

  ```json
  {
    "message": "Admin privileges required"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Failed to create user
- **Example:**

  ```json
  {
    "message": "Failed to create user"
  }
  ```

### Token Refresh

**GET** `/users/auth/refresh`

Refreshes the access token using a valid refresh token.

**Usage Example:**
```bash
curl -X GET http://localhost:3000/api/v1/users/auth/refresh \
  -H "Content-Type: application/json"
```

#### ✅ 200 OK - Token Refreshed Successfully

- **Content-Type:** `application/json`
- **Description:** Access token refreshed successfully
- **Example:**

  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### ❌ 400 Bad Request - No Refresh Token

- **Content-Type:** `application/json`
- **Description:** No refresh token provided in cookies
- **Example:**

  ```json
  {
    "message": "No refresh token provided"
  }
  ```

#### ❌ 403 Forbidden - Invalid or Expired Token

- **Content-Type:** `application/json`
- **Description:** Refresh token is invalid or has expired
- **Example:**

  ```json
  {
    "message": "Invalid or expired refresh token"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Internal server error during token refresh
- **Example:**

  ```json
  {
    "message": "Failed to refresh token"
  }
  ```

### Sign Out

**GET** `/users/signOut`

Logs out a user by clearing all cookies (accessToken, refreshToken, nodeRedToken).

**Usage Example:**
```bash
curl -X GET http://localhost:3000/api/v1/users/signOut \
  -H "Content-Type: application/json"
```

#### ✅ 204 No Content - Logged Out Successfully

- **Description:** User logged out successfully, all cookies cleared

#### ❌ 400 Bad Request - No Refresh Token

- **Content-Type:** `application/json`
- **Description:** No refresh token provided
- **Example:**

  ```json
  {
    "message": "No refresh token provided"
  }
  ```

#### ❌ 404 Not Found - User Not Found

- **Content-Type:** `application/json`
- **Description:** No user found for provided refresh token
- **Example:**

  ```json
  {
    "message": "No user found for provided refresh token"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Internal server error during sign out
- **Example:**

  ```json
  {
    "message": "Failed to sign out"
  }
  ```

### Who Am I

**GET** `/users/whoami`

Returns info about the currently authenticated user.

**Usage Example:**
```bash
curl -X GET http://localhost:3000/api/v1/users/whoami \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>"
```

#### ✅ 200 OK - User Info Retrieved

- **Content-Type:** `application/json`
- **Description:** Authenticated user information
- **Example:**

  ```json
  {
    "id": 1,
    "username": "john_doe",
    "email": "john.doe@example.com",
    "authority": "ADMIN",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
  ```

#### ❌ 401 Unauthorized - Invalid Token

- **Content-Type:** `application/json`
- **Description:** No token provided or invalid token
- **Example:**

  ```json
  {
    "message": "Unauthorized: Invalid token"
  }
  ```

#### ❌ 404 Not Found - User Not Found

- **Content-Type:** `application/json`
- **Description:** User not found for provided token
- **Example:**

  ```json
  {
    "message": "User not found"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Internal server error while fetching user info
- **Example:**

  ```json
  {
    "message": "Failed to fetch user info"
  }
  ```

## Two-Factor Authentication (2FA)

### Setup 2FA

**POST** `/users/2fa/setup`

Generates a QR code to configure 2FA for the current user (admin only).

**Usage Example:**
```bash
curl -X POST http://localhost:3000/api/v1/users/2fa/setup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_access_token>"
```

#### ✅ 200 OK - QR Code Generated

- **Content-Type:** `application/json`
- **Description:** QR code generated for 2FA setup
- **Example:**

  ```json
  {
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
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

#### ❌ 403 Forbidden

- **Content-Type:** `application/json`
- **Description:** User does not have admin privileges
- **Example:**

  ```json
  {
    "message": "Admin privileges required"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Failed to generate QR code
- **Example:**

  ```json
  {
    "message": "Failed to generate QR code"
  }
  ```

### Verify 2FA

**POST** `/users/2fa/verify`

Verifies the 2FA token and enables 2FA (admin only).

**Request Body:**
```json
{
  "totpToken": "string"
}
```

**Usage Example:**
```bash
curl -X POST http://localhost:3000/api/v1/users/2fa/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_access_token>" \
  -d '{
    "totpToken": "123456"
  }'
```

#### ✅ 200 OK - 2FA Verified and Enabled

- **Content-Type:** `application/json`
- **Description:** 2FA token verified and 2FA enabled
- **Example:**

  ```json
  {
    "message": "2FA enabled successfully"
  }
  ```

#### ❌ 401 Unauthorized - Invalid Token

- **Content-Type:** `application/json`
- **Description:** Invalid 2FA token
- **Example:**

  ```json
  {
    "message": "Invalid 2FA token"
  }
  ```

#### ❌ 403 Forbidden

- **Content-Type:** `application/json`
- **Description:** User does not have admin privileges
- **Example:**

  ```json
  {
    "message": "Admin privileges required"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Failed to verify 2FA token
- **Example:**

  ```json
  {
    "message": "Failed to verify 2FA token"
  }
  ```

### Get 2FA Status

**GET** `/users/2fa/status`

Returns 2FA activation status for the current user.

**Usage Example:**
```bash
curl -X GET http://localhost:3000/api/v1/users/2fa/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>"
```

#### ✅ 200 OK - 2FA Status Retrieved

- **Content-Type:** `application/json`
- **Description:** 2FA activation status
- **Example:**

  ```json
  {
    "twofa_enabled": true
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
- **Description:** Failed to get 2FA status
- **Example:**

  ```json
  {
    "message": "Failed to get 2FA status"
  }
  ```

### Disable 2FA

**POST** `/users/2fa/disable`

Disables 2FA for the current user.

**Request Body:**
```json
{
  "password": "string",
  "totpToken": "string"
}
```

**Usage Example:**
```bash
curl -X POST http://localhost:3000/api/v1/users/2fa/disable \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "password": "securePassword123",
    "totpToken": "123456"
  }'
```

#### ✅ 200 OK - 2FA Disabled

- **Content-Type:** `application/json`
- **Description:** 2FA disabled successfully
- **Example:**

  ```json
  {
    "message": "2FA disabled successfully"
  }
  ```

#### ❌ 400 Bad Request - 2FA Not Enabled

- **Content-Type:** `application/json`
- **Description:** 2FA is not enabled for this user
- **Example:**

  ```json
  {
    "message": "2FA is not enabled"
  }
  ```

#### ❌ 401 Unauthorized - Invalid Credentials

- **Content-Type:** `application/json`
- **Description:** Invalid password or token
- **Example:**

  ```json
  {
    "message": "Invalid password or token"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Failed to disable 2FA
- **Example:**

  ```json
  {
    "message": "Failed to disable 2FA"
  }
  ```

## GitHub OAuth Authentication

### Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/github/auth` | Retrieves GitHub access token using authorization code |
| GET | `/header` | Retrieves authorization header from request |

### GitHub Auth

**GET** `/github/auth`

Retrieves GitHub access token using authorization code from OAuth flow.

**Query Parameters:**
- `code` (required): Authorization code obtained from GitHub OAuth flow

**Usage Example:**
```bash
curl -X GET "http://localhost:3000/api/v1/github/auth?code=authorization_code_here" \
  -H "Content-Type: application/json"
```

#### ✅ 200 OK - GitHub Token Retrieved

- **Content-Type:** `application/json`
- **Description:** GitHub access token retrieved successfully
- **Example:**

  ```json
  {
    "access_token": "ghp_xxxxxxxxxxxxxxxxxxxxxxxx",
    "token_type": "bearer"
  }
  ```

#### ❌ 400 Bad Request - Missing Code

- **Content-Type:** `application/json`
- **Description:** Authorization code not provided
- **Example:**

  ```json
  {
    "message": "Authorization code is required"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Failed to retrieve GitHub token
- **Example:**

  ```json
  {
    "message": "Failed to retrieve GitHub token"
  }
  ```

### Get Header

**GET** `/header`

Retrieves authorization header from request.

**Usage Example:**
```bash
curl -X GET http://localhost:3000/api/v1/header \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>"
```

#### ✅ 200 OK - Authorization Header Retrieved

- **Content-Type:** `application/json`
- **Description:** Authorization header retrieved successfully
- **Example:**

  ```json
  {
    "authorizationHeader": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### ❌ 401 Unauthorized - No Authorization Header

- **Content-Type:** `application/json`
- **Description:** No authorization header provided
- **Example:**

  ```json
  {
    "message": "No authorization header provided"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Internal server error while retrieving header
- **Example:**

  ```json
  {
    "message": "Failed to retrieve authorization header"
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
