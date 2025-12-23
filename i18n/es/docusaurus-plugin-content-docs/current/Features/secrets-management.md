---
sidebar_position: 9
tags:
  - status
  - secretos
  - seguridad
  - credenciales
keywords:
  - gestión de secretos
  - credenciales
  - cifrado
  - datos sensibles
  - claves API
  - contraseñas
  - certificados
  - bóveda
  - seguridad
  - STATUS
  - almacenamiento seguro
authors:
  - name: "Equipo STATUS"
    title: "Colaboradores del Proyecto"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Gestión de Secretos

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

La Gestión de Secretos permite almacenar y gestionar de forma segura informacón sensible como contraseñas, claves API, certificados y otros datos confidenciales. Esta sección le guiará a través de entender y usar las características de gestión de secretos.

## Visión General

STATUS proporciona una bóveda segura de secretos para almacenar datos sensibles:

- **Almacenamiento Cifrado**: Todos los secretos están cifrados en reposo
- **Control de Acceso**: Control de acceso granular para secretos
- **Registros de Auditoría**: Rastrear quién accedió a qué secretos y cuándo
- **Versionamiento de Secretos**: Mantener un rastreo de versiones de secretos e historial
- **Recuperación Segura**: Los secretos se recuperan de forma segura sin exponerlos

<div align="center">
![Gestión de Secretos](/img/secrets/secretsManagement.png)
**Figura 1:** *Arquitectura de gestión de secretos.*
</div>

<Alert>
Los secretos nunca se muestran en texto plano después de la creación. Cuídese de copiar los valores al crear secretos, ya que no podrá verlos nuevamente.
</Alert>

## Crear un Secreto

Para crear un nuevo secreto:

1. Navegue a la sección **Secretos** desde la navegación principal
2. Haga clic en el botón ***Crear Secreto***
3. Llene los detalles del secreto:
   - **Nombre**: Un nombre descriptivo para el secreto
   - **Descripción**: Qué se usa el secreto
   - **Tipo**: Tipo de secreto (Contraseña, Clave API, Certificado, etc.)
   - **Valor**: El valor del secreto (solo se muestra durante la creación)
   - **Ámbito**: Ámbito opcional para organizar secretos
4. Haga clic en ***Guardar*** para crear el secreto

<div align="center">
![Formulario Crear Secreto](/img/secrets/createSecretForm.png)
**Figura 2:** *Formulario de creación de secreto.*
</div>

<Disclaimer>
Asegúrese de copiar el valor del secreto inmediatamente después de la creación. Una vez guardado, el valor no se puede recuperar.
</Disclaimer>

## Ver Secretos

Una vez creados, puede ver sus secretos en la página de Secretos:

- **Nombre**: El nombre del secreto
- **Tipo**: El tipo de secreto (Contraseña, Clave API, etc.)
- **Descripción**: La descripción del secreto
- **Ámbito**: El ámbito al que pertenece el secreto (si hay alguno)
- **Creado En**: Cuándo se creó el secreto
- **Último Uso**: Cuándo se usó el secreto por última vez

<div align="center">
![Lista de Secretos](/img/secrets/secretsList.png)
**Figura 3:** *Vista de lista de secretos.*
</div>

## Tipos de Secretos

STATUS soporta varios tipos de secretos:

### Contraseñas

Secretos simples de contraseñas para autenticación:

- **Casos de Uso**: Contraseñas de bases de datos, cuentas de sistema, cuentas de servicio
- **Seguridad**: Almacenadas con cifrado fuerte
- **Validación**: Validación opcional de fuerza de contraseñas

### Claves API

Claves API para autenticación de servicios externos:

- **Casos de Uso**: Credenciales de proveedores de nube, acceso a APIs de terceros
- **Formato**: Puede ser cualquier formato de cadena
- **Expiración**: Fechas de expiración opcionales

### Certificados

Certificados SSL/TLS y claves:

- **Casos de Uso**: Certificados HTTPS, certificados de cliente
- **Formato**: Se soporta el formato PEM
- **Cadena**: Puede incluir cadenas de certificados

