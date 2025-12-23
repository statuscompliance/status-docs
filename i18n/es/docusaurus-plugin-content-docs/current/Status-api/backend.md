# API del Backend

La API del Backend de STATUS proporciona la funcionalidad principal para la gestión de datos y la lógica de negocio.

## Descripción General

La API del backend gestiona el almacenamiento y recuperación de datos, el procesamiento de lógica de negocio, la autenticación y autorización, y la integración con servicios externos.

## Autenticación

Todos los endpoints del backend requieren autenticación JWT mediante token Bearer:

```
Authorization: Bearer <jwt-token>
```

## Principal

### Obtener Perfil de Usuario

**GET** `/api/users/profile`

Recupera la información del perfil del usuario autenticado.

**Respuesta (200 OK):**
```json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "authority": "USER"
}
```

### Actualizar Perfil de Usuario

**PATCH** `/api/users/profile`

Actualiza la información del perfil del usuario autenticado.

**Cuerpo de la Solicitud:**
```json
{
  "email": "string"
}
```

**Respuesta (200 OK):**
```json
{
  "message": "Profile updated successfully"
}
```

## Notas

- Todos los endpoints tienen como prefijo el `API_PREFIX` configurado en las variables de entorno
- La autenticación es requerida para todas las rutas protegidas
- Es posible que se aplique limitación de velocidad a ciertos endpoints
