# Asistente de IA

> ⚠️ **OBSOLETO**: Esta funcionalidad está obsoleta y será eliminada en futuras versiones. Por favor, consulta la documentación y endpoints actuales antes de implementar integraciones nuevas.

## Descripción General

El sistema de Asistente de IA proporciona APIs REST para crear y gestionar asistentes de OpenAI, hilos de conversación y mensajes. Todos los endpoints requieren autenticación y están integrados con la API Beta de OpenAI Assistants.

## Asistente

### Resumen de Endpoints

| Método  | Endpoint                        | Descripción                                      |
|---------|---------------------------------|--------------------------------------------------|
| GET     | `/assistant`                    | Listar todos los asistentes                       |
| GET     | `/assistant/:id`                | Obtener asistente por ID                         |
| GET     | `/assistant/:id/instructions`   | Obtener instrucciones del asistente              |
| POST    | `/assistant`                    | Crear asistente con configuración por defecto    |
| POST    | `/assistant/admin`              | Crear asistente con configuración personalizada  |
| PUT     | `/assistant/:id/instructions`   | Actualizar instrucciones del asistente           |
| DELETE  | `/assistant/:id`                | Eliminar asistente específico                    |
| DELETE  | `/assistant`                    | Eliminar todos los asistentes                     |

### Operaciones de Asistente

| Método  | Endpoint                        | Descripción                                      | Nivel de Acceso |
|---------|---------------------------------|--------------------------------------------------|-----------------|
| GET     | `/assistant`                    | Listar todos los asistentes                       | Autenticado     |
| GET     | `/assistant/:id`                | Obtener asistente por ID                         | Autenticado     |
| GET     | `/assistant/:id/instructions`   | Obtener instrucciones del asistente              | Autenticado     |
| POST    | `/assistant`                    | Crear asistente con configuración por defecto    | Autenticado     |
| POST    | `/assistant/admin`              | Crear asistente con configuración personalizada  | Solo Admin      |
| PUT     | `/assistant/:id/instructions`   | Actualizar instrucciones del asistente           | Autenticado     |
| DELETE  | `/assistant/:id`                | Eliminar asistente específico                    | Autenticado     |
| DELETE  | `/assistant`                    | Eliminar todos los asistentes                     | Autenticado     |

### Crear Asistente (Estándar)

**POST** `/assistant`

**Cuerpo de la Solicitud:**
```json
{
  "name": "Asistente de Cumplimiento"
}
```

**Ejemplo de Uso:**
```bash
curl -X POST http://localhost:3000/api/v1/assistant \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_acceso>" \
  -d '{
    "name": "Asistente de Cumplimiento"
  }'
```

#### ✅ 201 Creado - Asistente Creado Exitosamente

- **Content-Type:** `application/json`
- **Descripción:** Asistente creado exitosamente con configuración por defecto
- **Ejemplo:**

  ```json
  {
    "message": "Asistente Asistente de Cumplimiento con id asst_abc123 creado exitosamente"
  }
  ```

#### ❌ 429 Demasiadas Solicitudes - Límite Alcanzado

- **Content-Type:** `application/json`
- **Descripción:** Se ha alcanzado el límite de creación de asistentes
- **Ejemplo:**

  ```json
  {
    "message": "Límite de asistentes alcanzado"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error al crear asistente
- **Ejemplo:**

  ```json
  {
    "message": "Error al crear asistente"
  }
  ```

### Crear Asistente (Admin)

**POST** `/assistant/admin`

**Cuerpo de la Solicitud:**
```json
{
  "name": "Asistente Personalizado",
  "instructions": "Instrucciones personalizadas del sistema",
  "model": "gpt-3.5-turbo-0125",
  "tools": [{"type": "code_interpreter"}]
}
```

**Ejemplo de Uso:**
```bash
curl -X POST http://localhost:3000/api/v1/assistant/admin \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_acceso_admin>" \
  -d '{
    "name": "Asistente Personalizado",
    "instructions": "Instrucciones personalizadas del sistema",
    "model": "gpt-3.5-turbo-0125",
    "tools": [{"type": "code_interpreter"}]
  }'
