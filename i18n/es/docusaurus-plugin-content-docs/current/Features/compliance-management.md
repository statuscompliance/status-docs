---
sidebar_position: 4
tags:
  - status
  - cumplimiento
  - catálogos
  - controles
keywords:
  - gestión de cumplimiento
  - catálogos
  - controles
  - cálculos
  - puntos de garantía
  - estructura jerárquica
  - requisitos de cumplimiento
  - definiciones de control
  - mashups
  - flujos de Node-RED
  - STATUS
  - marco de cumplimiento
authors:
  - name: "Equipo STATUS"
    title: "Colaboradores del Proyecto"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Sistema de Gestión de Cumplimiento

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

El Sistema de Gestión de Cumplimiento proporciona un enfoque estructurado para gestionar los requisitos de cumplimiento a través de una organización jerárquica de catálogos, controles, cálculos y puntos de garantía. Esta sección le guiará a través de entender y gestionar su marco de cumplimiento en STATUS.

## Visión General

El Sistema de Gestión de Cumplimiento permite:

- Organizar requisitos de cumplimiento en una jerarquía basada en catálogos
- Definir y gestionar controles de cumplimiento dentro de catálogos
- Configurar cálculos automáticos usando mashups de Node-RED
- Rastrear puntos de garantía para verificación de cumplimiento
- Monitorear el estado de cumplimiento a través de diferentes ámbitos

<div align="center">
![Jerarquía de Cumplimiento](/img/compliance/complianceHierarchy.png)
**Figura 1:** *Estructura jerárquica de gestión de cumplimiento.*
</div>

<Alert>
Necesita rol DEVELOPER o ADMIN para crear y gestionar catálogos y controles. Los usuarios con rol USER solo pueden ver datos de cumplimiento.
</Alert>

## Catálogos

Los catálogos son contenedores de nivel superior para organizar sus requisitos de cumplimiento. Ayudan a estructurar su marco de cumplimiento lógicamente.

### Crear un Catálogo

Para crear un nuevo catálogo:

1. Navegue a la sección **Catálogos** desde la navegación principal
2. Haga clic en el botón ***Crear Catálogo***
3. Llene los detalles del catálogo:
   - **Nombre**: Un nombre descriptivo para su catálogo
   - **Descripción**: Descripción detallada del propósito del catálogo
   - **Marco**: El marco de cumplimiento que sigue este catálogo (ej. ISO 27001, GDPR, SOC 2)
   - **Versión**: Versión del marco de cumplimiento
4. Haga clic en ***Guardar*** para crear el catálogo

<div align="center">
![Formulario Crear Catálogo](/img/compliance/createCatalogForm.png)
**Figura 2:** *Formulario de creación de catálogo.*
</div>

### Gestionar Catálogos

Una vez creados, puede:

- **Editar Catálogo**: Actualizar información del catálogo
- **Eliminar Catálogo**: Eliminar catálogo y todos sus controles
- **Ver Controles**: Ver todos los controles dentro del catálogo
- **Exportar Catálogo**: Exportar configuración del catálogo
- **Importar Catálogo**: Importar catálogo desde archivo

<Disclaimer>
Al eliminar un catálogo también se eliminarán todos los controles, cálculos y puntos de garantía dentro de él. Esta acción no se puede deshacer.
</Disclaimer>

## Controles

Los controles son reglas y requisitos de cumplimiento específicos dentro de los catálogos. Definen qué necesita ser verificado y cómo.

### Estructura de un Control

Cada control contiene:

- **Información Básica**: Nombre, descripción y documentación
- **Período**: Con qué frecuencia se debe verificar el cumplimiento (POR HORA, DIARIO, SEMANAL, MENSUAL)
- **Duración**: Fechas de inicio y fin para la validez del control
- **Parámetros**: Parámetros de configuración para el control
- **Ámbitos**: Definiciones de ámbito para contexto específico de cumplimiento
- **ID de Mashup**: Referencia al flujo de Node-RED para el cálculo
- **Tipo de Evidencia**: Tipo de evidencia requerida para verificación

<div align="center">
![Detalles de Control](/img/compliance/controlDetails.png)
**Figura 3:** *Vista de detalles de control.*
</div>

### Crear un Control

Para crear un nuevo control dentro de un catálogo:

1. Navegue al catálogo donde desea añadir el control
2. Haga clic en el botón ***Crear Control***
3. Llene los detalles del control:
   - **Nombre**: Un nombre descriptivo para el control
   - **Descripción**: Descripción detallada del propósito del control
   - **Período**: Seleccione el período de verificación (POR HORA, DIARIO, SEMANAL, MENSUAL)
   - **Fecha de Inicio**: Cuándo el control se vuelve activo
   - **Fecha de Fin**: Cuándo el control expira (opcional)
   - **ID de Mashup**: ID del flujo de Node-RED para el cálculo
   - **Parámetros**: Añada cualquier parámetro requerido
   - **Ámbitos**: Defina contextos de ámbito (ej. entorno: producción, región: us-east-1)
