---
sidebar_position: 5
tags:
  - status
  - data
  - storage
  - database
keywords:
  - data management
  - polyglot persistence
  - PostgreSQL
  - MongoDB
  - Redis
  - relational data
  - document storage
  - caching
  - data flow
  - data sources
  - data linking
  - STATUS
  - database architecture
authors:
  - name: "STATUS Team"
    title: "Project Contributors"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Data Management & Storage

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

The STATUS system employs a polyglot persistence strategy, utilizing multiple database technologies optimized for different data types and access patterns. This section will guide you through understanding how data is managed and stored in STATUS.

## Overview

STATUS uses a multi-database architecture to optimize performance, scalability, and flexibility:

- **PostgreSQL**: For structured, relational data with ACID guarantees
- **MongoDB**: For flexible, document-based data with evolving schemas
- **Redis**: For high-speed caching and real-time data

<div align="center">
![Data Architecture](/img/data/dataArchitecture.png)
**Figure 1:** *STATUS polyglot persistence architecture.*
</div>

<Alert>
This polyglot approach allows STATUS to leverage the strengths of each database technology while maintaining data consistency and integrity.
</Alert>

## PostgreSQL

PostgreSQL is used for structured, relational data requiring strong consistency and complex querying capabilities.

### Key Features

- **Relational Data Model**: Structured data with relationships
- **ACID Transactions**: Strong data consistency guarantees
- **Complex Queries**: Advanced SQL with joins, aggregates, and window functions
- **Data Integrity**: Foreign keys, constraints, and triggers
- **Indexing**: Powerful indexing options for query optimization

### Use Cases

PostgreSQL stores the following types of data:

- **Users**: User accounts, profiles, and authentication data
- **Catalogs**: Catalog definitions and metadata
- **Controls**: Control definitions and configurations
- **Scopes**: Scope definitions and mappings
- **Secrets**: Encrypted sensitive information
- **Service Accounts**: Service account configurations

<div align="center">
![PostgreSQL Schema](/img/data/postgreSQLSchema.png)
**Figure 2:** *PostgreSQL database schema.*
</div>

### Data Structure Example

A typical PostgreSQL table structure for controls:

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
PostgreSQL is chosen for its reliability, advanced features, and strong consistency guarantees. It's ideal for data that requires strict schema validation and complex relationships.
</Disclaimer>

## MongoDB

MongoDB is used for flexible, document-based data that benefits from dynamic schemas and horizontal scalability.

### Key Features

- **Document Storage**: JSON-like documents with flexible schemas
- **Dynamic Schema**: Easy to evolve data structure over time
- **Horizontal Scaling**: Scale out across multiple servers
- **Rich Queries**: Powerful querying and aggregation framework
- **Flexible Indexing**: Multiple indexing options including geospatial

### Use Cases

MongoDB stores the following types of data:

- **Computations**: Computation results with variable evidence structures
- **Guarantee Points**: Guarantee points with diverse metadata
- **Mashups**: Node-RED flow definitions and configurations
- **Datasources**: Datasource configurations with provider-specific settings
- **Linkers**: Data linking configurations and results
- **Folders**: Hierarchical folder structures

<div align="center">
![MongoDB Collections](/img/data/mongoDBCollections.png)
**Figure 3:** *MongoDB collections and their relationships.*
</div>

### Document Structure Example

A typical MongoDB document for a computation:

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
MongoDB is ideal for data with variable structures that may change over time. Its flexible schema allows you to evolve your data model without migrations.
</Disclaimer>

## Redis

Redis is used as a high-performance in-memory data store for caching, session management, and real-time features.

### Key Features

- **In-Memory Storage**: Extremely fast data access
- **Data Structures**: Strings, lists, sets, sorted sets, hashes, streams
- **Pub/Sub**: Real-time messaging and notifications
- **Expiry**: Automatic expiration of keys
- **Persistence**: Optional disk persistence for durability

### Use Cases

Redis is used for the following:

- **Authentication Tokens**: JWT access and refresh tokens
- **Session Data**: User session information
- **Caching**: Frequently accessed data to reduce database load
- **Rate Limiting**: API rate limiting and throttling
- **Real-time Updates**: Pub/sub for real-time notifications
- **Temporary Data**: Short-lived data with automatic expiration

<div align="center">
![Redis Usage](/img/data/redisUsage.png)
**Figure 4:** *Redis usage patterns in STATUS.*
</div>

### Data Structure Examples

Common Redis patterns in STATUS:

```redis
# Authentication token with expiration
SET token:abc123 "user_data" EX 7200

# User session data
HSET session:xyz456 user_id "123" created_at "2025-01-01"

# Computation results cache
SET cache:computation:789 "result_data" EX 3600

# Rate limiting counter
INCR rate_limit:user:123
EXPIRE rate_limit:user:123 60
```

<Disclaimer>
Redis provides sub-millisecond response times, making it ideal for performance-critical operations. However, data in Redis should not be considered the source of truth - it's a cache layer.
</Disclaimer>

## Data Flow

STATUS orchestrates data across these storage solutions with a clear separation of concerns.

### Write Path

When data is written to STATUS:

1. **Request Validation**: Data is validated before writing
2. **Database Selection**: Appropriate database is chosen based on data type
3. **Transaction**: Data is written in a transaction (for PostgreSQL)
4. **Cache Update**: Redis cache is updated if applicable
5. **Confirmation**: Write is confirmed to the client

