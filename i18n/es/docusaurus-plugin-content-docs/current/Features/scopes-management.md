---
sidebar_position: 8
tags:
  - status
  - ámbitos
  - contexto
  - organización
keywords:
  - ámbitos
  - gestión de ámbitos
  - contexto
  - entorno
  - región
  - contexto de cumplimiento
  - multi-entorno
  - STATUS
  - definiciones de ámbito
authors:
  - name: "Equipo STATUS"
    title: "Colaboradores del Proyecto"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Gestión de Ámbitos

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

La Gestión de Ámbitos permite definenir y gestionar límites de ámbito para la verificación de cumplimiento. Esta sección le guiará a través de entender, crear y gestionar ámbitos.

## Visión General

Los ámbitos proporcionan contexto para la verificación de cumplimiento, permitiéndole:

- **Multi-Entorno**: Verificar el cumplimiento a través de diferentes entornos
- **Estructura Organizacional**: Alinearse ámbitos con unidades organizacionales
- **Límites Geográficos**: Definir ámbitos por región o ubicación
- **Definiciones Flexibles**: Crear tipos de ámbito personalizados según sea necesario
- **Agrupación Consistente**: Aupar recursos relacionados

<div align="center">
![Visión General de Ámbitos](/img/scopes/scopesOverview.png)
**Figura 1:** *Concepto y uso de ámbitos.*
</div>

<Alert>
Los ámbitos permiten verificar el mismo control a través de diferentes contextos. Por ejemplo, verificar la política de contraseñas para tanto entornos de producción como de staging por separado.
</Alert>

## Conceptos de Ámbitos

### Qué son los Ámbitos?

Los ámbitos son pares clave-valor que definen el contexto para la verificación de cumplimiento:

- **Clave**: La dimensión del ámbito (ej. entorno, región)
- **Valor**: El valor específico para esa dimensión (ej. producción, us-east-1)

Un control puede tener múltiples ámbitos, y los cálculos se ejecutan para cada combinación única de valores de ámbito.

### Ejemplo de Ámbito

Considere un control con los siguientes ámbitos:

```json
{
  "environment": "production",
  "region": "us-east-1",
  "cloud-provider": "aws",
  "criticality": "high"
}
```

Este control se verificará para el entorno de producción en la región US East en AWS con alta criticalidad.

<div align="center">
![Ejemplo de Ámbito](/img/scopes/scopeExample.png)
**Figura 2:** *Ámbito con múltiples dimensiones.*
</div>

### Combinaciones de Ámbitos

Múltiples valores de ámbito crean combinaciones para verificación:

| Entorno | Región | Combinaciones |
|-------------|---------|---------------|
| production  | us-east-1 | 1 |
| production  | eu-west-1 | 1 |
| staging      | us-east-1 | 1 |
| staging      | eu-west-1 | 1 |
| **Total**    |         | **4** |

Con 2 entornos y 2 regiones, hay 4 combinaciones únicas, resultando en 4 cálculos separados para el control.

## Tipos de Ámbitos Predefinidos

STATUS proporciona varios tipos de ámbitos predefinidos comúnmente usados en la verificación de cumplimiento:

### Entorno

Entornos comunes en el desarrollo de software:

- **production**: Sistemas de producción/en vivo
- **staging**: Entorno de pre-producción/pruebas
- **development**: Entorno de desarrollo
- **testing**: Entorno de pruebas dedicado

<div align="center">
![Ámbito de Entorno](/img/scopes/environmentScope.png)
**Figura 3:** *Valores de ámbito de entorno.*
</div>

### Región

Regiones geográficas para sistemas distribuidos:

- **us-east-1**: US Este (N. Virginia)
- **us-west-2**: US Oeste (Oregón)
- **eu-west-1**: UE (Irlanda)
- **eu-central-1**: UE (Fráncfort)
- **ap-southeast-1**: Asia Pacífico (Singapur)

### Proveedor de Nube

Proveedores de servicios en la nube:

- **aws**: Amazon Web Services
- **gcp**: Google Cloud Platform
- **azure**: Microsoft Azure
- **on-premise**: Infraestructura en sitio

### Criticalidad

Niveles de criticalidad del sistema:

- **high**: Sistemas críticos
- **medium**: Sistemas importantes
- **low**: Sistemas no críticos

<div align="center">
![Ámbitos Comunes](/img/scopes/commonScopes.png)
**Figura 4:** *Tipos de ámbitos predefinidos comunes.*
</div>

## Gestionar Definiciones de Ámbitos

Las definiciones de ámbito definen qué tipos de ámbito están disponibles y sus valores.

### Ver Definiciones de Ámbitos

