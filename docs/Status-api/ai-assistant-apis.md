# AI Assistant

> ⚠️ **DEPRECATED**: This functionality is obsolete and will be removed in future versions. Please consult the current documentation and endpoints before implementing new integrations.

## Overview

The AI Assistant system provides REST APIs for creating and managing OpenAI assistants, conversation threads, and messages. All endpoints require authentication and are integrated with OpenAI's Beta Assistants API.

## Assistant

### Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/assistant` | List all assistants |
| GET | `/assistant/:id` | Get specific assistant by ID |
| GET | `/assistant/:id/instructions` | Get assistant instructions |
| POST | `/assistant` | Create assistant with default settings |
| POST | `/assistant/admin` | Create assistant with custom settings |
| PUT | `/assistant/:id/instructions` | Update assistant instructions |
| DELETE | `/assistant/:id` | Delete specific assistant |
| DELETE | `/assistant` | Delete all assistants |

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

**Usage Example:**
```bash
curl -X POST http://localhost:3000/api/v1/assistant \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "name": "Compliance Helper"
  }'
```

#### ✅ 201 Created - Assistant Created Successfully

- **Content-Type:** `application/json`
- **Description:** Assistant created successfully with default settings
- **Example:**

  ```json
  {
    "message": "Assistant Compliance Helper with id asst_abc123 created successfully"
  }
  ```

#### ❌ 429 Too Many Requests - Limit Reached

- **Content-Type:** `application/json`
- **Description:** Assistant creation limit has been reached
- **Example:**

  ```json
  {
    "message": "Assistant limit reached"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Failed to create assistant
- **Example:**

  ```json
  {
    "message": "Failed to create assistant"
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

**Usage Example:**
```bash
curl -X POST http://localhost:3000/api/v1/assistant/admin \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_access_token>" \
  -d '{
    "name": "Custom Assistant",
    "instructions": "Custom system instructions",
    "model": "gpt-3.5-turbo-0125",
    "tools": [{"type": "code_interpreter"}]
  }'
```

#### ✅ 201 Created - Assistant Created Successfully

- **Content-Type:** `application/json`
- **Description:** Assistant created with custom settings
- **Example:**

  ```json
  {
    "message": "Assistant Custom Assistant with id asst_xyz789 created successfully"
  }
  ```

#### ❌ 401 Unauthorized

- **Content-Type:** `application/json`
- **Description:** Admin privileges required
- **Example:**

  ```json
  {
    "message": "Admin privileges required"
  }
  ```

#### ❌ 429 Too Many Requests - Limit Reached

- **Content-Type:** `application/json`
- **Description:** Assistant creation limit has been reached
- **Example:**

  ```json
  {
    "message": "Assistant limit reached"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Failed to create assistant
- **Example:**

  ```json
  {
    "message": "Failed to create assistant"
  }
  ```

## Thread

### Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/threads` | Get all threads (any user) |
| GET | `/thread` | Get threads for authenticated user |
| GET | `/thread/:gptId` | Get messages in specific thread |
| POST | `/thread` | Create new thread with initial message |
| POST | `/thread/:gptId` | Add message to existing thread |
| PUT | `/thread/:gptId` | Update thread name |
| DELETE | `/thread/:gptId` | Delete specific thread |
| DELETE | `/thread` | Delete all threads for user |

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

**Usage Example:**
```bash
curl -X POST http://localhost:3000/api/v1/thread \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "assistantId": "1",
    "content": "I need help understanding compliance requirements for data processing activities"
  }'
```

#### ✅ 201 Created - Thread Created Successfully

- **Content-Type:** `application/json`
- **Description:** Thread created with initial message
- **Example:**

  ```json
  {
    "id": "thread_xyz789",
    "message": "Thread created successfully"
  }
  ```

#### ❌ 400 Bad Request - Message Too Short

- **Content-Type:** `application/json`
- **Description:** Message must be at least 15 words or 40 characters
- **Example:**

  ```json
  {
    "error": "The message must be at least 15 words or 40 characters"
  }
  ```

#### ❌ 401 Unauthorized

- **Content-Type:** `application/json`
- **Description:** Unauthorized
- **Example:**

  ```json
  {
    "error": "Unauthorized"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Failed to create thread
- **Example:**

  ```json
  {
    "error": "Failed to create thread"
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

**Usage Example:**
```bash
curl -X POST http://localhost:3000/api/v1/thread/thread_xyz789 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "content": "What are the specific requirements for data retention policies?",
    "assistantId": "1"
  }'
```

#### ✅ 201 Created - Message Added Successfully

- **Content-Type:** `application/json`
- **Description:** Message added to thread successfully
- **Example:**

  ```json
  {
    "message": "Message added successfully"
  }
  ```

#### ❌ 400 Bad Request - Message Too Short

- **Content-Type:** `application/json`
- **Description:** Message must be at least 15 words or 40 characters
- **Example:**

  ```json
  {
    "error": "The message must be at least 15 words or 40 characters"
  }
  ```

#### ❌ 500 Internal Server Error

- **Content-Type:** `application/json`
- **Description:** Failed to create message or thread
- **Example:**

  ```json
  {
    "error": "Failed to create message or thread"
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

**Usage Example (Generic for all endpoints):**
```bash
curl -X POST http://localhost:3000/api/v1/assistant \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "name": "My Assistant"
  }'
```

### Get All Assistants

**GET** `/assistant`

**Usage Example:**
```bash
curl -X GET http://localhost:3000/api/v1/assistant \
  -H "Authorization: Bearer <access_token>"
```

#### ✅ 200 OK

- **Description:** List of all assistants
- **Example:**

  ```json
  [
    {
      "id": 1,
      "assistantId": "asst_abc123",
      "name": "Compliance Helper",
      "instructions": "Help with compliance requirements",
      "model": "gpt-3.5-turbo-0125",
      "status": "ACTIVE"
    }
  ]
  ```

#### ❌ 500 Internal Server Error

- **Description:** Failed to get assistants
- **Example:**

  ```json
  {
    "message": "Failed to get assistants"
  }
  ```

### Get Assistant by ID

**GET** `/assistant/:id`

**Usage Example:**
```bash
curl -X GET http://localhost:3000/api/v1/assistant/1 \
  -H "Authorization: Bearer <access_token>"
```

#### ✅ 200 OK

- **Description:** Specific assistant details
- **Example:**

  ```json
  {
    "id": 1,
    "assistantId": "asst_abc123",
    "name": "Compliance Helper",
    "instructions": "Help with compliance requirements"
    "model": "gpt-3.5-turbo-0125",
    "status": "ACTIVE"
  }
  ```

#### ❌ 404 Not Found

- **Description:** Assistant not found
- **Example:**

  ```json
  {
    "message": "Assistant not found"
  }
  ```

#### ❌ 500 Internal Server Error

- **Description:** Failed to get the assistant
- **Example:**

  ```json
  {
    "message": "Failed to get the assistant"
  }
  ```

### Update Assistant Instructions

**PUT** `/assistant/:id/instructions`

**Request Body:**
```json
{
  "instructions": "Updated system instructions"
}
```

**Usage Example:**
```bash
curl -X PUT http://localhost:3000/api/v1/assistant/1/instructions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "instructions": "Updated system instructions"
  }'
