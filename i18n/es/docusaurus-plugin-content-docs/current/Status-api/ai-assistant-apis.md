# Asistente de IA

> ⚠️ **OBSOLETO**: Esta funcionalidad está obsoleta y será eliminada en futuras versiones. Por favor, consulta la documentación y endpoints actuales antes de implementar integraciones nuevas.

## Descripción General

El sistema de Asistente de IA proporciona APIs REST para crear y gestionar asistentes de OpenAI, hilos de conversación y mensajes. Todos los endpoints requieren autenticación y están integrados con la API Beta de OpenAI Assistants.

## Asistente

### Ruta Base

`/assistant`

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

**Respuesta (201 Creado):**
```json
{
  "message": "Assistant Asistente de Cumplimiento with id asst_abc123 created successfully"
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

## Hilos

### Ruta Base

`/thread`

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

**Cuerpo de la Solicitud:**
```json
{
  "assistantId": "1",
  "content": "Necesito ayuda para entender los requisitos de cumplimiento para actividades de procesamiento de datos"
}
```

**Respuesta (201 Creado):**
```json
{
  "id": "thread_xyz789",
  "message": "Thread created successfully"
}
```

### Agregar Mensaje a Hilo

**POST** `/thread/:gptId`

**Cuerpo de la Solicitud:**
```json
{
  "content": "¿Cuáles son los requisitos específicos para las políticas de retención de datos?",
  "assistantId": "1"
}
```

**Respuesta (201 Creado):**
```json
{
  "message": "Message added successfully"
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

### Autenticación

Todos los endpoints requieren autenticación Bearer token mediante el middleware `verifyAuthority`.

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

## Configuración

Los límites de asistentes pueden gestionarse mediante configuración:

| Método  | Endpoint                            | Descripción                          |
|---------|-------------------------------------|--------------------------------------|
| GET     | `/config/assistant/limit`           | Obtener límite actual de asistentes  |
| PUT     | `/config/assistant/limit/:limit`    | Actualizar límite de asistentes      |

## Notas

- Todas las operaciones de asistentes e hilos requieren autenticación
- El sistema mantiene identificadores duales: IDs locales y de OpenAI
- La validación de mensajes previene envíos triviales que consuman recursos de la API
- Los endpoints de admin requieren el middleware adicional `verifyAdmin`
- El sistema utiliza polling síncrono para respuestas de asistentes, asegurando la finalización antes de responder al cliente
- Los límites por configuración aplican cuotas de recursos para la creación de asistentes
