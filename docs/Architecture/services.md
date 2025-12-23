---
sidebar_position: 2
---

# Services

The STATUS system consists of 10 microservices working together to provide compliance monitoring and governance capabilities.

## Core Application Services

### status-backend
- **Purpose**: Main API server handling business logic and data operations
- **Technology**: Node.js
- **Port**: 3001
- **Key Features**:
  - RESTful API with `/api/v1` prefix
  - JWT-based authentication
  - GitHub OAuth integration
  - OpenAI integration for AI features
  - Grafana API integration
  - Session management with Dragonfly/Redis

### status-frontend
- **Purpose**: User interface and client-side application
- **Technology**: React with Vite build tool
- **Port**: 80 (internal), 3000 (external via proxy in prod)
- **Key Features**:
  - Modern SPA (Single Page Application)
  - Environment-specific configuration
  - Responsive design
  - Integration with backend API

### reverse-proxy
- **Purpose**: Traffic routing and load distribution (Production only)
- **Technology**: Nginx
- **Port**: 3000 (external)
- **Routes**:
  - `/` → Frontend (status-frontend:80)
  - `/backend/*` → Backend API (status-backend:3001/api/v1/)
  - `/node-red/*` → Node-RED (nodered:1880)
  - `/grafana/*` → Grafana (grafana:3000)
- **Features**:
  - WebSocket support for Node-RED and Grafana
  - Static asset caching (30 days)
  - 50MB max upload size

## Workflow and Automation

### nodered
- **Purpose**: Visual workflow automation and integration
- **Technology**: Node-RED
- **Port**: 1880
- **Key Features**:
  - Flow-based programming
  - Integration with backend services
  - Blockchain ledger endpoint support
  - Persistent flow storage

## Data Storage Services

### postgres
- **Purpose**: Primary relational database
- **Technology**: PostgreSQL 17.2
- **Port**: 5432
- **Key Features**:
  - Main application data storage
  - Grafana user and configuration data
  - Initialized with custom schema (`init.sql`)
  - Health checks for service availability

### mongo-registry
- **Purpose**: Document database for Governify registry
- **Technology**: MongoDB
- **Port**: 5001
- **Key Features**:
  - Governify registry data storage
  - Authenticated access
  - Persistent volume storage

### dragonfly
- **Purpose**: High-performance in-memory data store
- **Technology**: Dragonfly (Redis-compatible)
- **Port**: 6379
- **Key Features**:
  - Session management
  - Caching layer
  - Redis protocol compatibility
  - Persistent data storage

## Monitoring and Visualization

### grafana
- **Purpose**: Monitoring dashboards and data visualization
- **Technology**: Grafana OSS
- **Port**: 3100
- **Key Features**:
  - PostgreSQL data source provisioning
  - Custom dashboard support
  - Service account API access
  - Pre-configured datasources

## Governance Services

### director
- **Purpose**: Governify director service for governance orchestration
- **Technology**: Governify Director
- **Port**: 5800
- **Key Features**:
  - Infrastructure coordination
  - MongoDB logging
  - Health monitoring

### registry
- **Purpose**: Governify registry for governance agreements
- **Technology**: Governify Registry
- **Port**: 5400
- **Key Features**:
  - Agreement storage and management
  - MongoDB backend
  - Static file serving
  - OAST TLM module support

## Port Mapping

### External Ports (Host Access)

| Port | Service | Purpose | Access |
|------|---------|---------|--------|
| **3000** | Frontend/Proxy | Main application entry | http://localhost:3000 |
| **3001** | Backend API | REST API | http://localhost:3001/api/v1 |
| **1880** | Node-RED | Workflow editor | http://localhost:1880 |
| **3100** | Grafana | Monitoring dashboard | http://localhost:3100 |
| **5001** | MongoDB | Registry database | localhost:5001 |
| **5400** | Registry | Governify registry | http://localhost:5400 |
| **5432** | PostgreSQL | Database | localhost:5432 |
| **5800** | Director | Governify director | http://localhost:5800 |
| **6379** | Dragonfly | Redis cache | localhost:6379 |

## Health Check Endpoints

- **Backend**: `http://127.0.0.1:3001` (wget check)
- **Frontend**: `http://127.0.0.1:80/` (curl check)
- **Node-RED**: `http://127.0.0.1:1880` (curl check)
- **PostgreSQL**: `pg_isready` command
- **MongoDB**: `mongosh ping` command
- **Dragonfly**: `redis-cli ping` command
- **Director**: `http://127.0.0.1:80/info` (wget check)