4. Haga clic en ***Guardar*** para crear el control

<div align="center">
![Formulario Crear Control](/img/compliance/createControlForm.png)
**Figura 4:** *Formulario de creación de control.*
</div>

<Disclaimer>
Asegúrese de que el flujo de Node-RED especificado en el ID de Mashup existe y está correctamente configurado. El control fallará al ejecutarse si no se encuentra el mashup.
</Disclaimer>

### Editar un Control

Para editar un control existente:

1. Navegue al catálogo que contiene el control
2. Haga clic en el control para ver sus detalles
3. Haga clic en el botón ***Editar*** en el encabezado del control
4. Haga sus cambios en el formulario
5. Haga clic en ***Guardar*** para actualizar el control

<div align="center">
![Editar Control](/img/compliance/editControl.png)
**Figura 5:** *Formulario de edición de control.*
</div>

### Gestionar Ámbitos de Control

Los ámbitos permiten definir cumplimiento específico de contexto para diferentes entornos, regiones u otras dimensiones.

Para gestionar ámbitos para un control:

1. Navegue a la página de detalles del control
2. Encuentre la sección **Ámbitos***
3. Haga clic en el botón ***Editar*** junto a Ámbitos
4. Añada, elimine o modifique definiciones de ámbito:
   - **entorno**: producción, staging, desarrollo
   - **región**: us-east-1, eu-west-1, etc.
   - **proveedor-nube**: aws, gcp, azure
   - **criticalidad**: alto, medio, bajo
5. Haga clic en ***Guardar*** para actualizar los ámbitos

<div align="center">
![Gestionar Ámbitos](/img/compliance/manageScopes.png)
**Figura 6:** *Gestión de ámbitos de control.*
</div>

<Alert>
Los ámbitos permiten verificar el cumplimiento para diferentes contextos usando el mismo control. Por ejemplo, puede verificar una política de contraseñas tanto para entornos de producción como de staging por separado.
</Alert>

### Ver Flujo de Node-RED

Cada control está vinculado a un flujo de Node-RED que realiza el cálculo:

1. Navegue a la página de detalles del control
2. Haga clic en el enlace ***Ver Flujo de Node-RED***
3. Será redirigido a la interfaz de Node-RED donde podrá ver y editar el flujo

<div align="center">
![Ver Flujo de Node-RED](/img/compliance/viewNodeRedFlow.png)
**Figura 7:** *Enlace para ver flujo de Node-RED.*
</div>

## Cálculos

Los cálculos son cálculos automatizados derivados de controles. Se ejecutan a intervalos programados y generan resultados de cumplimiento.

### Estructura de un Cálculo

Cada cálculo contiene:

- **ID**: Identificador único para el cálculo
- **Grupo de Cálculo**: ID de grupo para cálculos relacionados
- **Valor**: Resultado de aprobado/rechazado del cálculo
- **Ámbito**: El contexto de ámbito para el cálculo
- **Evidencia**: Toda la evidencia utilizada en el cálculo
- **Período**: El período de tiempo cubierto por el cálculo
- **ID de Control**: Referencia al control que lo generó

<div align="center">
![Detalles de Cálculo](/img/compliance/computationDetails.png)
**Figura 8:** *Vista de detalles de cálculo.*
</div>

### Ver Resultados de Cálculo

Para ver resultados de cálculo para un control:

1. Navegue a la página de detalles del control
2. Desplácese hacia abajo a la sección **Resultados de Cálculo***
3. Vea la tabla con todos los cálculos:
   - **Índice**: Número secuencial (clicleable para detalles)
   - **Resultado**: Estado de aprobado/rechazado con indicador visual
   - **Ámbito**: El contexto de ámbito
   - **Desde**: Hora de inicio del período de cálculo
4. Haga clic en un número de índice para ver información detallada del cálculo

<div align="center">
![Tabla de Resultados de Cálculo](/img/compliance/computationResultsTable.png)
**Figura 9:** *Tabla de resultados de cálculo.*
</div>

### Detalles de Cálculo

Cuando hace clic en un cálculo, puede ver:

- **Información Básica**: ID de cálculo, resultado, ámbito
- **Período**: Período de tiempo cubierto
- **Lista de Evidencia**: Toda la evidencia utilizada en el cálculo con:
  - **Clave**: Identificador de evidencia
  - **Valor**: Valor de evidencia
  - **Resultado**: Si esta pieza de evidencia aprobó
  - **Desde/Hasta**: Rango de tiempo para esta evidencia

