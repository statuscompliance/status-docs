---
sidebar_position: 2
tags:
  - arquitectura
  - infraestructura
  - despliegue
keywords:
  - servicios
  - arquitectura
  - microservicios
  - despliegue
  - backend
  - frontend
  - API REST
  - Node-RED
  - Grafana
  - bases de datos
---

# Servicios

El sistema STATUS consta de 10 microservicios que trabajan juntos para proporcionar capacidades de monitoreo de cumplimiento y gobernanza.

## Servicios Principales de la Aplicación

### status-backend
- **Propósito**: Servidor API principal que maneja la lógica de negocio y operaciones de datos
- **Tecnología**: Node.js
- **Puerto**: 3001
- **Características Clave**:
  - API RESTful con prefijo `/api/v1`
  - Autenticación basada en JWT
  - Integración con OAuth de GitHub
  - Integración con OpenAI para funciones de IA
  - Integración con API de Grafana
  - Gestión de sesiones con Dragonfly/Redis

### status-frontend
- **Propósito**: Interfaz de usuario y aplicación del lado del cliente
- **Tecnología**: React con herramienta de construcción Vite
- **Puerto**: 80 (interno), 3000 (externo vía proxy en prod)
- **Características Clave**:
  - SPA moderna (Single Page Application)
  - Configuración específica por entorno
  - Diseño responsivo
  - Integración con API backend

### reverse-proxy
- **Propósito**: Enrutamiento de tráfico y distribución de carga (Solo producción)
- **Tecnología**: Nginx
- **Puerto**: 3000 (externo)
- **Rutas**:
  - `/` → Frontend (status-frontend:80)
  - `/backend/*` → API Backend (status-backend:3001/api/v1/)
  - `/node-red/*` → Node-RED (nodered:1880)
  - `/grafana/*` → Grafana (grafana:3000)
- **Características**:
  - Soporte para WebSocket en Node-RED y Grafana
  - Caché de assets estáticos (30 días)
  - Tamaño máximo de subida de 50MB

## Flujos de Trabajo y Automatización

### nodered
- **Propósito**: Automatización visual de flujos de trabajo e integración
- **Tecnología**: Node-RED
- **Puerto**: 1880
- **Características Clave**:
  - Programación basada en flujos
  - Integración con servicios backend
  - Soporte para endpoint de ledger blockchain
  - Almacenamiento persistente de flujos

## Servicios de Almacenamiento de Datos

### postgres
- **Propósito**: Base de datos relacional principal
- **Tecnología**: PostgreSQL 17.2
- **Puerto**: 5432
- **Características Clave**:
  - Almacenamiento de datos de aplicación principal
  - Datos de usuario y configuración de Grafana
  - Inicializado con esquema personalizado (`init.sql`)
  - Verificaciones de salud para disponibilidad del servicio

### mongo-registry
- **Propósito**: Base de datos de documentos para el registry de Governify
- **Tecnología**: MongoDB
- **Puerto**: 5001
- **Características Clave**:
  - Almacenamiento de datos del registry de Governify
  - Acceso autenticado
  - Almacenamiento en volumen persistente

### dragonfly
- **Propósito**: Almacén de datos en memoria de alto rendimiento
- **Tecnología**: Dragonfly (compatible con Redis)
- **Puerto**: 6379
- **Características Clave**:
  - Gestión de sesiones
  - Capa de caché
  - Compatibilidad con protocolo Redis
  - Almacenamiento de datos persistente

## Monitoreo y Visualización

### grafana
- **Propósito**: Dashboards de monitoreo y visualización de datos
- **Tecnología**: Grafana OSS
- **Puerto**: 3100
- **Características Clave**:
  - Aprovisionamiento de fuente de datos PostgreSQL
  - Soporte para dashboards personalizados
  - Acceso API mediante cuenta de servicio
  - Datasources preconfiguradas

## Servicios de Gobernanza

### director
- **Propósito**: Servicio director de Governify para orquestación de gobernanza
- **Tecnología**: Governify Director
- **Puerto**: 5800
- **Características Clave**:
  - Coordinación de infraestructura
  - Registro en MongoDB
  - Monitoreo de salud

### registry
- **Propósito**: Registry de Governify para acuerdos de gobernanza
- **Tecnología**: Governify Registry
- **Puerto**: 5400
- **Características Clave**:
  - Almacenamiento y gestión de acuerdos
  - Backend MongoDB
  - Servicio de archivos estáticos
  - Soporte para módulo OAST TLM

## Mapeo de Puertos

### Puertos Externos (Acceso desde Host)

| Puerto | Servicio | Propósito | Acceso |
|--------|----------|-----------|--------|
| **3000** | Frontend/Proxy | Entrada principal de la aplicación | http://localhost:3000 |
| **3001** | Backend API | API REST | http://localhost:3001/api/v1 |
| **1880** | Node-RED | Editor de flujos de trabajo | http://localhost:1880 |
| **3100** | Grafana | Dashboard de monitoreo | http://localhost:3100 |
| **5001** | MongoDB | Base de datos del registry | localhost:5001 |
| **5400** | Registry | Registry de Governify | http://localhost:5400 |
| **5432** | PostgreSQL | Base de datos | localhost:5432 |
| **5800** | Director | Director de Governify | http://localhost:5800 |
| **6379** | Dragonfly | Caché Redis | localhost:6379 |

## Endpoints de Verificación de Salud

- **Backend**: `http://127.0.0.1:3001` (verificación wget)
- **Frontend**: `http://127.0.0.1:80/` (verificación curl)
- **Node-RED**: `http://127.0.0.1:1880` (verificación curl)
- **PostgreSQL**: comando `pg_isready`
- **MongoDB**: comando `mongosh ping`
- **Dragonfly**: comando `redis-cli ping`
- **Director**: `http://127.0.0.1:80/info` (verificación wget)
