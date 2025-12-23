---
sidebar_position: 2
tags:
  - getting-started
  - overview
  - architecture
keywords:
  - STATUS
  - system overview
  - microservices
  - infrastructure
  - architecture
  - deployment
  - technology stack
---

# System Overview

STATUS is a compliance and governance monitoring system built with a microservices architecture using Docker containers. The infrastructure supports two deployment modes (development and production) and integrates multiple specialized services for data management, workflow automation, monitoring, and API services.

## Key Features

- **Microservices Architecture**: Modular design with independent, scalable services
- **Dual Deployment Modes**: Development (local build) and Production (registry images)
- **Automated Workflows**: Node-RED integration for business process automation
- **Real-time Monitoring**: Grafana dashboards with PostgreSQL backend
- **High-performance Caching**: Dragonfly (Redis-compatible) for session and data caching
- **Governance Integration**: Governify director and registry services
- **Container Orchestration**: Docker Compose for simplified deployment

## Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React, Vite, Nginx (production) |
| **Backend** | Node.js, Express |
| **Workflow Automation** | Node-RED |
| **Databases** | PostgreSQL, MongoDB |
| **Caching** | Dragonfly (Redis-compatible) |
| **Monitoring** | Grafana |
| **Governance** | Governify (Director + Registry) |
| **Reverse Proxy** | Nginx (production only) |
| **Orchestration** | Docker Compose |

## High-Level Architecture

```mermaid
graph TB
    Client["Client<br/>(Browser)"] -->|:3000| Proxy["Nginx Reverse Proxy<br/>- Frontend (/)<br/>- Backend (/backend/*)<br/>- Node-RED (/node-red/*)<br/>- Grafana (/grafana/*)"]
    
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
    
    style Client fill:#e1f5ff
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

## Network Architecture

The infrastructure uses three isolated Docker networks for security and performance:

### 1. web_network
- **Purpose**: Frontend, backend, and proxy communication
- **Connected Services**: status-frontend, status-backend, reverse-proxy, nodered, grafana

### 2. db_network
- **Purpose**: Database services communication
- **Connected Services**: status-backend, postgres, grafana, dragonfly, director, registry, mongo-registry

### 3. nodered_network
- **Purpose**: Node-RED integration network
- **Connected Services**: status-backend, nodered

### Network Isolation Benefits

- **Security**: Services only communicate on required networks
- **Performance**: Reduced broadcast domain size
- **Maintenance**: Easier to troubleshoot and update individual networks
- **Scalability**: Networks can be independently scaled

## Deployment Modes

### Development Mode

- Builds images from local source code
- No reverse proxy (direct port access)
- Hot reload support
- Environment: `NODE_ENV=development`
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

### Production Mode

- Uses pre-built images from container registries
- Includes Nginx reverse proxy
- Optimized for performance
- Environment: `NODE_ENV=production`
- All services accessible through: `http://localhost:3000`

## Service Dependencies

```mermaid
graph LR
    Postgres[("postgres<br/>(healthy)")] --> Grafana["grafana<br/>(started)"]
    
    MongoRegistry[("mongo-registry<br/>(healthy)")] --> Registry["registry<br/>(started)"]
    Registry --> Director["director<br/>(healthy)"]
    
    Dragonfly[("dragonfly<br/>(healthy)")]
    
    NodeRED["nodered<br/>(healthy)"] --> Backend["status-backend<br/>(healthy)"]
    Backend --> Frontend["status-frontend<br/>(healthy)"]
    Frontend --> Proxy["reverse-proxy<br/>(prod only)"]
    
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
