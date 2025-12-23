---
sidebar_position: 1
tags:
  - status
  - introduction
  - features
keywords:
  - STATUS
  - user guide
  - compliance management
  - authentication
  - AI assistants
  - data management
  - integrations
  - features overview
authors:
  - name: "STATUS Team"
    title: "Project Contributors"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Introduction

import Alert from '@site/src/components/Alert.js';

This section is a detailed user guide for using STATUS. You will find here every feature and how to use it, with recommendations and tips. Please do not forget to check troubleshooting documentation in case you are having problems instead of trying to learn about the features.

<Alert>
Please take into account that STATUS is still under active development, so do not forget to check in the user guide if what you are looking for is currently supported.
</Alert>

## Overview

STATUS is a comprehensive compliance management platform that helps organizations track, monitor, and verify their compliance status across various frameworks and regulations. The platform provides real-time monitoring, automated workflows, and AI-powered analysis to streamline compliance processes.

## Navigation

STATUS features a modern, intuitive navigation system designed to help you quickly access the information you need. The main navigation includes:

- **Dashboard**: Real-time overview of compliance status and metrics
- **Catalogs**: Organize and manage compliance catalogs and controls
- **Scopes**: Define and manage scope boundaries for compliance
- **Dashboards**: Create and customize visualization dashboards
- **Datasources**: Configure and manage data sources
- **Secrets**: Securely store and manage sensitive credentials

<div align="center">
![Navigation elements](/img/status/navigationMenu.png)
**Figure 1:** *STATUS navigation elements.*
</div>

## Core Features

### Compliance Management
- **Catalog Structure**: Hierarchical organization of compliance requirements
- **Control Management**: Define and manage individual compliance controls
- **Computation Results**: View and analyze compliance computation results
- **Guarantee Points**: Track compliance verification points over time

### Authentication & Authorization
- **JWT-based Authentication**: Secure token-based authentication system
- **Two-Factor Authentication**: Optional TOTP support for enhanced security
- **Role-Based Access Control**: Granular permissions with USER, DEVELOPER, and ADMIN roles
- **Service Accounts**: Create non-interactive accounts for integrations

### Data Management
- **Polyglot Persistence**: PostgreSQL, MongoDB, and Redis for optimized data storage
- **Data Linking**: Connect and correlate data across different sources
- **Flexible Queries**: Advanced querying capabilities for compliance data

### Integrations
- **Node-RED**: Automate compliance workflows and data processing
- **Grafana**: Create powerful visualization dashboards
- **OpenAI**: AI-powered compliance assistants and analysis
- **Registry Service**: Centralized guarantee data storage

### AI Assistants
- **Natural Language Processing**: Analyze compliance documents and requirements
- **Conversation Management**: Context-aware conversations for compliance inquiries
- **Automated Insights**: Generate compliance recommendations and reports

## Getting Started

To get started with STATUS, you need to:

1. **Create an account**: Register using the login form with secure credentials
2. **Configure your profile**: Set up your profile and authentication preferences
3. **Create a catalog**: Define your compliance catalog structure
4. **Add controls**: Create compliance controls within your catalog
5. **Configure datasources**: Connect to your data sources
6. **View computations**: Analyze compliance computation results
7. **Create dashboards**: Build visualization dashboards for monitoring

## Feature Structure

Each feature in STATUS is documented with the following sections:

- **Overview**: High-level description of the feature
- **Key Capabilities**: Main functionalities provided by the feature
- **Usage Instructions**: Step-by-step guide on how to use the feature
- **Best Practices**: Recommendations for optimal use
- **Troubleshooting**: Common issues and their solutions

<Alert>
All features require authentication. Make sure you are logged in before accessing any feature.
</Alert>
