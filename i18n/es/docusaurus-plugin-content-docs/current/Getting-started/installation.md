# Instalación

## ⚙ Desplegando STATUS localmente con Docker.

:::caution
STATUS se encuentra en una versión de preproducción, por lo es normal que algunas partes del sistema contengan errores, si encuentras alguno, por favor repórtalo [aquí](https://github.com/orgs/statuscompliance/discussions/new?category=bugs).
:::

### Requisitos previos para la instalación

Antes de comenzar con la instalación es necesario instalar y (o actualizar si la versión de Docker es inferior a la 1.27.0) las siguientes herramientas:

- Docker: Puedes encontrar la guía de instalación para tu sistema operativo [aquí](https://docs.docker.com/get-docker/).

:::info
Esta instalación incluye un fichero `.env.deploy` que debe ser rellenado parcialmente por el usuario. Para poder utilizar la aplicación correctamente, es necesario introducir este archivo .env:

- Clave API OpenAI
- OrgID de OpenAI
- Github Client Secret

**Si no tienes esta información, no te preocupes, podrás utilizar una parte del sistema.**
:::

### Guía de instalación para Windows

1. Abre Git Bash o tu terminal preferido en Windows.

2. Clona el repositorio de GitHub con el siguiente comando:
   ```bash
   git clone https://github.com/statuscompliance/infrastructure
   ```
3. Busca la carpeta `infrastructure` o ejecuta:
   ```bash
   cd .\infrastructure\Windows\
   ```
4. Ejecuta el script de instalación:
   ```bash
   .\setup.ps1
   ```
5. Introduce la información solicitada (nombre de usuario, contraseña y dirección de correo electrónico que se utilizará en el sistema).
6. Después de que la instalación esté completa, puedes acceder al sistema en `http://localhost:3000`.

### Guía de instalación para MacOS/Linux

1. Abra un terminal.

2. Clona el repositorio de GitHub ejecutando el siguiente comando:

   ```bash
   git clone https://github.com/statuscompliance/infrastructure
   ```

3. Cambia al directorio recién clonado:

   ```bash
   cd infrastructure
   ```

4. Ejecuta el script setup:
   ```bash
   ./setup.sh
   ```
5. Introduce la información solicitada (nombre de usuario, contraseña y dirección de correo electrónico que se utilizará en el sistema).
6. Después de que la instalación esté completa, puedes acceder al sistema en `http://localhost:3000`.