<div align="center">
![Detalles de Cálculo Expandidos](/img/compliance/computationDetailsExpanded.png)
**Figura 10:** *Vista detallada de cálculo.*
</div>

<Alert>
Cada pieza de evidencia puede aprobar o rechazar independientemente. El resultado general del cálculo se basa en la agregación de todos los resultados de evidencia según la lógica del control.
</Alert>

## Puntos de Garantía

Los puntos de garantía son puntos de datos que verifican el estado de cumplimiento en puntos específicos de tiempo. Se generan por cálculos y se almacenan para análisis histórico.

### Estructura de Punto de Garantía

Cada punto de garantía contiene:

- **Marca de Tiempo**: Cuándo se ejecutó el cálculo
- **ID de Control**: Referencia al control
- **Resultado**: Estado de aprobado/rechazado
- **Evidencia**: Toda la evidencia utilizada
- **Ámbito**: El contexto de ámbito
- **Metadatos**: Información adicional de rastreo

<div align="center">
![Puntos de Garantía](/img/compliance/guaranteePoints.png)
**Figura 11:** *Vista de línea de tiempo de puntos de garantía.*
</div>

### Ver Puntos de Garantía

Los puntos de garantía se almacenan automáticamente cuando se completan los cálculos. Puede:

- Verlos en la página **Detalles de Control*** bajo **Resultados de Cálculo***
- Analizar tendencias a lo largo del tiempo usando **Dashboards de Grafana**
- Consultarlos usando la **API** para análisis personalizado
- Exportarlos para informes externos

## Estado de Cumplimiento

El sistema rastrea el estado general de cumplimiento a diferentes niveles.

### Estado a Nivel de Control

Cada control tiene un estado de cumplimiento basado en sus cálculos recientes:

- **Cumplidor**: Todos los cálculos recientes aprobaron
- **No Cumplidor**: Uno o más cálculos recientes fallaron
- **Pendiente**: No hay cálculos recientes disponibles

<div align="center">
![Estado de Control](/img/compliance/controlStatus.png)
**Figura 12:** *Indicadores de estado de control.*
</div>

### Estado a Nivel de Catálogo

Los catálogos muestran estado de cumplimiento agregado:

- **Total de Controles**: Número de controles en el catálogo
- **Controles Cumplidores**: Controles que actualmente cumplen
- **Controles No Cumplidores**: Controles que actualmente no cumplen
- **Porcentaje General de Cumplimiento**: (Controles Cumplidores / Total de Controles) × 100

<div align="center">
![Estado de Catálogo](/img/compliance/catalogStatus.png)
**Figura 13:** *Visión general de estado de catálogo.*
</div>

### Estado a Nivel de Ámbito

El cumplimiento también se puede ver por ámbito:

- **Específico de Entorno**: Cumplimiento por entorno
- **Específico de Región**: Cumplimiento por región
- **Ámbitos Personalizados**: Cumplimiento basado en sus definiciones de ámbito personalizadas

## Mejores Prácticas

Siga estas mejores prácticas para una gestión de cumplimiento eficaz:

1. **Organización Lógica**: Estructure catálogos lógicamente por marco o unidad de negocio
2. **Nombres Descriptivos**: Use nombres claros y descriptivos para catálogos y controles
3. **Períodos Apropiados**: Establezca períodos de verificación basados en riesgo y requisitos
4. **Definición de Ámbitos**: Defina ámbitos que coincidan con la estructura organizacional
5. **Revisión Regular**: Revise y actualice controles regularmente
6. **Documentación**: Documente propósitos de controles y requisitos de evidencia
7. **Pruebas**: Pruebe flujos de Node-RED antes de vincularlos a controles
8. **Monitoreo**: Revise resultados de cálculo regularmente en busca de anomalías

<Disclaimer>
La gestión de cumplimiento eficaz requiere atención continua. Revise regularmente su estado de cumplimiento y actualice controles a medida que cambian los requisitos.
</Disclaimer>

## Solución de Problemas

### Los Cálculos No Se Ejutan

Si los cálculos no se están ejecutando:

1. Verifique que el **flujo de Node-RED** esté correctamente configurado
2. Verifique que el **ID de Mashup** sea correcto
3. Asegúrese de que las **fuentes de datos** sean accesibles
4. Revise los **registros del sistema** en busca de errores

### Resultados Incorrectos

Si los resultados de cálculo parecen incorrectos:

1. Revise la **lógica del flujo de Node-RED**
2. Verifique que la **recuperación de evidencia** esté funcionando
3. Verifique que los **parámetros de control** sean correctos
4. Valide las **definiciones de ámbito**
5. Examine los **detalles de cálculo** para cada pieza de evidencia

<Alert>
Para problemas complejos, verifique la documentación del Motor de Cálculo o contacte soporte para asistencia.
</Alert>
