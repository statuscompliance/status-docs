# Node-RED Integration

Node-RED provides a flow-based programming environment for connecting hardware devices, APIs, and online services.

## Overview

The Node-RED component of the STATUS API allows you to create custom workflows, integrate with external services, process data in real-time, and build custom automations.

## Endpoints Summary

| Section | Description |
|---------|-------------|
| [Authentication](#authentication) | Node-RED token access and authentication |
| [Features](#features) | Flow-based programming and automation capabilities |

**Note:** Node-RED access is restricted to users with DEVELOPER or ADMIN authority levels. The Node-RED token is provided in the [Authentication Endpoints](authentication-endpoints.md) response upon sign-in.

## Authentication

All Node-RED endpoints require authentication. Users with DEVELOPER or ADMIN authority levels automatically receive a Node-RED token upon sign-in.

### Node-RED Token Access

The Node-RED token is provided in the authentication response:

```json
{
  "nodeRedToken": "string",
  "nodeRedAccess": true
}
```

Use this token to authenticate with Node-RED endpoints.

## Features

- **Flow-Based Programming**: Create visual workflows using the Node-RED editor
- **Custom Nodes**: Use custom STATUS-specific nodes for system integration
- **Real-Time Processing**: Process and transform data in real-time
- **Service Integration**: Connect to external APIs and services
- **Automation**: Build automated workflows for compliance and data management

## Notes

- Node-RED access is restricted to users with DEVELOPER or ADMIN authority levels
- The Node-RED token has a 7-day expiration and can be refreshed
- Custom STATUS nodes are available for seamless integration with the system
