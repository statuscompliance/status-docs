# Data Management & Storage

Polyglot persistence using PostgreSQL for relational data, MongoDB for flexible schemas, and Redis for caching.

## Overview

The STATUS system employs a polyglot persistence strategy, utilizing multiple database technologies optimized for different data types and access patterns.

## Database Technologies

### PostgreSQL
- **Relational Data**: Store structured compliance data with ACID guarantees
- **Complex Queries**: Support for advanced SQL queries and joins
- **Data Integrity**: Foreign keys and constraints for data consistency
- **Use Cases**: User management, catalog structures, control definitions

### MongoDB
- **Flexible Schemas**: Store dynamic and evolving data structures
- **Document Storage**: JSON-like documents for complex nested data
- **Scalability**: Horizontal scaling for large datasets
- **Use Cases**: Computation results, guarantee points, flexible metadata

### Redis
- **Caching Layer**: High-performance in-memory data caching
- **Session Storage**: Fast session and token management
- **Real-time Data**: Support for pub/sub and real-time features
- **Use Cases**: Authentication tokens, temporary data, rate limiting

## Data Flow

The system orchestrates data across these storage solutions:

1. **Write Path**: Data is written to the appropriate database based on type
2. **Read Path**: Frequently accessed data is cached in Redis
3. **Synchronization**: Changes are propagated across systems as needed
4. **Backup & Recovery**: Automated backup strategies for all data stores
