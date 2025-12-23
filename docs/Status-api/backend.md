# Backend API

The STATUS Backend API provides the core functionality for data management and business logic.

## Overview

The backend API handles data storage and retrieval, business logic processing, authentication and authorization, and integration with external services.

## API Sections

| Section | Description |
|---------|-------------|
| [Authentication Endpoints](authentication-endpoints.md) | Detailed authentication flows including 2FA and OAuth |
| [Compliance Domain](compliance-apis.md) | RESTful endpoints for managing catalogs, controls, computations, and points |
| [Data Integration](data-integration-apis.md) | Databinder, Linker, Scope management, and Grafana proxy APIs |
| [System Configuration](system-config-apis.md) | Admin-only endpoints for managing endpoint availability and service settings |
| [AI Assistant](ai-assistant-apis.md) | OpenAI assistant, conversation threads, and messages APIs (DEPRECATED) |
| [Node-RED Integration](node-red.md) | Flow-based programming environment for workflows and automation |

## Notes

- All endpoints are prefixed with the `API_PREFIX` configured in environment variables
- Authentication is required for all protected routes
- Rate limiting may apply to certain endpoints