<div align="center">
![Write Path](/img/data/writePath.png)
**Figure 5:** *Data write path flow.*
</div>

### Read Path

When data is read from STATUS:

1. **Cache Check**: Redis is checked first for cached data
2. **Database Query**: Appropriate database is queried if cache miss
3. **Cache Population**: Result is stored in Redis for future requests
4. **Response**: Data is returned to the client

<div align="center">
![Read Path](/img/data/readPath.png)
**Figure 6:** *Data read path with caching.*
</div>

<Alert>
This caching strategy significantly improves performance for frequently accessed data, reducing database load and improving response times.
</Alert>

### Synchronization

Changes are propagated across systems as needed:

- **Event-Driven**: Changes trigger events that update dependent systems
- **Eventual Consistency**: Some data is eventually consistent for performance
- **Strong Consistency**: Critical data maintains strong consistency
- **Conflict Resolution**: Strategies for handling conflicting updates

### Backup & Recovery

Each database has its own backup and recovery strategy:

- **PostgreSQL**: Regular backups with point-in-time recovery
- **MongoDB**: Periodic snapshots and oplog backups
- **Redis**: Optional persistence and periodic snapshots

## Datasources

Datasources are configurations that allow STATUS to connect to external data systems and retrieve evidence for compliance calculations.

### Supported Datasource Types

STATUS supports various datasource types:

- **REST APIs**: HTTP/REST endpoints for JSON data
- **Databases**: SQL and NoSQL databases
- **File Systems**: Local and remote file systems
- **Cloud Services**: AWS, GCP, Azure services
- **Custom Providers**: Custom implementations via extensions

<div align="center">
![Datasource Types](/img/data/datasourceTypes.png)
**Figure 7:** *Supported datasource types.*
</div>

### Create a Datasource

To create a new datasource:

1. Navigate to **Datasources** section
2. Click the ***Create Datasource*** button
3. Select the datasource type
4. Configure the connection details:
   - **Name**: Descriptive name for the datasource
   - **Type**: Datasource type (REST API, Database, etc.)
   - **Connection Parameters**: Host, port, credentials, etc.
   - **Authentication**: Authentication method and credentials
   - **Query Configuration**: Query or API endpoint details
5. Click ***Test Connection*** to verify configuration
6. Click ***Save*** to create the datasource

<div align="center">
![Create Datasource](/img/data/createDatasource.png)
**Figure 8:** *Create datasource form.*
</div>

<Disclaimer>
Sensitive credentials like passwords and API keys are encrypted before storage. Use Secret management for additional security.
</Disclaimer>

### Manage Datasources

Once created, you can:

- **Edit Datasource**: Update connection parameters
- **Delete Datasource**: Remove datasource (cannot be used in controls)
- **Test Connection**: Verify datasource is accessible
- **View Usage**: See which controls use the datasource
- **Monitor Status**: Check datasource health and availability

## Data Linking

Data linking allows you to correlate data from different sources to create comprehensive evidence for compliance calculations.

### Linking Concepts

Data linking works by:

1. **Defining Sources**: Identify datasources to link
2. **Mapping Keys**: Define keys for correlation
3. **Transforming Data**: Apply transformations as needed
4. **Merging Data**: Combine data into a unified view

<div align="center">
![Data Linking](/img/data/dataLinking.png)
**Figure 9:** *Data linking concept.*
</div>

### Create a Linker

To create a new data linker:

1. Navigate to **Datasources** section
2. Click the ***Linkers*** tab
3. Click the ***Create Linker*** button
4. Configure the linker:
   - **Name**: Descriptive name for the linker
   - **Source Datasources**: Select datasources to link
   - **Link Keys**: Define keys for correlation
   - **Transformations**: Apply data transformations
   - **Output Schema**: Define output structure
5. Click ***Test Linker*** to verify configuration
6. Click ***Save*** to create the linker

<div align="center">
![Create Linker](/img/data/createLinker.png)
**Figure 10:** *Create linker form.*
</div>

## Performance Considerations

<Disclaimer>
Proper data management is crucial for system performance. Follow these guidelines for optimal performance.
</Disclaimer>

### Optimization Tips

1. **Indexing**: Ensure proper indexes on frequently queried fields
2. **Caching**: Leverage Redis caching for hot data
3. **Query Optimization**: Optimize SQL and MongoDB queries
4. **Connection Pooling**: Use connection pooling for databases
5. **Batch Operations**: Use batch operations for bulk data
6. **Pagination**: Implement pagination for large datasets

### Monitoring

Monitor data management performance by:

- Tracking query execution times
- Monitoring cache hit ratios
- Checking database connection pool usage
- Reviewing disk I/O and memory usage
- Analyzing slow query logs

<Alert>
For performance issues, review the Monitoring section or contact support for assistance.
</Alert>

## Best Practices

Follow these best practices for effective data management:

1. **Appropriate Database**: Use the right database for each data type
2. **Index Strategy**: Create indexes on frequently queried fields
3. **Cache Management**: Use caching strategically for hot data
4. **Connection Security**: Use secure connections (TLS) for databases
5. **Backup Strategy**: Implement regular backups for all databases
6. **Data Retention**: Define retention policies for old data
7. **Query Optimization**: Optimize queries before putting them in production
8. **Monitoring**: Set up monitoring for database health and performance

<Disclaimer>
Effective data management is critical for system reliability and performance. Invest time in understanding your data access patterns and optimizing accordingly.
</Disclaimer>