```

#### ✅ 201 Creado - Asistente Creado Exitosamente

- **Content-Type:** `application/json`
- **Descripción:** Asistente creado con configuración personalizada
- **Ejemplo:**

  ```json
  {
    "message": "Asistente Asistente Personalizado con id asst_xyz789 creado exitosamente"
  }
  ```

#### ❌ 401 No Autorizado

- **Content-Type:** `application/json`
- **Descripción:** Se requieren privilegios de administrador
- **Ejemplo:**

  ```json
  {
    "message": "Se requieren privilegios de administrador"
  }
  ```

#### ❌ 429 Demasiadas Solicitudes - Límite Alcanzado

- **Content-Type:** `application/json`
- **Descripción:** Se ha alcanzado el límite de creación de asistentes
- **Ejemplo:**

  ```json
  {
    "message": "Límite de asistentes alcanzado"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error al crear asistente
- **Ejemplo:**

  ```json
  {
    "message": "Error al crear asistente"
  }
  ```

## Hilos

### Resumen de Endpoints

| Método  | Endpoint              | Descripción                                    |
|---------|-----------------------|------------------------------------------------|
| GET     | `/threads`            | Obtener todos los hilos (cualquier usuario)    |
| GET     | `/thread`             | Obtener hilos del usuario autenticado         |
| GET     | `/thread/:gptId`      | Obtener mensajes de un hilo específico         |
| POST    | `/thread`             | Crear nuevo hilo con mensaje inicial           |
| POST    | `/thread/:gptId`      | Agregar mensaje a hilo existente               |
| PUT     | `/thread/:gptId`      | Actualizar nombre del hilo                     |
| DELETE  | `/thread/:gptId`      | Eliminar hilo específico                       |
| DELETE  | `/thread`             | Eliminar todos los hilos del usuario           |

### Operaciones de Hilo

| Método  | Endpoint              | Descripción                                    | Nivel de Acceso |
|---------|-----------------------|------------------------------------------------|-----------------|
| GET     | `/threads`            | Obtener todos los hilos (cualquier usuario)    | Autenticado     |
| GET     | `/thread`             | Obtener hilos del usuario autenticado         | Autenticado     |
| GET     | `/thread/:gptId`      | Obtener mensajes de un hilo específico         | Autenticado     |
| POST    | `/thread`             | Crear nuevo hilo con mensaje inicial           | Autenticado     |
| POST    | `/thread/:gptId`      | Agregar mensaje a hilo existente               | Autenticado     |
| PUT     | `/thread/:gptId`      | Actualizar nombre del hilo                     | Autenticado     |
| DELETE  | `/thread/:gptId`      | Eliminar hilo específico                       | Autenticado     |
| DELETE  | `/thread`             | Eliminar todos los hilos del usuario           | Autenticado     |

### Crear Hilo

**POST** `/thread`

### Agregar Mensaje a Hilo

**POST** `/thread/:gptId`

**Cuerpo de la Solicitud:**
```json
{
  "content": "¿Cuáles son los requisitos específicos para las políticas de retención de datos?",
  "assistantId": "1"
}
```

**Ejemplo de Uso:**
```bash
curl -X POST http://localhost:3000/api/v1/thread/hilo_xyz789 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_acceso>" \
  -d '{
    "content": "¿Cuáles son los requisitos específicos para las políticas de retención de datos?",
    "assistantId": "1"
  }'
```

#### ✅ 201 Creado - Mensaje Agregado Exitosamente

- **Content-Type:** `application/json`
- **Descripción:** Mensaje agregado al hilo exitosamente
- **Ejemplo:**

  ```json
  {
    "message": "Mensaje agregado exitosamente"
  }
  ```

#### ❌ 400 Solicitud Incorrecta - Mensaje Muy Corto

- **Content-Type:** `application/json`
- **Descripción:** El mensaje debe tener al menos 15 palabras o 40 caracteres
- **Ejemplo:**

  ```json
  {
    "error": "El mensaje debe tener al menos 15 palabras o 40 caracteres"
  }
  ```

#### ❌ 500 Error Interno del Servidor

- **Content-Type:** `application/json`
- **Descripción:** Error al crear mensaje o hilo
- **Ejemplo:**

  ```json
  {
    "error": "Error al crear mensaje o hilo"
  }
  ```

## Modelos de Datos

### Modelo de Asistente

El modelo `Assistant` almacena metadatos con identificadores locales y de OpenAI:

| Campo          | Tipo        | Descripción                                      |
|----------------|-------------|--------------------------------------------------|
| `assistantId`  | STRING(50)  | Identificador de asistente de OpenAI             |
| `name`         | STRING(100) | Nombre visible del asistente                    |
| `instructions` | TEXT        | Instrucciones/sistema prompt                      |
| `tools`        | TEXT        | Configuración serializada de herramientas       |
| `model`        | STRING(100) | Identificador del modelo GPT                     |
| `status`       | ENUM        | "ACTIVE" o "INACTIVE"                            |

## Autenticación y Límites

### Límites de Asistentes

La creación de asistentes está limitada por configuración a través del middleware `assistantlimitReached`, que consulta el modelo de configuración antes de permitir la creación.

### Validación de Mensajes

Todos los mensajes deben cumplir requisitos mínimos:
- Mínimo 15 palabras o 40 caracteres
- Validado en las funciones `createThread()` y `addNewMessage()`
- Devuelve 400 Bad Request si la validación falla

## Integración con OpenAI

El sistema utiliza la API Beta de OpenAI Assistants con las siguientes operaciones:

| Operación        | Método OpenAI                              |
|------------------|--------------------------------------------|
| Crear asistente  | `openai.beta.assistants.create()`         |
| Actualizar asistente | `openai.beta.assistants.update()`       |
| Crear hilo       | `openai.beta.threads.create()`            |
| Agregar mensaje  | `openai.beta.threads.messages.create()`   |
| Crear run        | `openai.beta.threads.runs.create()`      |
| Listar mensajes  | `openai.beta.threads.messages.list()`    |

## Notas

- Todas las operaciones de asistentes e hilos requieren autenticación
- El sistema mantiene identificadores duales: IDs locales y de OpenAI
- La validación de mensajes previene envíos triviales que consuman recursos de la API
- Los endpoints de admin requieren el middleware adicional `verifyAdmin`
- El sistema utiliza polling síncrono para respuestas de asistentes, asegurando la finalización antes de responder al cliente
- Los límites por configuración aplican cuotas de recursos para la creación de asistentes

