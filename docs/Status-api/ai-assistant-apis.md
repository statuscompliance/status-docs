# AI Assistant

> ⚠️ **DEPRECATED**: This functionality is obsolete and will be removed in future versions. Please consult the current documentation and endpoints before implementing new integrations.

## Overview

The AI Assistant system provides REST APIs for creating and managing OpenAI assistants, conversation threads, and messages. All endpoints require authentication and are integrated with OpenAI's Beta Assistants API.

## Assistant

### Base Path

`/assistant`

### Assistant Operations

| Method   | Endpoint                      | Description                                    | Access Level  |
|----------|-------------------------------|------------------------------------------------|---------------|
| GET      | `/assistant`                  | List all assistants                             | Authenticated |
| GET      | `/assistant/:id`              | Get specific assistant by ID                    | Authenticated |
| GET      | `/assistant/:id/instructions` | Get assistant instructions                     | Authenticated |
| POST     | `/assistant`                  | Create assistant with default settings         | Authenticated |
| POST     | `/assistant/admin`            | Create assistant with custom settings          | Admin only    |
| PUT      | `/assistant/:id/instructions` | Update assistant instructions                  | Authenticated |
| DELETE   | `/assistant/:id`              | Delete specific assistant                      | Authenticated |
| DELETE   | `/assistant`                  | Delete all assistants                           | Authenticated |

### Create Assistant (Standard)

**POST** `/assistant`

**Request Body:**
```json
{
  "name": "Compliance Helper"
}
```

**Response (201 Created):**
```json
{
  "message": "Assistant Compliance Helper with id asst_abc123 created successfully"
}
```

### Create Assistant (Admin)

**POST** `/assistant/admin`

**Request Body:**
```json
{
  "name": "Custom Assistant",
  "instructions": "Custom system instructions",
  "model": "gpt-3.5-turbo-0125",
  "tools": [{"type": "code_interpreter"}]
}
```

## Thread

### Base Path

`/thread`

### Thread Operations

| Method   | Endpoint         | Description                                | Access Level  |
|----------|------------------|--------------------------------------------|---------------|
| GET      | `/threads`       | Get all threads (any user)                 | Authenticated |
| GET      | `/thread`        | Get threads for authenticated user         | Authenticated |
| GET      | `/thread/:gptId` | Get messages in specific thread            | Authenticated |
| POST     | `/thread`        | Create new thread with initial message      | Authenticated |
| POST     | `/thread/:gptId` | Add message to existing thread             | Authenticated |
| PUT      | `/thread/:gptId` | Update thread name                         | Authenticated |
| DELETE   | `/thread/:gptId` | Delete specific thread                     | Authenticated |
| DELETE   | `/thread`        | Delete all threads for user                | Authenticated |

### Create Thread

**POST** `/thread`

**Request Body:**
```json
{
  "assistantId": "1",
  "content": "I need help understanding compliance requirements for data processing activities"
}
```

**Response (201 Created):**
```json
{
  "id": "thread_xyz789",
  "message": "Thread created successfully"
}
```

### Add Message to Thread

**POST** `/thread/:gptId`

**Request Body:**
```json
{
  "content": "What are the specific requirements for data retention policies?",
  "assistantId": "1"
}
```

**Response (201 Created):**
```json
{
  "message": "Message added successfully"
}
```

## Data Models

### Assistant Model

The `Assistant` model stores metadata with both local and OpenAI identifiers:

| Field         | Type        | Description                                  |
|---------------|-------------|----------------------------------------------|
| `assistantId` | STRING(50)  | OpenAI assistant identifier                  |
| `name`        | STRING(100) | Assistant display name                       |
| `instructions`| TEXT        | System prompt/instructions                   |
| `tools`       | TEXT        | Serialized tool configurations               |
| `model`       | STRING(100) | GPT model identifier                         |
| `status`      | ENUM        | "ACTIVE" or "INACTIVE"                        |

## Authentication & Limits

### Authentication

All endpoints require Bearer token authentication via the `verifyAuthority` middleware.

### Assistant Limits

Assistant creation is limited by configuration via the `assistantlimitReached` middleware, which checks against the Configuration model before allowing creation.

### Message Validation

All messages must meet minimum requirements:
- Minimum 15 words or 40 characters
- Validated in `createThread()` and `addNewMessage()` functions
- Returns 400 Bad Request if validation fails

## OpenAI Integration

The system uses OpenAI's Beta Assistants API with the following operations:

| Operation           | OpenAI Method                              |
|---------------------|--------------------------------------------|
| Create assistant    | `openai.beta.assistants.create()`         |
| Update assistant    | `openai.beta.assistants.update()`         |
| Create thread       | `openai.beta.threads.create()`            |
| Add message         | `openai.beta.threads.messages.create()`   |
| Create run          | `openai.beta.threads.runs.create()`       |
| List messages       | `openai.beta.threads.messages.list()`     |

## Configuration

Assistant limits can be managed via configuration:

| Method   | Endpoint                       | Description                    |
|----------|--------------------------------|--------------------------------|
| GET      | `/config/assistant/limit`      | Get current assistant limit    |
| PUT      | `/config/assistant/limit/:limit`| Update assistant limit         |

## Notes

- All assistant and thread operations require authentication
- The system maintains dual identifiers: local database IDs and OpenAI IDs
- Message validation prevents trivial submissions from consuming API resources
- Admin endpoints require additional `verifyAdmin` middleware
- The system uses synchronous polling for assistant responses to ensure completion before returning to clients
- Configuration-based limits enforce resource quotas for assistant creation