Para ver las definiciones de ámbito:

1. Navegue a la sección **Ámbitos** desde la navegación principal
2. Vea la lista de definiciones de ámbito:
   - **Nombre**: Nombre de dimensión de ámbito
   - **Descripción**: Qué representa este ámbito
   - **Tipo**: Tipo de ámbito
   - **Por Defecto**: Valor por defecto (si hay alguno)
   - **Creado En**: Cuándo se creó el ámbito

<div align="center">
![Lista de Definiciones de Ámbitos](/img/scopes/scopeDefinitionsList.png)
**Figura 5:** *Vista de lista de definiciones de ámbito.*
</div>

### Crear una Definición de Ámbito

Para crear una nueva definición de ámbito:

1. Navegue a la sección **Ámbitos**
2. Haga clic en el botón ***Crear Ámbito***
3. Configure el ámbito:
   - **Nombre**: Nombre de dimensión de ámbito (ej. entorno, región)
   - **Descripción**: Qué representa este ámbito
   - **Tipo**: Tipo de ámbito (texto, selección, etc.)
   - **Por Defecto**: Valor por defecto (opcional)
   - **Valores Disponibles**: Lista de valores disponibles (para tipo de selección)
4. Haga clic en ***Guardar*** para crear el ámbito

<div align="center">
![Formulario Crear Ámbito](/img/scopes/createScopeForm.png)
**Figura 6:** *Formulario de creación de ámbito.*
</div>

<Disclaimer>
Las definiciones de ámbito definen qué tipos de ámbito están disponibles. No asigan ámbitos a controles - eso se hace a nivel de control.
</Disclaimer>

### Editar una Definición de Ámbito

Para editar una definición de ámbito:

1. Navegue a la sección **Ámbitos**
2. Haga clic en el botón ***Editar*** junto al ámbito
3. Haga sus cambios
4. Haga clic en ***Guardar*** para actualizar

<Alert>
Editar una definición de ámbito afecta a todos los controles que usan este tipo de ámbito. Sea cuidadoso al cambiar valores disponibles.
</Alert>

### Eliminar una Definición de Ámbito

Para eliminar una definición de ámbito:

1. Navegue a la sección **Ámbitos**
2. Haga clic en el botón ***Eliminar*** junto al ámbito
3. Confirme la eliminación

<Disclaimer>
No puede eliminar una definición de ámbito que esté siendo usada por ningún control. Elimínela primero de los controles.
</Disclaimer>

## Usar Ámbitos en Controles

Los ámbitos se asignan a controles para definenir el contexto para la verificación de cumplimiento.

### Añadir Ámbitos a un Control

Para añadir ámbitos a un control:

1. Navegue a una página de **Detalles de Control**
2. Encuentre la sección **Ámbitos***
3. Haga clic en el botón ***Editar*** junto a Ámbitos
4. Seleccione los ámbitos a asignar:
   - **Tipo de Ámbito**: Seleccione la dimensión de ámbito
   - **Valor**: Seleccione el valor para ese ámbito
5. Haga clic en ***Añadir*** para añadir más ámbitos
6. Haga clic en ***Guardar*** para guardar los ámbitos

<div align="center">
![Añadir Ámbitos a Control](/img/scopes/addScopesToControl.png)
**Figura 7:** *Formulario para añadir ámbitos a control.*
</div>

### Actualizar Ámbitos de Control

Para actualizar los ámbitos de un control:

1. Navegue a una página de **Detalles de Control**
2. Haga clic en el botón ***Editar*** junto a Ámbitos
3. Añada, elimine o modifique ámbitos
4. Haga clic en ***Guardar*** para actualizar

<Alert>
Actualizar ámbitos en un control creará nuevos cálculos para las nuevas combinaciones de ámbitos. Los cálculos existentes se conservarán para análisis histórico.
</Alert>

### Eliminar un Ámbito de Control

Para eliminar un ámbito de un control:

1. Navegue a una página de **Detalles de Control**
2. Haga clic en el botón ***Editar*** junto a Ámbitos
3. Haga clic en el botón ***X*** junto al ámbito a eliminar
4. Haga clic en ***Guardar***

<Disclaimer>
Eliminar un ámbito de un control no elimina los cálculos existentes. Se mantienen disponibles para análisis histórico.
</Disclaimer>

## Ver Cálculos con Ámbitos

Los ámbitos afectan cómo se ejecutan y muestran los cálculos.

### Resultados de Cálculo por Ámbito

Los resultados de cálculo muestran el ámbito para cada cálculo:

- **Índice**: Número secuencial (clicleable para detalles)
- **Resultado**: Estado de aprobado/rechazado
- **Ámbito**: El contexto de ámbito para el cálculo
- **Desde**: Hora de inicio del período de cálculo

