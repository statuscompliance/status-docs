---
sidebar_position: 2
tags:
  - status
  - autenticación
  - autorización
  - seguridad
keywords:
  - auth
  - cuenta
  - gestión de cuenta
  - STATUS
  - crear cuenta
  - iniciar sesión
  - cerrar sesión
  - cambiar información de perfil
  - cambiar contraseña
  - autenticación de dos factores
  - TOTP
  - datos almacenados
  - gestión de sesiones
  - tokens JWT
  - tokens API
  - control de acceso basado en roles
  - RBAC
  - cuentas de servicio
  - seguridad
  - nombre de usuario
  - contraseña
  - autenticación
  - expiración de sesión
  - datos de usuario
  - almacenamiento de credenciales
authors:
  - name: "Equipo STATUS"
    title: "Colaboradores del Proyecto"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Autenticación y Autorización

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

Debido a razones de seguridad, STATUS implementa un sistema integral de gestión de cuentas. Para usar tanto la interfaz de usuario como la API, **debe tener** una cuenta. En esta sección aprenderá todo lo que necesita saber sobre los datos de usuario, gestión de sesiones, autenticación de dos factores, y muchas otras características de seguridad.

## Crear una cuenta

Para crear una cuenta en STATUS, deberá hacer clic en el enlace en el modal de inicio de sesión que dice: ***Registrarse***. Será redirigido a la vista de registro.

<div align="center">
![Formulario de registro](/img/auth/registerModal.png)
**Figura 1:** *Formulario de vista de registro.*
</div>

Una vez ahí, se le pedirá un nombre de usuario, correo electrónico y contraseña. Por favor, introduzca credenciales seguras para proteger sus datos. Una vez que haya creado su cuenta, el sistema mostrará una alerta y será redirigido a la página principal, **conectado** a su nueva cuenta. Si ya tiene una cuenta, puede iniciar sesión haciendo clic en el texto que dice ***Iniciar sesión*** en la parte inferior del formulario de registro.

<Disclaimer>
Su nombre de usuario debe ser único. Recomendamos usar una contraseña con más de 12 caracteres para una mejor seguridad.
</Disclaimer>

## Iniciar Sesión

Lo primero que verá al visitar STATUS es esta vista. Para iniciar sesión, solo necesita introducir su nombre de usuario y contraseña.

<div align="center" id='login-view'>
![Formulario de inicio de sesión](/img/auth/loginModal.png)
**Figura 2:** *Formulario de inicio de sesión.*
</div>

Si todo está bien, iniciará sesión y tendrá acceso al resto del sistema, pero tenga cuidado porque **cerrará sesión automáticamente después de 2 horas**. Si no tiene una cuenta, puede crear una haciendo clic en el texto que dice ***Registrarse*** en la parte inferior del formulario de inicio de sesión.

## Cerrar Sesión

**Cada dos horas su sesión expirará**, lo que significa que se le obligará a iniciar sesión nuevamente. Sin embargo, también puede cerrar sesión por sí mismo. Para hacerlo, vaya a la página principal, haga clic en el icono de perfil ubicado arriba a la derecha. Después, haga clic en el botón que dice ***Cerrar Sesión***.

<div align="center">
![Vista de perfil](/img/auth/profilePage.png)
**Figura 3:** *Vista de perfil.*
</div>

## Cambiar información de perfil

Si desea cambiar sus datos de usuario, puede hacerlo en dos pasos sencillos. Vaya a la página principal y haga clic en el icono de perfil ubicado arriba a la derecha. Verá su nombre de usuario y correo electrónico actuales en campos de texto. Podrá introducir nuevos valores y actualizarlos haciendo clic en el botón ***Actualizar perfil***.

<div align="center">
![Perfil actualizado correctamente](/img/auth/profileUpdateAlert.png)
**Figura 4:** *Perfil actualizado correctamente.*
</div>

<Disclaimer>
Su nombre de usuario debe ser único. STATUS no le permitirá actualizar su nombre de usuario si otro usuario ya tiene ese o si es el mismo que ya tiene.

