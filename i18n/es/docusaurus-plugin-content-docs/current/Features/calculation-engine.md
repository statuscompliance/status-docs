---
sidebar_position: 3
tags:
  - status
  - cumplimiento
  - cálculo
  - motor
  - métricas
keywords:
  - cálculo de cumplimiento
  - motor de cálculo
  - puntos de garantía
  - ventanas de tiempo
  - procesamiento de evidencia
  - agregación de métricas
  - puntuaciones de cumplimiento
  - evaluación de umbrales
  - ventanas móviles
  - ventanas fijas
  - recopilación de datos
  - validación de datos
  - STATUS
  - arquitectura del motor de cálculo
authors:
  - name: "Equipo STATUS"
    title: "Colaboradores del Proyecto"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Motor de Cálculo de Cumplimiento

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

El Motor de Cálculo de Cumplimiento es el componente central de STATUS que procesa evidencia de cálculos para generar métricas de cumplimiento y puntos de garantía con análisis basado en tiempo. Esta sección le guiará a través de entender cómo funciona el motor y cómo interpretar los resultados de cálculo.

<Alert>
El Motor de Cálculo se ejecuta automáticamente basado en las definiciones de sus controles y programación. Asegúrese de que sus fuentes de datos estén configuradas correctamente para asegurar cálculos precisos.
</Alert>

## Visión General

El Motor de Cálculo de Cumplimiento es responsable de:

- Procesar evidencia de cálculos de fuentes de datos
- Calcular el estado de cumplimiento basado en reglas de control definidas
- Generar puntos de garantía para la verificación de cumplimiento
- Gestionar ventanas de tiempo para análisis histórico
- Proporcionar métricas para visualización e informes

<div align="center">
![Flujo del Motor de Cálculo](/img/calculation/engineFlow.png)
**Figura 1:** *Flujo de datos del Motor de Cálculo.*
</div>

## Cálculo de Métricas de Cumplimiento

El motor procesa evidencia de cálculos para determinar el estado de cumplimiento para cada control.

### Procesamiento de Evidencia

Cuando se ejecuta un cálculo, el motor:

1. **Recopila Evidencia**: Recupera evidencia de fuentes de datos configuradas
2. **Valida Datos**: Verifica la integridad y completitud de los datos
3. **Aplica Reglas**: Procesa evidencia a través de reglas definidas por el control
4. **Calcula Resultado**: Determina el estado de aprobado/rechazado para el control
5. **Almacena Resultado**: Persiste el cálculo con toda la metainformación relevante

<Disclaimer>
Los resultados de cálculo solo se generan cuando toda la evidencia requerida está disponible. Si falta alguna evidencia requerida, el cálculo fallará.
</Disclaimer>

### Agregación de Métricas

El motor puede agregar múltiples resultados de cálculo en métricas integrales:

- **Métricas a Nivel de Control**: Estado de cumplimiento de controles individuales
- **Métricas a Nivel de Ámbito**: Cumplimiento por definiciones de ámbito
- **Métricas a Nivel de Catálogo**: Cumplimiento general para catálogos enteros
- **Métricas por Período de Tiempo**: Tendencias de cumplimiento a lo largo del tiempo

### Cálculo de Puntuación

Las puntuaciones de cumplimiento se calculan basándose en:

- **Tasa de Aprobación**: Porcentaje de cálculos que aprobaron
- **Puntuaciones Ponderadas**: Pesos personalizados para diferentes tipos de evidencia
- **Comparación de Umbrales**: Comparación contra umbrales de cumplimiento definidos
- **Ajustes de Severidad**: Ajustes basados en la severidad del control

## Gestión de Puntos de Garantía

Los puntos de garantía son puntos de datos que verifican el estado de cumplimiento en puntos específicos de tiempo.

### Generación de Puntos

Los puntos de garantía se generan automáticamente cuando:

- Un cálculo se completa con éxito
- Los cálculos basados en tiempo alcanzan su ejecución programada
- Se desencadenan cálculos manuales

Cada punto de garantía contiene:

- **Marca de Tiempo**: Cuándo se ejecutó el cálculo
- **ID de Control**: Referencia al control que se está verificando
- **Resultado**: Estado de aprobado/rechazado
- **Evidencia**: Toda la evidencia utilizada en el cálculo
- **Ámbito**: El contexto de ámbito para el cálculo
- **Metadatos**: Información adicional para rastreo y análisis

