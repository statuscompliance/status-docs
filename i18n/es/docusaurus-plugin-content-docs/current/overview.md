---
sidebar_position: 2
---

# Resumen del Sistema

STATUS es un sistema de monitoreo de cumplimiento y gobernanza construido con una arquitectura de microservicios utilizando contenedores Docker. La infraestructura soporta dos modos de despliegue (desarrollo y producción) e integra múltiples servicios especializados para gestión de datos, automatización de flujos de trabajo, monitoreo y servicios API.

## Características Principales

- **Arquitectura de Microservicios**: Diseño modular con servicios independientes y escalables
- **Modos de Despliegue Duales**: Desarrollo (construcción local) y Producción (imágenes de registro)
- **Flujos de Trabajo Automatizados**: Integración de Node-RED para automatización de procesos de negocio
- **Monitoreo en Tiempo Real**: Dashboards de Grafana con backend PostgreSQL
- **Caché de Alto Rendimiento**: Dragonfly (compatible con Redis) para caché de sesiones y datos
- **Integración de Gobernanza**: Servicios director y registry de Governify
- **Orquestación de Contenedores**: Docker Compose para despliegue simplificado

## Stack Tecnológico

| Capa | Tecnologías |
|------|-------------|
| **Frontend** | React, Vite, Nginx (producción) |
| **Backend** | Node.js, Express |
| **Automatización de Flujos** | Node-RED |
| **Bases de Datos** | PostgreSQL, MongoDB |
| **Caché** | Dragonfly (compatible con Redis) |
| **Monitoreo** | Grafana |
| **Gobernanza** | Governify (Director + Registry) |
| **Proxy Inverso** | Nginx (solo producción) |
| **Orquestación** | Docker Compose |

## Arquitectura de Alto Nivel

```mermaid
graph TB
    Cliente["Cliente<br/>(Navegador)"] -->|:3000| Proxy["Nginx Reverse Proxy<br/>- Frontend (/)<br/>- Backend (/backend/*)<br/>- Node-RED (/node-red/*)<br/>- Grafana (/grafana/*)"]
    
    Proxy -->|/| Frontend["Frontend<br/>:80"]
    Proxy -->|/backend/*| Backend["Backend<br/>:3001"]
    Proxy -->|/node-red/*| NodeRED["Node-RED<br/>:1880"]
    Proxy -->|/grafana/*| Grafana["Grafana<br/>:3100"]
    
    Backend --> Postgres[("PostgreSQL<br/>:5432")]
    Backend --> Dragonfly[("Dragonfly<br/>:6379")]
    Backend --> NodeRED
    
    Grafana --> Postgres
    
    Registry["Registry<br/>:5400"] --> MongoRegistry[("Mongo Registry<br/>:5001")]
    Director["Director<br/>:5800"] --> Registry
    Director --> MongoRegistry
    
    style Cliente fill:#e1f5ff
    style Proxy fill:#ffe1e1
    style Frontend fill:#e1ffe1
    style Backend fill:#e1ffe1
    style Postgres fill:#fff3e1
    style Dragonfly fill:#fff3e1
    style MongoRegistry fill:#fff3e1
    style NodeRED fill:#f3e1ff
    style Grafana fill:#f3e1ff
    style Director fill:#ffe1f3
    style Registry fill:#ffe1f3
```

## Arquitectura de Red

La infraestructura utiliza tres redes Docker aisladas para seguridad y rendimiento:

### 1. web_network
- **Propósito**: Comunicación entre frontend, backend y proxy
- **Servicios Conectados**: status-frontend, status-backend, reverse-proxy, nodered, grafana

### 2. db_network
- **Propósito**: Comunicación de servicios de base de datos
- **Servicios Conectados**: status-backend, postgres, grafana, dragonfly, director, registry, mongo-registry

### 3. nodered_network
- **Propósito**: Red de integración de Node-RED
- **Servicios Conectados**: status-backend, nodered

### Beneficios del Aislamiento de Red

- **Seguridad**: Los servicios solo se comunican en las redes requeridas
- **Rendimiento**: Tamaño de dominio de broadcast reducido
- **Mantenimiento**: Más fácil de solucionar y actualizar redes individuales
- **Escalabilidad**: Las redes pueden escalarse independientemente

## Modos de Despliegue

### Modo Desarrollo

- Construye imágenes desde código fuente local
- Sin proxy inverso (acceso directo por puerto)
- Soporte para recarga en caliente
- Entorno: `NODE_ENV=development`
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

### Modo Producción

- Usa imágenes preconstruidas de registros de contenedores
- Incluye proxy inverso Nginx
- Optimizado para rendimiento
- Entorno: `NODE_ENV=production`
- Todos los servicios accesibles a través de: `http://localhost:3000`

## Dependencias entre Servicios

```mermaid
graph LR
    Postgres[("postgres<br/>(saludable)")] --> Grafana["grafana<br/>(iniciado)"]
    
    MongoRegistry[("mongo-registry<br/>(saludable)")] --> Registry["registry<br/>(iniciado)"]
    Registry --> Director["director<br/>(saludable)"]
    
    Dragonfly[("dragonfly<br/>(saludable)")]
    
    NodeRED["nodered<br/>(saludable)"] --> Backend["status-backend<br/>(saludable)"]
    Backend --> Frontend["status-frontend<br/>(saludable)"]
    Frontend --> Proxy["reverse-proxy<br/>(solo prod)"]
    
    style Postgres fill:#fff3e1
    style MongoRegistry fill:#fff3e1
    style Dragonfly fill:#fff3e1
    style Grafana fill:#f3e1ff
    style Registry fill:#ffe1f3
    style Director fill:#ffe1f3
    style NodeRED fill:#f3e1ff
    style Backend fill:#e1ffe1
    style Frontend fill:#e1ffe1
    style Proxy fill:#ffe1e1
```
