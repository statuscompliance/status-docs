# Autenticación y Autorización de Usuarios

Autenticación basada en JWT con TOTP opcional, control de acceso basado en roles (USER/DEVELOPER/ADMIN) y mecanismos de renovación de tokens.

## Descripción General

El sistema de autenticación proporciona control de acceso seguro para usuarios con múltiples métodos de autenticación y permisos basados en roles.

## Métodos de Autenticación

### Autenticación basada en JWT
- Autenticación segura basada en tokens
- Expiración y validación de tokens
- Mecanismos de renovación automática de tokens

### Autenticación de Dos Factores (TOTP)
- Soporte opcional de contraseña de un solo uso basada en tiempo (TOTP)
- Seguridad mejorada para operaciones sensibles
- Configuración y gestión sencilla

## Autorización

### Control de Acceso Basado en Roles (RBAC)

El sistema soporta tres roles principales:

- **USER**: Acceso básico para ver e interactuar con datos de cumplimiento
- **DEVELOPER**: Acceso avanzado para tareas de desarrollo e integración
- **ADMIN**: Privilegios administrativos completos para la configuración del sistema

### Gestión de Tokens

- **Tokens de Acceso**: Tokens de corta duración para autenticación de API
- **Tokens de Renovación**: Tokens de larga duración para obtener nuevos tokens de acceso
- **Rotación de Tokens**: Renovación automática de tokens para mantener la seguridad