<div align="center">
![Cálculos con Ámbitos](/img/scopes/scopedComputations.png)
**Figura 8:** *Resultados de cálculo mostrando ámbito.*
</div>

### Filtrar por Ámbito

Puede filtrar resultados de cálculo por ámbito:

1. Navegue a una página de **Detalles de Control**
2. En la sección **Resultados de Cálculo***
3. Use la funcionalidad de búsqueda/filtro
4. Filtre por valores de ámbito (ej. "environment:production")

### Estado de Cumplimiento por Ámbito

El estado de cumplimiento puede verse por ámbito:

- **Cumplimiento General**: Cumplimiento a través de todos los ámbitos
- **Cumplimiento Específico de Ámbito**: Cumplimiento para cada valor de ámbito
- **Combinaciones de Ámbito**: Cumplimiento para cada combinación única

<div align="center">
![Cumplimiento por Ámbito](/img/scopes/complianceByScope.png)
**Figura 9:** *Desglose del estado de cumplimiento por ámbito.*
</div>

## Mejores Prácticas de Ámbitos

Siga estas mejores prácticas para una gestión de ámbitos eficaz:

1. **Dimensiones Lógicas**: Use dimensiones que se alineen con su organización
2. **Nomenclatura Consistente**: Use convenciones de nomenclatura consistentes para ámbitos
3. **Minimizar Combinaciones**: Sea cuidadoso con demasiadas dimensiones de ámbito (explosión combinatoria)
4. **Valores Por Defecto**: Establezca valores por defecto sensatos para tipos de ámbito
5. **Descripciones Claras**: Documente qué representa cada ámbito
6. **Revisión Regular**: Revise y actualice definiciones de ámbito a medida que su organización evoluciona

<Disclaimer>
Más dimensiones de ámbito crean más combinaciones de cálculo. Sea consciente del rendimiento al diseñar su estructura de ámbitos.
</Disclaimer>

### Consejos de Diseño de Ámbitos

Al diseñar ámbitos:

- **Comience Simple**: Comience con 1-2 dimensiones de ámbito
- **Expanda Gradualmente**: Añada más dimensiones según sea necesario
- **Considere el Volumen**: Estime el volumen de cálculo para cada combinación de ámbito
- **Priorice**: Enfoquese primero en las dimensiones de ámbito más importantes
- **Documente**: Documente el propósito y uso de cada ámbito

## Ejemplos de Ámbitos

### Ejemplo 1: Ámbito Simple de Entorno

Un control con solo un ámbito de entorno:

```json
{
  "environment": "production"
}
```

**Combinaciones**: 1 (production)
**Cálculos**: 1 por período

### Ejemplo 2: Entorno y Región

Un control con ámbitos de entorno y región:

```json
{
  "environment": "production",
  "region": "us-east-1"
}
```

**Combinaciones**: 4 (production × us-east-1, us-west-2, eu-west-1, eu-central-1)
**Cálculos**: 4 por período

### Ejemplo 3: Múltiples Dimensiones

Un control con múltiples dimensiones de ámbito:

```json
{
  "environment": "production",
  "region": "us-east-1",
  "cloud-provider": "aws",
  "criticality": "high"
}
```

**Combinaciones**: Potencialmente muchas
**Cálculos**: Muchos por período (úselo con precaución)

<div align="center">
![Complejidad de Ámbitos](/img/scopes/scopeComplexity.png)
**Figura 10:** *Complejidad de ámbito y volumen de cálculo.*
</div>

<Alert>
Sea cuidadoso con demasiadas dimensiones de ámbito. Cada dimensión adicional multiplica el número de cálculos requeridos.
</Alert>

## Solución de Problemas

### Demasiados Cálculos

Si tiene demasiados cálculos:

1. Revise sus dimensiones de ámbito
2. Reduzca el número de valores de ámbito
3. Elimine ámbitos innecesarios de los controles
4. Aumente el período de cálculo

### El Ámbito No Funciona

Si un ámbito no está funcionando como se esperaba:

1. Verifique que la definición de ámbito existe
2. Verifique que los valores de ámbito sean correctos
3. Asegúrese de que el ámbito esté asignado al control
4. Revise los registros de cálculo en busca de errores

### No Puede Eliminar el Ámbito

Si no puede eliminar un ámbito:

1. Verifique qué controles usan este ámbito
2. Elimine el ámbito de esos controles primero
3. Intente eliminar la definición de ámbito nuevamente

<Disclaimer>
Para problemas complejos de ámbito, revise los registros de cálculo o contacte soporte para asistencia.
</Disclaimer>
