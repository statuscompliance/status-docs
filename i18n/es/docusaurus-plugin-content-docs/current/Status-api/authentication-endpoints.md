# Autenticación

Rutas públicas para inicio de sesión, registro, renovación de tokens y autenticación OAuth de GitHub.

## Descripción General

Los endpoints de autenticación proporcionan mecanismos seguros de autenticación y autorización de usuarios para acceder al sistema STATUS.

## Rutas Públicas

### Inicio de Sesión

**POST** `/users/signIn`

Autentica a un usuario y genera tokens de acceso y renovación.

**Cuerpo de la Solicitud:**
```json
{
  "username": "string",
  "password": "string",
  "totpToken": "string"
}
```

**Respuesta (200 OK):**
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

### Registro

**POST** `/users/signUp`

Crea una nueva cuenta de usuario (requiere privilegios de administrador).

**Cuerpo de la Solicitud:**
```json
{
  "username": "string",
  "password": "string",
  "email": "string",
  "authority": "USER"
}
```

**Respuesta (201 Creado):**
```json
{
  "message": "User {username} created successfully with authority {authority}"
}
```

### Renovación de Token

**GET** `/users/auth/refresh`

Renueva el token de acceso utilizando un token de renovación válido.

**Respuesta (200 OK):**
```json
{
  "accessToken": "string"
}
```

### Cerrar Sesión

**GET** `/users/signOut`

Cierra la sesión de un usuario eliminando todas las cookies (accessToken, refreshToken, nodeRedToken).

**Respuesta (204 Sin Contenido):** Sin contenido con mensaje de éxito

## Autenticación OAuth de GitHub

### Autenticación GitHub

**GET** `/github/auth`

Obtiene el token de acceso de GitHub utilizando el código de autorización del flujo OAuth.

**Parámetros de Consulta:**
- `code` (requerido): Código de autorización obtenido del flujo OAuth de GitHub

**Respuesta (200 OK):**
```json
{
  "access_token": "string",
  "token_type": "string"
}
```

### Obtener Encabezado

**GET** `/header`

Obtiene el encabezado de autorización de la solicitud.

**Respuesta (200 OK):**
```json
{
  "authorizationHeader": "string"
}
```

## Flujo de Autenticación

El sistema de autenticación utiliza tokens JWT con las siguientes características:

- **Token de Acceso**: Expiración de 1 hora, almacenado en cookie HTTP-only
- **Token de Renovación**: Expiración de 7 días, almacenado en cookie HTTP-only y base de datos
- **Token Node-RED**: Token adicional para usuarios DEVELOPER/ADMIN (7 días)

La verificación y renovación automática de tokens se maneja mediante el middleware `verifyAuthority`.

## Seguridad

- Todas las contraseñas se hashean usando bcrypt
- Todos los endpoints de autenticación utilizan cookies HTTP-only para el almacenamiento de tokens
- El endpoint de registro requiere privilegios de administrador mediante el middleware `verifyAdmin`
- Se soporta autenticación de dos factores (2FA) utilizando tokens TOTP
- La integración OAuth de GitHub requiere las variables de entorno `GH_CLIENT_ID` y `GH_CLIENT_SECRET`
- Los tokens Node-RED se generan automáticamente para usuarios con niveles de autoridad DEVELOPER o ADMIN
- Los tokens JWT incluyen tiempos de expiración
- Los tokens de renovación pueden ser revocados