<div align="center">
![Estructura de Punto de Garantía](/img/calculation/guaranteePointStructure.png)
**Figura 2:** *Estructura de datos del punto de garantía.*
</div>

### Almacenamiento Temporal

Los puntos de garantía se almacenan con marcas de tiempo precisas para permitir:

- **Análisis Histórico**: Rastrear tendencias de cumplimiento a lo largo del tiempo
- **Ventanas de Tiempo**: Analizar cumplimiento en períodos de tiempo específicos
- **Auditoría**: Verificar el cumplimiento en cualquier punto de tiempo
- **Informes**: Generar informes históricos de cumplimiento

## Ventanas de Tiempo

El motor soporta varias configuraciones de ventanas de tiempo para analizar cumplimiento en diferentes períodos.

### Tipos de Ventanas de Tiempo

#### Ventanas Móviles

Calcule cumplimiento sobre períodos de tiempo móviles que se actualizan continuamente:

- **Diaria Móvil**: Últimas 24 horas
- **Semanal Móvil**: Últimos 7 días
- **Mensual Móvil**: Últimos 30 días
- **Personalizada Móvil**: Número personalizado de días

<div align="center">
![Ejemplo de Ventana Móvil](/img/calculation/rollingWindow.png)
**Figura 3:** *Ejemplo de ventana de tiempo móvil.*
</div>

#### Ventanas Fijas

Analice cumplimiento en rangos de tiempo específicos que no cambian:

- **Diaria**: Días del calendario
- **Semanal**: Semanas del calendario
- **Mensual**: Meses del calendario
- **Personalizada**: Rangos de fecha específicos

<div align="center">
![Ejemplo de Ventana Fija](/img/calculation/fixedWindow.png)
**Figura 4:** *Ejemplo de ventana de tiempo fija.*
</div>

### Períodos de Agregación

Al analizar cumplimiento a lo largo del tiempo, puede agregar datos por:

- **Por Hora**: Útil para monitoreo en tiempo real
- **Diaria**: Período de agregación más común
- **Semanal**: Bueno para análisis de tendencias
- **Mensual**: Adecuado para informes a largo plazo
- **Personalizado**: Defina sus propios períodos de agregación

<Disclaimer>
El período de agregación afecta la granularidad de sus métricas de cumplimiento. Elija períodos más cortos para análisis detallados y períodos más largos para tendencias de alto nivel.
</Disclaimer>

## Ver Resultados de Cálculo

Puede ver resultados de cálculo en la página de Detalles de Control.

### Acceder a Resultados de Cálculo

Para ver resultados de cálculo para un control:

1. Navegue a la sección **Catálogos**
2. Seleccione un catálogo
3. Haga clic en un control para ver sus detalles
4. Desplácese hacia abajo a la sección **Resultados de Cálculo**

<div align="center">
![Tabla de Resultados de Cálculo](/img/calculation/computationResultsTable.png)
**Figura 5:** *Tabla de resultados de cálculo.*
</div>

### Entender Resultados

La tabla de resultados de cálculo muestra:

- **Índice**: Número secuencial para referencia (clicleable para ver detalles)
- **Resultado**: Estado de aprobado/rechazado con indicador visual
- **Ámbito**: El contexto de ámbito para el cálculo
- **Desde**: Hora de inicio del período de cálculo
- **Columnas Adicionales**: Columnas personalizadas basadas en su configuración

<Alert>
Haga clic en el número de Índice para ver información detallada sobre un cálculo, incluyendo toda la evidencia utilizada en el cálculo.
</Alert>

### Filtrado y Búsqueda

La tabla de resultados de cálculo soporta:

- **Búsqueda Global**: Buscar a través de todas las columnas
- **Visibilidad de Columnas**: Mostrar/ocultar columnas específicas
- **Paginación**: Navegar a través de conjuntos grandes de resultados
- **Exportación**: Exportar resultados a varios formatos

## Flujos de Trabajo de Cálculo

El Motor de Cálculo sigue estos flujos para generar métricas de cumplimiento.

### Cálculo Automático

La mayoría de los cálculos se ejecutan automáticamente basado en la configuración de sus controles:

1. **Creación de Programación**: Defina programaciones de cálculo para cada control
2. **Ejecución**: El motor ejecuta cálculos a tiempos programados
3. **Procesamiento**: Se recopila y procesa evidencia
4. **Almacenamiento de Resultado**: Los resultados se almacenan como puntos de garantía
5. **Notificación**: Se envían alertas si el cálculo falla

