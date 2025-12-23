# Autenticación

Rutas públicas para inicio de sesión, registro, renovación de tokens y autenticación OAuth de GitHub.

## Descripción General

Los endpoints de autenticación proporcionan mecanismos seguros de autenticación y autorización de usuarios para acceder al sistema STATUS.

## Rutas Públicas

### Resumen de Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/users/signIn` | Autentica a un usuario y genera tokens de acceso y renovación |
| POST | `/users/signUp` | Crea una nueva cuenta de usuario (requiere privilegios de administrador) |
| GET | `/users/auth/refresh` | Renueva el token de acceso utilizando un token de renovación válido |
| GET | `/users/signOut` | Cierra la sesión de un usuario eliminando todas las cookies |
| GET | `/users/whoami` | Devuelve información sobre el usuario autenticado actualmente |
| POST | `/users/2fa/setup` | Genera un código QR para configurar 2FA (solo admin) |
| POST | `/users/2fa/verify` | Verifica el token 2FA y activa 2FA (solo admin) |
| GET | `/users/2fa/status` | Devuelve el estado de activación de 2FA para el usuario actual |
| POST | `/users/2fa/disable` | Desactiva 2FA para el usuario actual |

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

**Ejemplo de Uso:**
```bash
curl -X POST http://localhost:3000/api/v1/users/signIn \
  -H "Content-Type: application/json" \
  -d '{
    "username": "juan_perez",
    "password": "contrasenaSegura123",
    "totpToken": "123456"
  }'
```

#### ✅ 200 OK - Autenticación Exitosa

- **Content-Type:** `application/json`
- **Descripción:** Usuario autenticado exitosamente, tokens generados
- **Ejemplo:**

  ```json
  {
    "username": "juan_perez",
    "email": "juan.perez@ejemplo.com",
    "authority": "ADMIN",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "nodeRedToken": "token_node_red_aqui",
    "nodeRedAccess": true
  }
  ```

#### ❌ 401 No Autorizado