<div align="center">
![Error de actualización de perfil](/img/auth/profileUpdateAlertError.png)
**Figura 5:** *Perfil no actualizado por errores de validación.*
</div>

</Disclaimer>

## Cambiar contraseña

Cambiar la contraseña es similar a la actualización de información de perfil. También tendrá que ir a la página principal y hacer clic en el icono de perfil arriba a la derecha. Una vez que esté en la vista de perfil, haga clic en el botón ***Cambiar contraseña***. Accederá a otra vista donde podrá introducir su nueva contraseña.

<div align="center">
![Actualizar contraseña](/img/auth/changePasswordScreen.png)
**Figura 6:** *Pantalla de cambio de contraseña.*
</div>

Por favor, use contraseñas seguras para evitar hacking y proteger sus datos. Si cambió de opinión y ya no desea actualizar su contraseña, puede volver a la vista de perfil haciendo clic en el botón ***Volver al perfil***. De lo contrario, introduzca su nueva contraseña y haga clic en ***Actualizar contraseña***.

## Autenticación de Dos Factores (TOTP)

STATUS soporta autenticación opcional de dos factores usando Contraseñas de Un Solo Uso Basadas en Tiempo (TOTP). Esto añade una capa adicional de seguridad a su cuenta.

### Habilitar Autenticación de Dos Factores

Para habilitar TOTP, vaya a su página de perfil y haga clic en el botón ***Autenticación de Dos Factores***. Será redirigido a la pantalla de configuración donde podrá escanear un código QR con su aplicación de autenticación.

<div align="center">
![Configuración TOTP](/img/auth/totpSetupScreen.png)
**Figura 7:** *Pantalla de configuración TOTP con código QR.*
</div>

Una vez que haya escaneado el código QR con su aplicación de autenticación (como Google Authenticator, Authy o Microsoft Authenticator), introduzca el código de 6 dígitos para verificar y habilitar TOTP.

<Disclaimer>
¡Asegúrese de guardar sus códigos de respaldo! Estos códigos son la única forma de recuperar su cuenta si pierde acceso a su aplicación de autenticación.
</Disclaimer>

### Deshabilitar Autenticación de Dos Factores

Para deshabilitar TOTP, vaya a su página de perfil y haga clic en el botón ***Autenticación de Dos Factores***. Necesitará proporcionar un código TOTP para confirmar que desea deshabilitar esta característica de seguridad.

<div align="center">
![Deshabilitar TOTP](/img/auth/totpDisableScreen.png)
**Figura 8:** *Pantalla de confirmación de deshabilitación TOTP.*
</div>

## Control de Acceso Basado en Roles (RBAC)

STATUS implementa un sistema de control de acceso basado en roles para gestionar eficazmente los permisos de usuario. El sistema soporta cuatro roles principales:

### Roles de Usuario

- **USER**: Acceso básico para ver e interactuar con datos de cumplimiento. Los usuarios pueden:
  - Ver catálogos, controles y cálculos
  - Crear y gestionar ámbitos
  - Ver dashboards
  - Realizar operaciones de lectura en datos de cumplimiento

- **DEVELOPER**: Acceso avanzado para tareas de desarrollo e integración. Los desarrolladores pueden:
  - Todos los permisos de USER
  - Crear y gestionar catálogos y controles
  - Configurar fuentes de datos y enlazadores
  - Crear y editar mashups
  - Acceder y usar cuentas de servicio

- **ADMIN**: Privilegios administrativos completos para la configuración del sistema. Los administradores pueden:
  - Todos los permisos de DEVELOPER
  - Gestionar usuarios y cuentas de servicio
  - Configurar ajustes del sistema
  - Acceder a registros del sistema y métricas
  - Realizar operaciones administrativas

<Alert>
Su rol se asigna cuando se crea su cuenta y solo puede ser cambiado por un administrador.
</Alert>

## Cuentas de Servicio

Las cuentas de servicio son cuentas especiales diseñadas para acceso programático e integraciones. Estas cuentas no tienen nombre de usuario y contraseña, pero usan tokens API para autenticación.

### Crear una Cuenta de Servicio

