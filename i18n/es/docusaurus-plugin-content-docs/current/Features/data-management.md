# Gestión y Almacenamiento de Datos

Persistencia políglota utilizando PostgreSQL para datos relacionales, MongoDB para esquemas flexibles y Redis para caché.

## Descripción General

El sistema STATUS emplea una estrategia de persistencia políglota, utilizando múltiples tecnologías de bases de datos optimizadas para diferentes tipos de datos y patrones de acceso.

## Tecnologías de Bases de Datos

### PostgreSQL
- **Datos Relacionales**: Almacenar datos de cumplimiento estructurados con garantías ACID
- **Consultas Complejas**: Soporte para consultas SQL avanzadas y joins
- **Integridad de Datos**: Claves foráneas y restricciones para consistencia de datos
- **Casos de Uso**: Gestión de usuarios, estructuras de catálogos, definiciones de controles

### MongoDB
- **Esquemas Flexibles**: Almacenar estructuras de datos dinámicas y en evolución
- **Almacenamiento de Documentos**: Documentos tipo JSON para datos anidados complejos
- **Escalabilidad**: Escalado horizontal para grandes conjuntos de datos
- **Casos de Uso**: Resultados de cálculos, puntos de garantía, metadatos flexibles

### Redis
- **Capa de Caché**: Caché de datos en memoria de alto rendimiento
- **Almacenamiento de Sesiones**: Gestión rápida de sesiones y tokens
- **Datos en Tiempo Real**: Soporte para pub/sub y características en tiempo real
- **Casos de Uso**: Tokens de autenticación, datos temporales, limitación de tasa

## Flujo de Datos

El sistema orquesta datos a través de estas soluciones de almacenamiento:

1. **Ruta de Escritura**: Los datos se escriben en la base de datos apropiada según el tipo
2. **Ruta de Lectura**: Los datos de acceso frecuente se almacenan en caché en Redis
3. **Sincronización**: Los cambios se propagan entre sistemas según sea necesario
4. **Respaldo y Recuperación**: Estrategias de respaldo automatizadas para todos los almacenes de datos