```

#### ✅ 200 OK

- **Description:** Assistant instructions updated successfully

#### ❌ 404 Not Found

- **Description:** Assistant not found
- **Example:**

  ```json
  {
    "message": "Assistant not found"
  }
  ```

#### ❌ 500 Internal Server Error

- **Description:** Failed to update assistant instructions
- **Example:**

  ```json
  {
    "message": "Failed to update assistant instructions"
  }
  ```

### Delete Assistant by ID

**DELETE** `/assistant/:id`

**Usage Example:**
```bash
curl -X DELETE http://localhost:3000/api/v1/assistant/1 \
  -H "Authorization: Bearer <access_token>"
```

#### ✅ 200 OK

- **Description:** Assistant deleted successfully

#### ❌ 400 Bad Request

- **Description:** Assistant id is required
- **Example:**

  ```json
  {
    "message": "Assistant id is required"
  }
  ```

#### ❌ 500 Internal Server Error

- **Description:** Failed to delete the assistant
- **Example:**

  ```json
  {
    "message": "Failed to delete the assistant"
  }
  ```

### Delete All Assistants

**DELETE** `/assistant`

**Usage Example:**
```bash
curl -X DELETE http://localhost:3000/api/v1/assistant \
  -H "Authorization: Bearer <access_token>"
```

#### ✅ 200 OK

- **Description:** All assistants deleted successfully

#### ❌ 500 Internal Server Error

- **Description:** Failed to delete all assistants
- **Example:**

  ```json
  {
    "message": "Failed to delete all assistants"
  }
  ```

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

### Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/config/assistant/limit` | Get current assistant limit |
| PUT | `/config/assistant/limit/:limit` | Update assistant limit |

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
