# Configuración

Una vez instalado el sistema y añadidas las variables de entorno al fichero `.env.deploy`, puedes empezar a configurar el sistema para empezar a usarlo.

:::info
Actualmente, el sistema está pensado para ser probado por **administradores** del sistema. En futuras versiones, el uso se extenderá a otros roles.
:::

1. **Acceder a la documentación:**
   Vaya a `http://localhost:3001/docs` y regístrese como usuario utilizando el endpoint Sign Up.
   <p align="center">
   <img src="\img\swagger.png" alt="portada" width="80%" height="80%"/>
   Figura 1. Documentación de la API Documentación de la API
   </p>

2. **Comprobar usuarios registrados:**
   Recupera tu nombre de usuario y contraseña encriptada de la lista de usuarios registrados.

3. **Editar archivo de configuración:**
   Navegue hasta el directorio `./node-red` creado durante la instalación del sistema y abra el archivo `settings.js`. Introduzca su nombre de usuario y contraseña en la siguiente sección:

   ```javascript
    ...
    httpNodeAuth: {user:"USERNAME",pass:"HASHED_PASSWORD"},
    adminAuth: {
        type: "credentials",
        users: [{
            username: "USERNAME",
            password: "HASHED_PASSWORD",
            permissions: "*"
        }]
    },
    ...
   ```

4. **Empezar a utilizar STATUS:**
   ¡Comience a utilizar el sistema!

Siguiendo estos pasos, podrás configurar y empezar a utilizar el sistema eficazmente. Para cualquier problema o configuración adicional, consulte la documentación del sistema o póngase en contacto con el [equipo de asistencia](https://github.com/orgs/statuscompliance/people).