- **Content-Type:** `application/json`
- **Descripción:** Contraseña inválida o usuario no encontrado
- **Ejemplo:**

  ```json
  {
    "message": "Contraseña inválida o usuario no encontrado"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error interno del servidor durante la autenticación
- **Ejemplo:**

  ```json
  {
    "message": "Error interno del servidor"
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

**Ejemplo de Uso:**
```bash
curl -X POST http://localhost:3000/api/v1/users/signUp \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_acceso_admin>" \
  -d '{
    "username": "maria_garcia",
    "password": "contrasenaSegura123",
    "email": "maria.garcia@ejemplo.com",
    "authority": "USER"
  }'
```

#### ✅ 201 Creado - Usuario Creado Exitosamente

- **Content-Type:** `application/json`
- **Descripción:** Cuenta de usuario creada exitosamente
- **Ejemplo:**

  ```json
  {
    "message": "Usuario maria_garcia creado exitosamente con autoridad USER"
  }
  ```

#### ❌ 400 Solicitud Incorrecta - Usuario Ya Existe

- **Content-Type:** `application/json`
- **Descripción:** El nombre de usuario ya existe en el sistema
- **Ejemplo:**

  ```json
  {
    "message": "El nombre de usuario ya existe"
  }
  ```

#### ❌ 403 Prohibido - Requiere Admin

- **Content-Type:** `application/json`
- **Descripción:** El usuario no tiene privilegios de administrador
- **Ejemplo:**

  ```json
  {
    "message": "Se requieren privilegios de administrador"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error al crear el usuario
- **Ejemplo:**

  ```json
  {
    "message": "Error al crear el usuario"
  }
  ```

### Renovación de Token

**GET** `/users/auth/refresh`

Renueva el token de acceso utilizando un token de renovación válido.

**Ejemplo de Uso:**
```bash
curl -X GET http://localhost:3000/api/v1/users/auth/refresh \
  -H "Content-Type: application/json"
```

#### ✅ 200 OK - Token Renovado Exitosamente

- **Content-Type:** `application/json`
- **Descripción:** Token de acceso renovado exitosamente
- **Ejemplo:**

  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### ❌ 400 Solicitud Incorrecta - Sin Token de Renovación

- **Content-Type:** `application/json`
- **Descripción:** No se proporcionó token de renovación en las cookies
- **Ejemplo:**

  ```json
  {
    "message": "No se proporcionó token de renovación"
  }
  ```

#### ❌ 403 Prohibido - Token Inválido o Expirado

- **Content-Type:** `application/json`
- **Descripción:** El token de renovación es inválido o ha expirado
- **Ejemplo:**

  ```json
  {
    "message": "Token de renovación inválido o expirado"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error interno del servidor durante la renovación del token
- **Ejemplo:**

  ```json
  {
    "message": "Error al renovar el token"
  }
  ```

### Cerrar Sesión

**GET** `/users/signOut`

Cierra la sesión de un usuario eliminando todas las cookies (accessToken, refreshToken, nodeRedToken).

**Ejemplo de Uso:**
```bash
curl -X GET http://localhost:3000/api/v1/users/signOut \
  -H "Content-Type: application/json"
```

#### ✅ 204 Sin Contenido - Sesión Cerrada Exitosamente

- **Descripción:** Sesión de usuario cerrada exitosamente, todas las cookies eliminadas

#### ❌ 400 Solicitud Incorrecta - Sin Token de Renovación

- **Content-Type:** `application/json`
- **Descripción:** No se proporcionó token de renovación
- **Ejemplo:**

  ```json
  {
    "message": "No se proporcionó token de renovación"
  }
  ```

#### ❌ 404 No Encontrado - Usuario No Encontrado

- **Content-Type:** `application/json`
- **Descripción:** No se encontró usuario para el token de renovación proporcionado
- **Ejemplo:**

  ```json
  {
    "message": "No se encontró usuario para el token de renovación proporcionado"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error interno del servidor durante el cierre de sesión
- **Ejemplo:**

  ```json
  {
    "message": "Error al cerrar sesión"
  }
  ```

### ¿Quién Soy Yo?

**GET** `/users/whoami`

Devuelve información sobre el usuario autenticado actualmente.

**Ejemplo de Uso:**
```bash
curl -X GET http://localhost:3000/api/v1/users/whoami \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_acceso>"
```

#### ✅ 200 OK - Información de Usuario Obtenida

- **Content-Type:** `application/json`
- **Descripción:** Información del usuario autenticado
- **Ejemplo:**

  ```json
  {
    "id": 1,
    "username": "juan_perez",
    "email": "juan.perez@ejemplo.com",
    "authority": "ADMIN",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
  ```

#### ❌ 401 No Autorizado - Token Inválido

- **Content-Type:** `application/json`
- **Descripción:** No se proporcionó token o token inválido
- **Ejemplo:**

  ```json
  {
    "message": "No autorizado: Token inválido"
  }
  ```

#### ❌ 404 No Encontrado - Usuario No Encontrado

- **Content-Type:** `application/json`
- **Descripción:** No se encontró usuario para el token proporcionado
- **Ejemplo:**

  ```json
  {
    "message": "Usuario no encontrado"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error interno del servidor al obtener información del usuario
- **Ejemplo:**

  ```json
  {
    "message": "Error al obtener información del usuario"
  }
  ```

## Autenticación de Dos Factores (2FA)

### Configurar 2FA

**POST** `/users/2fa/setup`

Genera un código QR para configurar 2FA para el usuario actual (solo admin).

**Ejemplo de Uso:**
```bash
curl -X POST http://localhost:3000/api/v1/users/2fa/setup \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_acceso_admin>"
```

#### ✅ 200 OK - Código QR Generado

- **Content-Type:** `application/json`
- **Descripción:** Código QR generado para configuración de 2FA
- **Ejemplo:**

  ```json
  {
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  }
  ```

#### ❌ 401 No Autorizado

- **Content-Type:** `application/json`
- **Descripción:** No autorizado
- **Ejemplo:**

  ```json
  {
    "message": "No autorizado"
  }
  ```

#### ❌ 403 Prohibido

- **Content-Type:** `application/json`
- **Descripción:** El usuario no tiene privilegios de administrador
- **Ejemplo:**

  ```json
  {
    "message": "Se requieren privilegios de administrador"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error al generar código QR
- **Ejemplo:**

  ```json
  {
    "message": "Error al generar código QR"
  }
  ```

### Verificar 2FA

**POST** `/users/2fa/verify`

Verifica el token 2FA y activa 2FA (solo admin).

**Cuerpo de la Solicitud:**
```json
{
  "totpToken": "string"
}
```

**Ejemplo de Uso:**
```bash
curl -X POST http://localhost:3000/api/v1/users/2fa/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_acceso_admin>" \
  -d '{
    "totpToken": "123456"
  }'
```

#### ✅ 200 OK - 2FA Verificado y Activado

- **Content-Type:** `application/json`
- **Descripción:** Token 2FA verificado y 2FA activado
- **Ejemplo:**

  ```json
  {
    "message": "2FA activado exitosamente"
  }
  ```

#### ❌ 401 No Autorizado - Token Inválido

- **Content-Type:** `application/json`
- **Descripción:** Token 2FA inválido
- **Ejemplo:**

  ```json
  {
    "message": "Token 2FA inválido"
  }
  ```

#### ❌ 403 Prohibido

- **Content-Type:** `application/json`
- **Descripción:** El usuario no tiene privilegios de administrador
- **Ejemplo:**

  ```json
  {
    "message": "Se requieren privilegios de administrador"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error al verificar token 2FA
- **Ejemplo:**

  ```json
  {
    "message": "Error al verificar token 2FA"
  }
  ```

### Obtener Estado de 2FA

**GET** `/users/2fa/status`

Devuelve el estado de activación de 2FA para el usuario actual.

**Ejemplo de Uso:**
```bash
curl -X GET http://localhost:3000/api/v1/users/2fa/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_acceso>"
```

#### ✅ 200 OK - Estado de 2FA Obtenido

- **Content-Type:** `application/json`
- **Descripción:** Estado de activación de 2FA
- **Ejemplo:**

  ```json
  {
    "twofa_enabled": true
  }
  ```

#### ❌ 401 No Autorizado

- **Content-Type:** `application/json`
- **Descripción:** No autorizado
- **Ejemplo:**

  ```json
  {
    "message": "No autorizado"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error al obtener estado de 2FA
- **Ejemplo:**

  ```json
  {
    "message": "Error al obtener estado de 2FA"
  }
  ```

### Desactivar 2FA

**POST** `/users/2fa/disable`

Desactiva 2FA para el usuario actual.

**Cuerpo de la Solicitud:**
```json
{
  "password": "string",
  "totpToken": "string"
}
```

**Ejemplo de Uso:**
```bash
curl -X POST http://localhost:3000/api/v1/users/2fa/disable \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_acceso>" \
  -d '{
    "password": "contrasenaSegura123",
    "totpToken": "123456"
  }'
```

#### ✅ 200 OK - 2FA Desactivado

- **Content-Type:** `application/json`
- **Descripción:** 2FA desactivado exitosamente
- **Ejemplo:**

  ```json
  {
    "message": "2FA desactivado exitosamente"
  }
  ```

#### ❌ 400 Solicitud Incorrecta - 2FA No Activado

- **Content-Type:** `application/json`
- **Descripción:** 2FA no está activado para este usuario
- **Ejemplo:**

  ```json
  {
    "message": "2FA no está activado"
  }
  ```

#### ❌ 401 No Autorizado - Credenciales Inválidas

- **Content-Type:** `application/json`
- **Descripción:** Contraseña o token inválido
- **Ejemplo:**

  ```json
  {
    "message": "Contraseña o token inválido"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error al desactivar 2FA
- **Ejemplo:**

  ```json
  {
    "message": "Error al desactivar 2FA"
  }
  ```

## Autenticación OAuth de GitHub

### Resumen de Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/github/auth` | Obtiene el token de acceso de GitHub utilizando el código de autorización |
| GET | `/header` | Obtiene el encabezado de autorización de la solicitud |

### Autenticación GitHub

**GET** `/github/auth`

Obtiene el token de acceso de GitHub utilizando el código de autorización del flujo OAuth.

**Parámetros de Consulta:**
- `code` (requerido): Código de autorización obtenido del flujo OAuth de GitHub

**Ejemplo de Uso:**
```bash
curl -X GET "http://localhost:3000/api/v1/github/auth?code=codigo_autorizacion_aqui" \
  -H "Content-Type: application/json"
```

#### ✅ 200 OK - Token de GitHub Obtenido

- **Content-Type:** `application/json`
- **Descripción:** Token de acceso de GitHub obtenido exitosamente
- **Ejemplo:**

  ```json
  {
    "access_token": "ghp_xxxxxxxxxxxxxxxxxxxxxxxx",
    "token_type": "bearer"
  }
  ```

#### ❌ 400 Solicitud Incorrecta - Falta Código

- **Content-Type:** `application/json`
- **Descripción:** No se proporcionó código de autorización
- **Ejemplo:**

  ```json
  {
    "message": "Se requiere código de autorización"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error al obtener token de GitHub
- **Ejemplo:**

  ```json
  {
    "message": "Error al obtener token de GitHub"
  }
  ```

### Obtener Encabezado

**GET** `/header`

Obtiene el encabezado de autorización de la solicitud.

**Ejemplo de Uso:**
```bash
curl -X GET http://localhost:3000/api/v1/header \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_acceso>"
```

#### ✅ 200 OK - Encabezado de Autorización Obtenido

- **Content-Type:** `application/json`
- **Descripción:** Encabezado de autorización obtenido exitosamente
- **Ejemplo:**

  ```json
  {
    "authorizationHeader": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### ❌ 401 No Autorizado - Sin Encabezado de Autorización

- **Content-Type:** `application/json`
- **Descripción:** No se proporcionó encabezado de autorización
- **Ejemplo:**

  ```json
  {
    "message": "No se proporcionó encabezado de autorización"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error interno del servidor al obtener el encabezado
- **Ejemplo:**

  ```json
  {
    "message": "Error al obtener encabezado de autorización"
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