<Disclaimer>
Asegúrese de que sus flujos de Node-RED estén configurados correctamente para que funcionen los cálculos automáticos.
</Disclaimer>

### Cálculo Manual

Puede desencadenar cálculos manualmente:

1. Navegue a la página de detalles de un control
2. Haga clic en el botón ***Ejecutar Cálculo***
3. Seleccione el ámbito y período de tiempo
4. Espere a que el cálculo se complete
5. Vea los resultados en la tabla de resultados de cálculo

<div align="center">
![Cálculo Manual](/img/calculation/manualComputation.png)
**Figura 6:** *Diálogo de cálculo manual.*
</div>

### Flujo de Recopilación de Datos

El proceso de recopilación de datos involucra:

1. **Conexión de Fuente de Datos**: Conectarse a fuentes de datos configuradas
2. **Recuperación de Evidencia**: Traer evidencia relevante basada en definiciones de control
3. **Validación de Datos**: Verificar integridad y completitud de datos
4. **Transformación**: Transformar datos en el formato requerido
5. **Procesamiento**: Procesar evidencia a través de reglas de control

### Flujo de Validación

Antes de que se realicen los cálculos, el motor valida:

- **Disponibilidad de Fuente de Datos**: Verificar que las fuentes de datos sean accesibles
- **Completitud de Datos**: Asegurar que toda la evidencia requerida esté presente
- **Calidad de Datos**: Verificar anomalías o corrupción de datos
- **Cumplimiento de Esquema**: Verificar que los datos coinciden con el esquema esperado
- **Validez de Tiempo**: Asegurar que las marcas de tiempo estén dentro de rangos válidos

### Flujo de Almacenamiento

Después de cálculos exitosos:

1. **Generación de Resultado**: Crear punto de garantía con result
2. **Adjunto de Metadatos**: Añadir metadatos para rastreo y análisis
3. **Persistencia**: Almacenar en la base de datos apropiada (MongoDB para datos flexibles)
4. **Indexación**: Indexar para consultas rápidas
5. **Actualización de Caché**: Actualizar caché de Redis para acceso rápido

## Consideraciones de Rendimiento

<Disclaimer>
El Motor de Cálculo puede consumir recursos significativos al procesar grandes volúmenes de datos. Considere lo siguiente para un rendimiento óptimo.
</Disclaimer>

### Consejos de Optimización

1. **Ventanas de Tiempo**: Use tamaios de ventana de tiempo apropiados
2. **Indexación**: Asegúrese de que las bases de datos estén correctamente indexadas
3. **Caché**: Aproveche el caché de Redis para datos de acceso frecuente
4. **Programación**: Distribuya programaciones de cálculo para evitar picos de carga
5. **Poda de Datos**: Elimine resultados de cálculo antiguos según sea necesario

### Monitoreo

Monitoree el rendimiento del Motor de Cálculo mediante:

- Verificar tiempos de ejecución de cálculo
- Monitorear tiempos de respuesta de fuentes de datos
- Rastrear el rendimiento de consultas de bases de datos
- Revisar registros de errores regularmente
- Analizar la utilización de recursos

<Alert>
Si experimenta problemas de rendimiento, considere reducir la frecuencia de cálculo u optimizar sus consultas de fuentes de datos.
</Alert>

## Mejores Prácticas

Siga estas mejores prácticas para el uso eficaz del Motor de Cálculo:

1. **Defina Programaciones Claras**: Establezca programaciones de cálculo apropiadas para cada control
2. **Configure Ventanas de Tiempo**: Use ventanas de tiempo que coincidan con sus requisitos de cumplimiento
3. **Monitoree Resultados**: Revise regularmente los resultados de cálculo en busca de anomalías
4. **Maneje Errores**: Configure alertas para cálculos fallidos
5. **Optimice Consultas**: Optimice consultas de fuentes de datos para una recuperación más rápida de evidencia
6. **Limpieza de Datos**: Limpie periódicamente resultados de cálculo antiguos
7. **Documente Flujos de Trabajo**: Documente las definiciones de sus controles y lógica de cálculo

<Disclaimer>
El Motor de Cálculo es un componente poderoso que requiere configuración y monitoreo apropiados. Invierta tiempo en entender sus capacidades y limitaciones para maximizar su efectividad.
</Disclaimer>
