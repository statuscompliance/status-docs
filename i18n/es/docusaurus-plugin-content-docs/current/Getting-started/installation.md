# Instalación

## ⚙ Desplegando STATUS localmente con Docker.

:::caution
STATUS se encuentra en una versión de preproducción, por lo que la configuración de la infraestructura se está utilizando actualmente para probar la generación y descripción de mashups de IA.
:::

### Requisitos previos para la instalación

Antes de comenzar con la instalación es necesario instalar las siguientes herramientas:

- Docker: Puedes encontrar la guía de instalación para tu sistema operativo [aquí](https://docs.docker.com/get-docker/).

- Docker-compose: Puede encontrar la guía de instalación para su sistema operativo [aquí](https://docs.docker.com/compose/install/).

:::info
Esta instalación incluye un fichero `.env.deploy` que debe ser rellenado parcialmente por el usuario. Para poder utilizar la aplicación correctamente, es necesario introducir este archivo .env:

- Clave API OpenAI
- OrgID de OpenAI
- Github Client Secret
  :::

### Guía de instalación para Windows

1. Abre Git Bash o tu terminal preferido en Windows.

2. Clona el repositorio de GitHub con el siguiente comando:
   ```bash
   git clone https://github.com/statuscompliance/infraestructure
   ```
3. Busca la carpeta `infraestructure` o ejecuta:
   ```bash
   cd .\infraestructure
   ```
4. Ejecuta el script de instalación:
   ```bash
   .\setup.bat
   ```

### Guía de instalación para MacOS/Linux

1. Abra un terminal.

2. Clona el repositorio de GitHub ejecutando el siguiente comando:

   ```bash
   git clone https://github.com/statuscompliance/infraestructure
   ```

3. Cambia al directorio recién clonado:

   ```bash
   cd infraestructure
   ```

4. Concede permisos de ejecución al script `setup.sh`:

   ```bash
   chmod +x setup.sh
   ```

5. Ejecuta el script setup:
   ```bash
   ./setup.sh
   ```
