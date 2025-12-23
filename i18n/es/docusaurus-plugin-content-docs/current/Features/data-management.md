---
sidebar_position: 5
tags:
  - status
  - datos
  - almacenamiento
  - base de datos
keywords:
  - gestión de datos
  - persistencia políglota
  - PostgreSQL
  - MongoDB
  - Redis
  - datos relacionales
  - almacenamiento de documentos
  - caché
  - flujo de datos
  - fuentes de datos
  - vinculación de datos
  - STATUS
  - arquitectura de bases de datos
authors:
  - name: "Equipo STATUS"
    title: "Colaboradores del Proyecto"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Gestión y Almacenamiento de Datos

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

El sistema STATUS emplea una estrategia de persistencia políglota, utilizando múltiples tecnologías de bases de datos optimizadas para diferentes tipos de datos y patrones de acceso. Esta sección le guiará a través de entender cómo se gestionan y almacenan los datos en STATUS.

## Visión General

STATUS usa una arquitectura de múltiples bases de datos para optimizar rendimiento, escalabilidad y flexibilidad:

- **PostgreSQL**: Para datos estructurados y relacionales con garantías ACID
- **MongoDB**: Para datos basados en documentos flexibles con esquemas evolutivos
- **Redis**: Para caché de alta velocidad y datos en tiempo real

<div align="center">
![Arquitectura de Datos](/img/data/dataArchitecture.png)
**Figura 1:** *Arquitectura de persistencia políglota de STATUS.*
</div>

<Alert>
Este enfoque políglota permite que STATUS aproveche las fuerzas de cada tecnología de base de datos mientras mantiene la consistencia e integridad de los datos.
</Alert>

## PostgreSQL

PostgreSQL se usa para datos estructurados y relacionales que requieren consistencia fuerte y capacidades de consulta complejas.

### Características Principales

- **Modelo de Datos Relacionales**: Datos estructurados con relaciones
- **Transacciones ACID**: Fuertes garantías de consistencia de datos
- **Consultas Complejas**: SQL avanzado con joins, agregados y funciones de ventana
- **Integridad de Datos**: Claves foráneas, restricciones y triggers
- **Indexación**: Potentes opciones de indexación para optimización de consultas

### Casos de Uso

PostgreSQL almacena los siguientes tipos de datos:

- **Usuarios**: Cuentas de usuario, perfiles y datos de autenticación
- **Catálogos**: Definiciones de catálogos y metadatos
- **Controles**: Definiciones de controles y configuraciones
- **Ámbitos**: Definiciones de ámbito y mapeos
- **Secretos**: Información sensible cifrada
- **Cuentas de Servicio**: Configuraciones de cuentas de servicio

<div align="center">
![Esquema PostgreSQL](/img/data/postgreSQLSchema.png)
**Figura 2:** *Esquema de base de datos PostgreSQL.*
</div>

### Ejemplo de Estructura de Datos

Una estructura típica de tabla de PostgreSQL para controles:

```sql
CREATE TABLE controls (
  id UUID PRIMARY KEY,
  catalog_id UUID NOT NULL REFERENCES catalogs(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  period VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  mashup_id VARCHAR(255),
  parameters JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

<Disclaimer>
PostgreSQL se elige por su fiabilidad, características avanzadas y fuertes garantías de consistencia. Es ideal para datos que requieren validación estricta de esquema y relaciones complejas.
</Disclaimer>

## MongoDB

MongoDB se usa para datos basados en documentos flexibles que se benefician de esquemas dinámicos y escalabilidad horizontal.

### Características Principales

- **Almacenamiento de Documentos**: Documentos tipo JSON con esquemas flexibles
- **Esquema Dinámico**: Fácil de evolucionar la estructura de datos a lo largo del tiempo
- **Escalabilidad Horizontal**: Escalar a través de múltiples servidores
- **Consultas Ricas**: Potente marco de consultas y agregación
- **Indexación Flexible**: Múltiples opciones de indexación incluyendo geoespaciales

### Casos de Uso

MongoDB almacena los siguientes tipos de datos:

- **Cálculos**: Resultados de cálculo con estructuras de evidencia variables
- **Puntos de Garantía**: Puntos de garantía con metadatos diversos
- **Mashups**: Definiciones de flujos de Node-RED y configuraciones
- **Fuentes de Datos**: Configuraciones de fuentes de datos con ajustes específicos del proveedor
- **Enlazadores**: Configuraciones y resultados de vinculación de datos
- **Carpetas**: Estructuras jerárquicas de carpetas

<div align="center">
![Colecciones MongoDB](/img/data/mongoDBCollections.png)
**Figura 3:** *Colecciones de MongoDB y sus relaciones.*
</div>

### Ejemplo de Estructura de Documento

Un documento típico de MongoDB para un cálculo:

```json
{
  "_id": "60bf2620-1075-4d00-aead-7e57fe811469",
  "computationGroup": "6956b9d1-8b7d-4422-a7d7-cc4f8dba523f",
  "value": true,
  "scope": {
    "country": "Spain",
    "city": "Seville"
  },
  "evidences": [
    {
      "id": "e1",
      "key": "procedure_formally_documented",
      "value": true,
      "result": true,
      "from": "2025-01-01T08:00:00",
      "to": "2025-01-01T17:30:00"
    }
  ],
  "period": {
    "from": "2025-09-18T22:00:00.000Z",
    "to": "2025-09-21T22:00:00.000Z"
  },
  "controlId": "1234",
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

<Disclaimer>
MongoDB es ideal para datos con estructuras variables que pueden cambiar a lo largo del tiempo. Su esquema flexible permite evolucionar su modelo de datos sin migraciones.
</Disclaimer>

## Redis

Redis se usa como almacén de datos en memoria de alto rendimiento para caché, gestión de sesiones y características en tiempo real.

### Características Principales

- **Almacenamiento en Memoria**: Acceso a datos extremadamente rápido
- **Estructuras de Datos**: Cadenas, listas, conjuntos, conjuntos ordenados, hashes, flujos
- **Pub/Sub**: Mensajería en tiempo real y notificaciones
- **Expiración**: Expiración automática de claves
- **Persistencia**: Persistencia opcional en disco para durabilidad

### Casos de Uso

Redis se usa para lo siguiente:

- **Tokens de Autenticación**: Tokens de acceso y refresco JWT
- **Datos de Sesión**: Información de sesión de usuario
- **Caché**: Datos de acceso frecuente para reducir carga de bases de datos
- **Limitación de Tasa**: Limitación de tasa y estrangulación de API
- **Actualizaciones en Tiempo Real**: Pub/sub para notificaciones en tiempo real
- **Datos Temporales**: Datos de corta duración con expiración automática

<div align="center">
![Uso de Redis](/img/data/redisUsage.png)
**Figura 4:** *Patrones de uso de Redis en STATUS.*
</div>

### Ejemplos de Estructura de Datos

Patrones comunes de Redis en STATUS:

```redis
# Token de autenticación con expiración
SET token:abc123 "user_data" EX 7200

# Datos de sesión de usuario
HSET session:xyz456 user_id "123" created_at "2025-01-01"

# Caché de resultados de cálculo
SET cache:computation:789 "result_data" EX 3600

# Contador de limitación de tasa
INCR rate_limit:user:123
EXPIRE rate_limit:user:123 60
```

<Disclaimer>
Redis proporciona tiempos de respuesta de sub-milisegundos, haciéndolo ideal para operaciones críticas de rendimiento. Sin embargo, los datos en Redis no deben considerarse como fuente de verdad - es una capa de caché.
</Disclaimer>

## Flujo de Datos

STATUS orquesta datos a través de estas soluciones de almacenamiento con una clara separación de responsabilidades.

### Ruta de Escritura

Cuando se escriben datos en STATUS:

1. **Validación de Solicitud**: Los datos se validan antes de escribir
2. **Selección de Base de Datos**: Se elige la base de datos apropiada basada en el tipo de datos
3. **Transacción**: Los datos se escriben en una transacción (para PostgreSQL)
4. **Actualización de Caché**: El caché de Redis se actualiza si es aplicable
5. **Confirmación**: La escrita se confirma al cliente

<div align="center">
![Ruta de Escritura](/img/data/writePath.png)
**Figura 5:** *Flujo de escrita de datos.*
</div>

### Ruta de Lectura

Cuando se leen datos de STATUS:

1. **Verificación de Caché**: Redis se verifica primero para datos en caché
2. **Consulta a Base de Datos**: La base de datos apropiada se consulta si hay fallo de caché
3. **Población de Caché**: El resultado se almacena en Redis para solicitudes futuras
4. **Respuesta**: Los datos se devuelven al cliente

<div align="center">
![Ruta de Lectura](/img/data/readPath.png)
**Figura 6:** *Ruta de lectura de datos con caché.*
</div>

<Alert>
Esta estrategia de caché mejora significativamente el rendimiento para datos de acceso frecuente, reduciendo la carga de bases de datos y mejorando los tiempos de respuesta.
</Alert>

### Sincronización

Los cambios se propagan a través de sistemas según sea necesario:

- **Basado en Eventos**: Los cambios desencadenan eventos que actualizan sistemas dependientes
- **Consistencia Eventual**: Algunos datos son eventualmente consistentes para rendimiento
- **Consistencia Fuerte**: Los datos críticos mantienen consistencia fuerte
- **Resolución de Conflictos**: Estrategias para manejar actualizaciones conflictivas

### Respaldo y Recuperación

Cada base de datos tiene su propia estrategia de respaldo y recuperación:

- **PostgreSQL**: Respaldos regulares con recuperación a punto en el tiempo
- **MongoDB**: Instantáneas periódicas y respaldos de oplog
- **Redis**: Persistencia opcional e instantáneas periódicas

## Fuentes de Datos

Las fuentes de datos son configuraciones que permiten que STATUS se conecte a sistemas de datos externos y recupere evidencia para cálculos de cumplimiento.

### Tipos de Fuentes de Datos Soportados

STATUS soporta varios tipos de fuentes de datos:

- **APIs REST**: Endpoints HTTP/REST para datos JSON
- **Bases de Datos**: Bases de datos SQL y NoSQL
- **Sistemas de Archivos**: Sistemas de archivos locales y remotos
- **Servicios de Nube**: Servicios de AWS, GCP, Azure
- **Proveedores Personalizados**: Implementaciones personalizados a través de extensiones

<div align="center">
![Tipos de Fuente de Datos](/img/data/datasourceTypes.png)
**Figura 7:** *Tipos de fuentes de datos soportados.*
</div>

### Crear una Fuente de Datos

Para crear una nueva fuente de datos:

1. Navegue a la sección **Fuentes de Datos**
2. Haga clic en el botón ***Crear Fuente de Datos***
3. Seleccione el tipo de fuente de datos
4. Configure los detalles de conexión:
   - **Nombre**: Nombre descriptivo para la fuente de datos
   - **Tipo**: Tipo de fuente de datos (API REST, Base de Datos, etc.)
   - **Parámetros de Conexión**: Host, puerto, credenciales, etc.
   - **Autenticación**: Método de autenticación y credenciales
   - **Configuración de Consulta**: Detalles de consulta o endpoint de API
5. Haga clic en ***Probar Conexión*** para verificar la configuración
6. Haga clic en ***Guardar*** para crear la fuente de datos

<div align="center">
![Crear Fuente de Datos](/img/data/createDatasource.png)
**Figura 8:** *Formulario de creación de fuente de datos.*
</div>

<Disclaimer>
Las credenciales sensibles como contraseñas y claves API se cifran antes del almacenamiento. Use gestión de secretos para seguridad adicional.
</Disclaimer>

### Gestionar Fuentes de Datos

Una vez creadas, puede:

- **Editar Fuente de Datos**: Actualizar parámetros de conexión
- **Eliminar Fuente de Datos**: Eliminar fuente de datos (no se puede usar en controles)
- **Probar Conexión**: Verificar que la fuente de datos sea accesible
- **Ver Uso**: Ver qué controles usan la fuente de datos
- **Monitorear Estado**: Verificar la salud y disponibilidad de la fuente de datos

## Vinculación de Datos

La vinculación de datos permite correlacionar datos de diferentes fuentes para crear evidencia integral para cálculos de cumplimiento.

### Conceptos de Vinculación

La vinculación de datos funciona mediante:

1. **Definir Fuentes**: Identificar fuentes de datos a vincular
2. **Mapear Claves**: Definir claves para correlación
3. **Transformar Datos**: Aplicar transformaciones según sea necesario
4. **Fusionar Datos**: Combinar datos en una vista unificada

<div align="center">
![Vinculación de Datos](/img/data/dataLinking.png)
**Figura 9:** *Concepto de vinculación de datos.*
</div>

### Crear un Enlazador

Para crear un nuevo enlazador de datos:

1. Navegue a la sección **Fuentes de Datos**
2. Haga clic en la pestaña ***Enlazadores***
3. Haga clic en el botón ***Crear Enlazador***
4. Configure el enlazador:
   - **Nombre**: Nombre descriptivo para el enlazador
   - **Fuentes de Datos de Origen**: Seleccione fuentes de datos a vincular
   - **Claves de Vínculo**: Defina claves para correlación
   - **Transformaciones**: Aplique transformaciones de datos
   - **Esquema de Salida**: Defina la estructura de salida
5. Haga clic en ***Probar Enlazador*** para verificar la configuración
6. Haga clic en ***Guardar*** para crear el enlazador

<div align="center">
![Crear Enlazador](/img/data/createLinker.png)
**Figura 10:** *Formulario de creación de enlazador.*
</div>

## Consideraciones de Rendimiento

<Disclaimer>
La gestión de datos apropiada es crucial para el rendimiento del sistema. Siga estas guías para un rendimiento óptimo.
</Disclaimer>

### Consejos de Optimización

1. **Indexación**: Asegúrese de índices apropiados en campos consultados frecuientemente
2. **Caché**: Aproveche el caché de Redis para datos calientes
3. **Optimización de Consultas**: Optimice consultas SQL y MongoDB
4. **Agrupación de Conexiones**: Use agrupación de conexiones para bases de datos
5. **Operaciones por Lotes**: Use operaciones por lotes para datos masivos
6. **Paginación**: Implemente paginación para conjuntos grandes de datos

### Monitoreo

Monitoree el rendimiento de gestión de datos mediante:

- Rastrear tiempos de ejecución de consultas
- Monitorear tasas de aciertos de caché
- Verificar el uso de agrupación de conexiones de bases de datos
- Revisar el uso de disco E/S y memoria
- Analizar registros de consultas lentas

<Alert>
Para problemas de rendimiento, revise la sección de Monitoreo o contacte soporte para asistencia.
</Alert>

## Mejores Prácticas

Siga estas mejores prácticas para una gestión de datos eficaz:

1. **Base de Datos Apropiada**: Use la base de datos correcta para cada tipo de datos
2. **Estrategia de Indexación**: Cree índices en campos consultados frecuientemente
3. **Gestión de Caché**: Use caché estratégicamente para datos calientes
4. **Seguridad de Conexiones**: Use conexiones seguras (TLS) para bases de datos
5. **Estrategia de Respaldo**: Implemente respaldos regulares para todas las bases de datos
6. **Retención de Datos**: Defina políticas de retención para datos antiguos
7. **Optimización de Consultas**: Optimice consultas antes de ponerlas en producción
8. **Monitoreo**: Configure monitoreo para la salud y rendimiento de bases de datos

<Disclaimer>
La gestión de datos eficaz es crítica para la fiabilidad y rendimiento del sistema. Invierta tiempo en entender sus patrones de acceso de datos y optimizar adecuadamente.
</Disclaimer>