Para crear una cuenta de servicio, necesita tener rol DEVELOPER o ADMIN. Vaya a la página principal, haga clic en su icono de perfil y seleccione ***Cuentas de Servicio***. Haga clic en el botón ***Crear Cuenta de Servicio***.

<div align="center">
![Crear cuenta de servicio](/img/auth/createServiceAccount.png)
**Figura 9:** *Formulario de creación de cuenta de servicio.*
</div>

Necesitará proporcionar un nombre y selecccionar un rol para la cuenta de servicio. Una vez creada, recibirá un token API.

<Disclaimer>
¡Asegúrese de copiar y guardar su token API inmediatamente! No podrá verlo nuevamente.
</Disclaimer>

### Gestionar Cuentas de Servicio

Puede ver, editar y eliminar sus cuentas de servicio desde la página de Cuentas de Servicio. Cada cuenta de servicio muestra:

- Nombre
- Rol
- Fecha de creación
- Fecha de último uso
- Expiración del token

<div align="center">
![Lista de cuentas de servicio](/img/auth/serviceAccountsList.png)
**Figura 10:** *Lista de cuentas de servicio.*
</div>

## Datos Almacenados

Debido a razones de seguridad, escalabilidad y consistencia, STATUS debe tener usuarios para gestionar sus solicitudes y asegurar el uso correcto de configuraciones de cumplimiento. STATUS almacenará nombre de usuario, correo electrónico, contraseñas hasheadas, secretos TOTP y tokens API. De esta manera, cada usuario tendrá acceso solo a sus datos, y podemos asociar credenciales a sus propietarios para evitar uso no ético.

## Gestión de Sesiones

Como dijimos antes, STATUS requiere autenticación para usar su API e interfaz de usuario. Cuando inicia sesión, recibirá un JWT cifrado con una clave secreta conocida solo por el sistema. Cada token expira después de 2 horas, así que tendrá que renovar su sesión para continuar usando STATUS después de ese tiempo. La interfaz de usuario de STATUS está preparada para gestionar la expiración de sesión, y le redirigirá a la página de inicio de sesión **automáticamente** una vez que detecte que su sesión ha expirado. Entonces, tendrá que iniciar sesión nuevamente para continuar trabajando.

<Disclaimer>
STATUS verifica la fecha de expiración de su token **cada minuto**, lo que puede llevar a algunos errores en casos raros cuando intenta usar la interfaz de usuario antes de que detecte que su sesión ha expirado. En esos casos, recomendendamos recargar la página o cerrar sesión. Sin embargo, estos problemas no son comunes y la **API está preparada** para gestionar este tipo de errores, así que no se asuste.
</Disclaimer>

## Tokens API

En algunos casos, la expiración del token puede ser molesta. Si queremos crear una API o un sistema que use STATUS, gestionar la expiración de sesión puede ser difícil. Aunque recomendendamos hacerlo, podemos crear cuentas especiales (cuentas de servicio) que tengan ***TOKENS SIN EXPIRACIÓN***. Esto solo es posible usando la API de STATUS o creando cuentas de servicio en la interfaz de usuario.

## Mejores Prácticas de Seguridad

Para mantener su cuenta de STATUS segura, siga estas recomendaciones:

1. **Use Contraseñas Fuertes**: Cree contraseñas con al menos 12 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales
2. **Habilite TOTP**: Siempre habilite la autenticación de dos factores para su cuenta
3. **Proteja sus Tokens**: Nunca comparta sus tokens API o contraseñas
4. **Actualizaciones Regulares**: Cambie su contraseña regularmente
5. **Monitoreo de Actividad**: Verifique la actividad de inicio de sesión reciente en su perfil
6. **Conexiones Seguras**: Siempre acceda a STATUS a través de HTTPS

<Alert>
STATUS ***no*** permite recuperación de contraseñas o cuentas si olvidó su contraseña. Si habilitó TOTP y perdió acceso a su aplicación de autenticación sin guardar los códigos de respaldo, tendrá que contactar a un administrador para restablecer su cuenta.
</Alert>