### Claves SSH

Pares de claves SSH para acceso seguro:

- **Casos de Uso**: Acceso a servidores, autenticación Git
- **Formato**: Se soportan formatos incluyendo RSA, ECDSA, Ed25519
- **Frase de Contraseña**: Protección opcional con frase de contraseña

### Personalizado

Tipos de secretos personalizados para necesidades especializadas:

- **Casos de Uso**: Secretos específicos de aplicación
- **Formato**: Cualquier formato que necesite
- **Validación**: Reglas de validación personalizadas

## Gestionar Secretos

Una vez creados, puede gestionar sus secretos:

### Editar un Secreto

Para editar un secreto:

1. Navegue a la sección **Secretos**
2. Haga clic en el botón ***Editar*** junto al secreto
3. Actualice los detalles del secreto (excepto valor)
4. Haga clic en ***Guardar*** para actualizar

<Disclaimer>
No puede ver ni editar el valor del secreto. Para actualizar el valor de un secreto, debe crear una nueva versión.
</Disclaimer>

### Actualizar el Valor de un Secreto

Para actualizar el valor de un secreto:

1. Navegue a la sección **Secretos**
2. Haga clic en el botón ***Actualizar Valor*** junto al secreto
3. Introduzca el nuevo valor
4. Opcionalmente añada una razón para la actualización
5. Haga clic en ***Guardar*** para crear una nueva versión

<div align="center">
![Actualizar Valor de Secreto](/img/secrets/updateSecretValue.png)
**Figura 4:** *Formulario para actualizar valor de secreto.*
</div>

### Eliminar un Secreto

Para eliminar un secreto:

1. Navegue a la sección **Secretos**
2. Haga clic en el botón ***Eliminar*** junto al secreto
3. Confirme la eliminación
4. El secreto se eliminará permanentemente

<Alert>
Eliminar un secreto no se puede deshacer. Asegúrese de tener respaldos o alternativas antes de la eliminación.
</Alert>

## Versionamiento de Secretos

STATUS mantiene un rastreo de versiones de secretos para permitir el historial y la reversión si es necesario.

### Ver Versiones

Para ver el historial de versiones de un secreto:

1. Navegue a la sección **Secretos**
2. Haga clic en el nombre del secreto
3. Vea la lista de todas las versiones:
   - **Número de Versión**: Identificador secuencial de versión
   - **Creado En**: Cuándo se creó esta versión
   - **Creado Por**: Quién creó esta versión
   - **Razón**: Razón de la actualización (si se proporcionó)

<div align="center">
![Versiones de Secreto](/img/secrets/secretVersions.png)
**Figura 5:** *Historial de versiones de secreto.*
</div>

### Reversar una Versión

Para revertir a una versión anterior:

1. Vea el historial de versiones del secreto
2. Haga clic en el botón ***Reversar*** junto a la versión deseada
3. Confirme la reversión
4. La versión anterior se convierte en la versión actual

<Disclaimer>
La reversión crea una nueva versión que copia el valor anterior. El historial de versiones se conserva.
</Disclaimer>

## Control de Acceso

Los secretos están protegidos por control de acceso para asegurar que solo usuarios autorizados puedan acceder a ellos.

### Ámbitos de Secretos

Los secretos se pueden organizar en ámbitos para un mejor control de acceso:

- **Global**: Secretos accesibles por todos los usuarios autorizados
- **Entorno**: Secretos con ámbito a entornos específicos (production, staging, etc.)
- **Servicio**: Secretos con ámbito a servicios específicos
- **Personalizado**: Ámbitos personalizados según sea necesario

### Niveles de Permisión

Diferentes usuarios tienen diferentes niveles de acceso:

- **USER**: Puede ver los secretos a los que tiene acceso
- **DEVELOPER**: Puede crear y actualizar secretos dentro de sus ámbitos
- **ADMIN**: Acceso total a todos los secretos

## Uso de Secretos en STATUS

Los secretos se usan en varias partes de STATUS:

### Fuentes de Datos

Las fuentes de datos pueden referenciar secretos para autenticación:

- **Credenciales de Base de Datos**: Use un secreto para la contraseña de la base de datos
- **Claves API**: Use un secreto para autenticación de API externa
- **Certificados**: Use un secreto para certificados de cliente

<div align="center">
![Secreto en Fuente de Datos](/img/secrets/secretInDatasource.png)
**Figura 6:** *Uso de secretos en configuración de fuente de datos.*
</div>

### Flujos de Node-RED

Los flujos de Node-RED pueden recuperar secretos de forma segura:

- **Credenciales de Flujo**: Use secretos para credenciales de flujo
- **Variables de Entorno**: Use secretos para variables de entorno
- **Recuperación Dinámica**: Recuperar secretos en tiempo de ejecución

### Mashups

Los mashups pueden referenciar secretos para acceso seguro:

- **Autenticación**: Use secretos para autenticación a sistemas externos
- **Datos Cifrados**: Use secretos para cifrado/descifrado

## Características de Seguridad

STATUS implementa múltiples características de seguridad para secretos:

### Cifrado en Reposo

Todos los secretos están cifrados usando cifrado estándar de la industria:

- **Algoritmo**: Cifrado AES-256
- **Gestión de Claves**: Gestión segura de claves
- **Rotación**: Rotación regular de claves

### Cifrado en Tránsito

Los secretos se transmiten de forma segura:

- **TLS**: Todas las comunicaciones usan cifrado TLS
- **Validación de Certificados**: Validación estricta de certificados
- **Canales Seguros**: Canales seguros para la recuperación de secretos

### Registro de Auditoría

Todo el acceso a secretos se registra:

- **Registros de Acceso**: Quién accedió a qué secretos y cuándo
- **Registros de Creación**: Quién creó qué secretos
- **Registros de Actualización**: Quién actualizó qué secretos
- **Registros de Eliminación**: Quién eliminó qué secretos

<div align="center">
![Registros de Auditoría](/img/secrets/auditLogs.png)
**Figura 7:** *Registros de acceso a secretos.*
</div>

### Recuperación Segura

Los secretos se recuperan de forma segura:

- **Sin Visualización**: Los secretos nunca se muestran después de la creación
- **Acceso Temporal**: Los secretos solo están disponibles cuando se necesitan
- **Expiración Automática**: Los tokens de acceso temporal expiran automáticamente
- **Memoria Segura**: Los secretos se almacenan de forma segura en memoria

## Mejores Prácticas

Siga estas mejores prácticas para una gestión de secretos eficaz:

1. **Secretos Únicos**: Use secretos únicos para diferentes propósitos
2. **Contraseñas Fuertes**: Use contraseñas fuertes y complejas
3. **Rotación Regular**: Rote los secretos regularmente
4. **Privilegios Mínimos**: Conceda el mínimo de permisos necesarios
5. **Auditoría Regular**: Revise los registros de auditoría regularmente
6. **Documente el Uso**: Documente para qué se usa cada secreto
7. **Respaldo**: Mantenga respaldos seguros de secretos críticos
8. **Control de Versiones**: Use el versionamiento para rastrear cambios

<Disclaimer>
La gestión eficaz de secretos es crítica para la seguridad. Invierta tiempo en entender las características y seguir las mejores prácticas.
</Disclaimer>

## Solución de Problemas

### El Secreto No Funciona

Si un secreto no está funcionando como se esperaba:

1. Verifique que el valor del secreto sea correcto
2. Verifique que el secreto no haya expirado
3. Asegúrese de que el secreto tenga el ámbito correcto
4. Verifique que el componente referenciante tenga acceso al secreto

### No Puede Acceder al Secreto

Si no puede acceder a un secreto:

1. Verifique que tiene los permisos necesarios
2. Verifique que el secreto esté en un ámbito accesible
3. Asegúrese de que el secreto no haya sido eliminado
4. Contacte a su administrador si cree que debería tener acceso

<Alert>
Si sospecha que un secreto ha sido comprometido, rótelo inmediatamente y revise los registros de auditoría en busca de actividad sospechosa.
</Alert>
