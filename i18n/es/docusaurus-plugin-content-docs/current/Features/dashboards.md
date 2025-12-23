---
sidebar_position: 7
tags:
  - status
  - dashboards
  - visualización
  - monitoreo
keywords:
  - dashboards
  - visualización
  - monitoreo
  - métricas
  - Grafana
  - paneles
  - gráficos
  - tiempo real
  - alertas
  - STATUS
  - dashboards de cumplimiento
authors:
  - name: "Equipo STATUS"
    title: "Colaboradores del Proyecto"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Dashboards

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

Los dashboards proporcionan capacidades poderosas de visualización para monitorear métricas de cumplimiento, la salud del sistema e indicadores clave de rendimiento. Esta sección le guiará a través de entender, crear y gestionar dashboards.

## Visión General

Los dashboards de STATUS, impulsados por Grafana, permiten:

- **Visualizar Datos**: Crear gráficos, tablas y tableros
- **Monitorear en Tiempo Real**: Ver el estado de cumplimiento en tiempo real
- **Configurar Alertas**: Configurar alertas para violaciones de cumplimiento
- **Personalizar Disposiciones**: Organizar paneles según sus necesidades
- **Compartir Insights**: Compartir dashboards con miembros del equipo

<div align="center">
![Visión General de Dashboards](/img/dashboards/dashboardOverview.png)
**Figura 1:** *Ejemplo de dashboard de STATUS.*
</div>

<Alert>
Los dashboards se construyen sobre Grafana pero integrados con STATUS para acceso sin problemas y autenticación. No necesita una cuenta separada de Grafana.
</Alert>

## Acceder a Dashboards

Para accedar a dashboards:

1. Navegue a la sección **Dashboards** desde la navegación principal
2. Vea la lista de dashboards disponibles
3. Haga clic en un nombre de dashboard para abrirlo
4. El dashboard se abrirá en una nueva pestaña con la interfaz de Grafana

<div align="center">
![Lista de Dashboards](/img/dashboards/dashboardsList.png)
**Figura 2:** *Vista de lista de dashboards.*
</div>

<Disclaimer>
Algunos dashboards pueden requerir permisos específicos para accedar. Contacte a su administrador si no puede accedar a un dashboard.
</Disclaimer>

## Tipos de Dashboards

STATUS proporciona diferentes tipos de dashboards:

### Dashboards de Cumplimiento

Monitorear el estado general de cumplimiento:

- **Porcentaje de Cumplimiento**: Tasa general de cumplimiento
- **Estado de Controles**: Estado de controles individuales
- **Tendencias a lo Largo del Tiempo**: Tendencias de cumplimiento
- **Desglose por Ámbito**: Cumplimiento por ámbito

### Dashboards del Sistema

Monitorear la salud y el rendimiento del sistema:

- **Estado del Sistema**: Salud general del sistema
- **Métricas de Rendimiento**: Tiempos de respuesta, rendimiento
- **Uso de Recursos**: Uso de CPU, memoria, disco
- **Tasas de Errores**: Frecuencia y tipos de errores

### Dashboards Operacionales

Monitorear métricas operacionales:

- **Estado de Cálculos**: Estado de ejecución de cálculos
- **Salud de Fuentes de Datos**: Estado de fuentes de datos
- **Salud de Integraciones**: Estado de integraciones
- **Resumen de Alertas**: Resumen de alertas activas

<div align="center">
![Tipos de Dashboards](/img/dashboards/dashboardTypes.png)
**Figura 3:** *Diferentes tipos de dashboards.*
</div>

## Crear un Dashboard

Para crear un nuevo dashboard:

1. Navegue a la sección **Dashboards**
2. Haga clic en el botón ***Crear Dashboard***
3. Configure el dashboard:
   - **Nombre**: Nombre descriptivo para el dashboard
   - **Descripción**: Qué muestra el dashboard
   - **Carpeta**: Organice el dashboard en una carpeta
   - **Etiquetas**: Añada etiquetas para búsqueda fácil
4. Haga clic en ***Guardar*** para crear el dashboard

<div align="center">
![Formulario Crear Dashboard](/img/dashboards/createDashboardForm.png)
**Figura 4:** *Formulario de creación de dashboard.*
</div>

### Editor de Dashboard

Después de crear un dashboard, entrará al editor de dashboard:

1. **Añadir Paneles**: Haga clic en ***Añadir*** para añadir nuevos paneles
2. **Configurar Paneles**: Configure consultas, visualizaciones y opciones
3. **Organizar Disposición**: Arrastre y suelte paneles para organizarlos
4. **Establezca Variables**: Cree variables de plantilla para dashboards dinámicos
5. **Guardar Dashboard**: Haga clic en ***Guardar*** para guardar sus cambios

<div align="center">
![Editor de Dashboard](/img/dashboards/dashboardEditor.png)
**Figura 5:** *Interfaz del editor de dashboard.*
</div>

<Disclaimer>
Grafana guarda borradores automáticamente. Asegúrese de guardar su dashboard explícitamente cuando termine para hacerlo disponible para otros.
</Disclaimer>

## Paneles de Dashboard

Los paneles son los bloques de construcción de los dashboards. Cada panel muestra datos de una manera específica.

### Tipos de Paneles

STATUS soporta varios tipos de paneles a través de Grafana:

#### Series Temporales

Visualizar datos a lo largo del tiempo:

- **Casos de Uso**: Tendencias a lo largo del tiempo, datos históricos
- **Características**: Múltiples series, umbrales, anotaciones
- **Personalización**: Colores, estilos de línea, rellenos de área

<div align="center">
![Panel de Series Temporales](/img/dashboards/timeSeriesPanel.png)
**Figura 6:** *Ejemplo de panel de series temporales.*
</div>

#### Indicador

Mostrar valores actuales con umbrales:

- **Casos de Uso**: Estado actual, métricas clave
- **Características**: Umbrales, codificación de colores, min/máx
- **Personalización**: Orientación, etiquetas, marcas de verificación

#### Panel de Estadísticas

Mostrar métricas clave de un vistazo:

- **Casos de Uso**: Números importantes, resúmenes
- **Características**: Despliegue grande, sparklines, codificación de colores
- **Personalización**: Tamaío de fuente, colores, prefijos/sufijos

<div align="center">
![Panel de Estadísticas](/img/dashboards/statPanel.png)
**Figura 7:** *Ejemplo de panel de estadísticas.*
</div>

#### Tabla

Mostrar datos en formato tabular:

- **Casos de Uso**: Datos detallados, múltiples campos
- **Características**: Ordenamiento, filtrado, paginación
- **Personalización**: Anchos de columna, colores, formato

#### Gráfico Circular

Mostrar proporciones y porcentajes:

- **Casos de Uso**: Distribuciones, desgloses
- **Características**: Múltiples categorías, leyendas
- **Personalización**: Colores, etiquetas, tamaío de agujero

<div align="center">
![Panel de Gráfico Circular](/img/dashboards/pieChartPanel.png)
**Figura 8:** *Ejemplo de panel de gráfico circular.*
</div>

#### Mapa de Calor

Mostrar densidad de datos y patrones:

- **Casos de Uso**: Patrones, distribuciones a lo largo del tiempo
- **Características**: Gradientes de color, múltiples ejes
- **Personalización**: Esquemas de color, tamaíos de cubeta

### Añadir un Panel

Para añadir un panel a un dashboard:

1. Abra el dashboard en modo de edición
2. Haga clic en el botón ***Añadir*** en la barra de herramientas superior
3. Seleccione el tipo de panel del selector de paneles
4. El nuevo panel aparecerá en el dashboard

### Configurar un Panel

Para configurar un panel:

1. Haga clic en el título del panel
2. Seleccione ***Editar*** del menú desplegable
3. Configure los ajustes del panel:
   - **Título**: Título del panel
   - **Consultas**: Consultas de datos
   - **Opciones de Visualización**: Opciones específicas del tipo
   - **Umbrales**: Establezca umbrales de advertencia/críticos
   - **Enlaces**: Añada enlaces de profundización
4. Haga clic en ***Aplicar*** para guardar cambios

<div align="center">
![Configuración de Panel](/img/dashboards/panelConfiguration.png)
**Figura 9:** *Diálogo de configuración de panel.*
</div>

<Alert>
Cada tipo de panel tiene opciones de configuración específicas. Refiérase a la documentación de Grafana para opciones detalladas de cada tipo de panel.
</Alert>

## Consultas de Dashboard

Las consultas definen qué datos se muestran en los paneles.

### Tipos de Consultas

Los datos de STATUS se pueden consultar de diferentes maneras:

#### Consultas PostgreSQL

Consultar datos relacionales de PostgreSQL:

```sql
SELECT
  date_trunc('day', created_at) as time,
  COUNT(*) as total,
  SUM(CASE WHEN value = true THEN 1 ELSE 0 END) as passed
FROM computations
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY date_trunc('day', created_at)
ORDER BY time;
```

#### Consultas MongoDB

Consultar datos de documentos de MongoDB:

```javascript
db.computations.aggregate([
  {
    $match: {
      createdAt: { $gte: ISODate("2025-01-01") }
    }
  },
  {
    $group: {
      _id: "$controlId",
      count: { $sum: 1 },
      passed: { $sum: { $cond: ["$value", 1, 0] } }
    }
  }
])
```

#### Consultas de Fuente de Datos de Grafana

Usar STATUS como fuente de datos en Grafana:

1. Añada STATUS como una fuente de datos en Grafana
2. Seleccione la fuente de datos en el editor de consultas del panel
3. Escriba su consulta usando sintaxis SQL o MongoDB
4. Configure el rango de tiempo y otras opciones

<div align="center">
![Editor de Consultas](/img/dashboards/queryEditor.png)
**Figura 10:** *Editor de consultas de Grafana.*
</div>

## Variables de Dashboard

Las variables hacen que los dashboards sean dinámicos y reutilizables.

### Tipos de Variables

#### Variable de Consulta

Poblar variable desde una consulta:

```sql
SELECT DISTINCT catalog_name
FROM catalogs
ORDER BY catalog_name;
```

#### Variable Personalizada

Definir valores de variable manualmente:

- Production
- Staging
- Development

#### Variable de Intervalo

Opciones de intervalo de tiempo:

- 1h, 6h, 12h, 24h, 7d, 30d

#### Variable Constante

Valores fijos para reutilizar:

- Nombre de organización
- Umbrales por defecto

<div align="center">
![Configuración de Variable](/img/dashboards/variableConfiguration.png)
**Figura 11:** *Diálogo de configuración de variable.*
</div>

### Crear una Variable

Para crear una variable:

1. Abra el dashboard en modo de edición
2. Haga clic en ***Configuración del dashboard*** (icono de engranaje)
3. Vaya a la pestaña ***Variables***
4. Haga clic en ***Añadir variable***
5. Configure la variable:
   - **Nombre**: Nombre de variable
   - **Tipo**: Tipo de variable
   - **Consulta/Fuente de Datos**: Consulta o valores personalizados
   - **Opciones de Selección**: Selección múltiple, opción de incluir todo
6. Haga clic en ***Actualizar*** para guardar variable

<Disclaimer>
Las variables se referencian en consultas como `$nombre_variable`. Asegúrese de usar la sintaxis correcta en sus consultas.
</Disclaimer>

## Alertas de Dashboard

Las alertas le notifican cuando se cumplen condiciones específicas.

### Tipos de Alertas

#### Alertas de Umbrales

Alertar cuando los valores exceden umbrales:

- **Advertencia**: El valor excede el umbral de advertencia
- **Crítico**: El valor excede el umbral crítico
- **OK**: El valor vuelve al rango normal

#### Alertas de Sin Datos

Alertar cuando no se reciben datos:

- **Sin Datos**: No hay datos para el período de tiempo especificado
- **OK**: La recepción de datos se reanuda

#### Alertas de Consulta

Alertas basadas en condiciones de consulta:

- Condiciones personalizadas usando resultados de consulta
- Lógica compleja con múltiples condiciones

<div align="center">
![Configuración de Alerta](/img/dashboards/alertConfiguration.png)
**Figura 12:** *Panel de configuración de alerta.*
</div>

### Crear una Alerta

Para crear una alerta en un panel:

1. Abra el dashboard en modo de edición
2. Haga clic en un panel y seleccione ***Editar***
3. Vaya a la pestaña ***Alerta***
4. Configure la alerta:
   - **Nombre de Regla**: Nombre de alerta
   - **Condición**: Condición de alerta (consulta, umbrales)
   - **Frecuencia**: Con qué frecuencia evaluar
   - **Estado Sin Datos**: Qué hacer cuando no hay datos
   - **Canales de Notificación**: Dónde enviar notificaciones
5. Haga clic en ***Aplicar*** para guardar alerta

### Canales de Notificación

STATUS soporta varios canales de notificación:

- **Correo Electrónico**: Enviar alertas vía correo electrónico
- **Slack**: Enviar alertas a canales de Slack
- **Webhook**: Enviar alertas a URLs de webhook
- **Personalizado**: Integraciones de notificación personalizadas

<Alert>
Los canales de notificación deben configurarse en Grafana. Contacte a su administrador si necesita configurar nuevos canales de notificación.
</Alert>

## Gestionar Dashboards

Una vez creados, puede gestionar sus dashboards:

### Editar un Dashboard

Para editar un dashboard:

1. Navegue a la sección **Dashboards**
2. Haga clic en el dashboard para abrirlo
3. Haga clic en ***Editar*** (icono de engranaje) para entrar en modo de edición
4. Haga sus cambios
5. Haga clic en ***Guardar*** para guardar cambios

### Duplicar un Dashboard

Para duplicar un dashboard:

1. Navegue a la sección **Dashboards**
2. Haga clic en el dashboard para abrirlo
3. Haga clic en ***Compartir*** (icono de compartir)
4. Seleccione ***Guardar como***
5. Introduzca el nuevo nombre del dashboard
6. Haga clic en ***Guardar***

### Eliminar un Dashboard

Para eliminar un dashboard:

1. Navegue a la sección **Dashboards**
2. Haga clic en el dashboard para abrirlo
3. Haga clic en ***Configuración del dashboard*** (icono de engranaje)
4. Haga clic en ***Eliminar dashboard***
5. Confirme la eliminación

<Disclaimer>
Eliminar un dashboard no se puede deshacer. Asegúrese de haber exportado una copia si podría necesitarla más adelante.
</Disclaimer>

### Exportar un Dashboard

Para exportar un dashboard:

1. Navegue a la sección **Dashboards**
2. Haga clic en el dashboard para abrirlo
3. Haga clic en ***Compartir*** (icono de compartir)
4. Seleccione ***Exportar***
5. Elija el formato de exportación (JSON, etc.)
6. Descargue el archivo

### Importar un Dashboard

Para importar un dashboard:

1. Navegue a la sección **Dashboards**
2. Haga clic en el botón ***Importar Dashboard***
3. Suba el archivo JSON o pegue el contenido JSON
4. Configure las opciones de importación
5. Haga clic en ***Importar***

<div align="center">
![Importar Dashboard](/img/dashboards/importDashboard.png)
**Figura 13:** *Diálogo de importar dashboard.*
</div>

## Mejores Prácticas

Siga estas mejores prácticas para dashboards eficaces:

1. **Propósito Claro**: Defina un propósito claro para cada dashboard
2. **Público Objetivo**: Diseñe para los usuarios destinados
3. **Optimizar Rendimiento**: Use consultas eficientes y rangos de tiempo apropiados
4. **Usar Variables**: Haga que los dashboards sean reutilizables con variables
5. **Disposición Lógica**: Organice paneles lógicamente (izquierda-derecha, arriba-abajo)
6. **Nomenclatura Consistente**: Use convenciones de nomenclatura consistentes
7. **Documentar Dashboards**: Añada descripciones para dashboards y paneles
8. **Monitorear Alertas**: Revise y actualice alertas regularmente

<Disclaimer>
Los dashboards eficaces requieren un diseño cuidadoso y mantenimiento continuo. Invierta tiempo en entender sus datos y las necesidades de sus usuarios.
</Disclaimer>

## Solución de Problemas

### El Dashboard No Carga

Si un dashboard no está cargando:

1. Verifique la conectividad de red
2. Verifique las conexiones de fuentes de datos
3. Revise la consola del navegador en busca de errores
4. Revise los registros de Grafana
5. Asegúrese de tener los permisos necesarios

### Las Consultas No Funcionan

Si las consultas no están funcionando:

1. Verifique que la sintaxis de consulta sea correcta
2. Verifique que la fuente de datos esté conectada
3. Asegúrese de que los datos existan para el rango de tiempo
4. Revise los registros de ejecución de consultas
5. Pruebe la consulta en el editor de consultas

### Las Alertas No Se Desencadenan

Si las alertas no se están desencadenando:

1. Verifique que las condiciones de alerta sean correctas
2. Verifique que los canales de notificación estén configurados
3. Asegúrese de que las alertas estén habilitadas
4. Revise los registros de evaluación de alertas
5. Pruebe la alerta con evaluación manual

<Alert>
Para problemas complejos, verifique la documentación de Grafana o contacte soporte para asistencia.
</Alert>
