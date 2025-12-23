---
sidebar_position: 1
tags:
  - status
  - introducción
  - características
keywords:
  - STATUS
  - guía de usuario
  - gestión de cumplimiento
  - autenticación
  - asistentes de IA
  - gestión de datos
  - integraciones
  - visión general de características
authors:
  - name: "Equipo STATUS"
    title: "Colaboradores del Proyecto"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Introducción

import Alert from '@site/src/components/Alert.js';

Esta sección es una guía de usuario detallada para usar STATUS. Encontrará aquí cada característica y cómo usarla, con recomendaciones y consejos. Por favor, no olvide verificar la documentación de solución de problemas en caso de tener dificultades en lugar de intentar aprender sobre las características.

<Alert>
Tenga en cuenta que STATUS aún está en desarrollo activo, así que no olvide verificar en la guía de usuario si lo que está buscando está actualmente soportado.
</Alert>

## Visión General

STATUS es una plataforma integral de gestión de cumplimiento que ayuda a las organizaciones a rastrear, monitorear y verificar su estado de cumplimiento a través de varios marcos y regulaciones. La plataforma proporciona monitoreo en tiempo real, flujos de trabajo automatizados y análisis impulsado por IA para simplificar los procesos de cumplimiento.

## Navegación

STATUS cuenta con un sistema de navegación moderno e intuitivo diseñado para ayudarle a acceder rápidamente a la información que necesita. La navegación principal incluye:

- **Dashboard**: Visión general en tiempo real del estado de cumplimiento y métricas
- **Catálogos**: Organizar y gestionar catálogos de cumplimiento y controles
- **Ámbitos**: Definir y gestionar límites de ámbito para el cumplimiento
- **Dashboards**: Crear y personalizar dashboards de visualización
- **Fuentes de Datos**: Configurar y gestionar fuentes de datos
- **Secretos**: Almacenar y gestionar credenciales sensibles de forma segura

<div align="center">
![Elementos de navegación](/img/status/navigationMenu.png)
**Figura 1:** *Elementos de navegación de STATUS.*
</div>

## Características Principales

### Gestión de Cumplimiento
- **Estructura de Catálogos**: Organización jerárquica de requisitos de cumplimiento
- **Gestión de Controles**: Definir y gestionar controles de cumplimiento individuales
- **Resultados de Cálculos**: Ver y analizar resultados de cálculos de cumplimiento
- **Puntos de Garantía**: Rastrear puntos de verificación de cumplimiento a lo largo del tiempo

### Autenticación y Autorización
- **Autenticación Basada en JWT**: Sistema de autenticación seguro basado en tokens
- **Autenticación de Dos Factores**: Soporte opcional de TOTP para seguridad mejorada
- **Control de Acceso Basado en Roles**: Permisos granulares con roles USER, DEVELOPER y ADMIN
- **Cuentas de Servicio**: Crear cuentas no interactivas para integraciones

### Gestión de Datos
- **Persistencia Políglota**: PostgreSQL, MongoDB y Redis para almacenamiento optimizado de datos
- **Vinculación de Datos**: Conectar y correlacionar datos de diferentes fuentes
- **Consultas Flexibles**: Capacidades de consulta avanzadas para datos de cumplimiento

### Integraciones
- **Node-RED**: Automatizar flujos de trabajo de cumplimiento y procesamiento de datos
- **Grafana**: Crear dashboards de visualización poderosos
- **OpenAI**: Asistentes de cumplimiento impulsados por IA y análisis
- **Servicio de Registro**: Almacenamiento centralizado de datos de garantía

### Asistentes de IA
- **Procesamiento de Lenguaje Natural**: Analizar documentos y requisitos de cumplimiento
- **Gestión de Conversaciones**: Conversaciones conscientes del contexto para consultas de cumplimiento
- **Insights Automatizados**: Generar recomendaciones e informes de cumplimiento

## Para Comenzar

Para comenzar con STATUS, necesita:

1. **Crear una cuenta**: Registrarse usando el formulario de inicio de sesión con credenciales seguras
2. **Configurar su perfil**: Configurar su perfil y preferencias de autenticación
3. **Crear un catálogo**: Definir la estructura de su catálogo de cumplimiento
4. **Añadir controles**: Crear controles de cumplimiento dentro de su catálogo
5. **Configurar fuentes de datos**: Conectarse a sus fuentes de datos
6. **Ver cálculos**: Analizar resultados de cálculos de cumplimiento
7. **Crear dashboards**: Crear dashboards de visualización para monitoreo

## Estructura de Características

Cada característica en STATUS está documentada con las siguientes secciones:

- **Visión General**: Descripción de alto nivel de la característica
- **Capacidades Principales**: Funcionalidades principales proporcionadas por la característica
- **Instrucciones de Uso**: Guía paso a paso sobre cómo usar la característica
- **Mejores Prácticas**: Recomendaciones para un uso óptimo
- **Solución de Problemas**: Problemas comunes y sus soluciones

<Alert>
Todas las características requieren autenticación. Asegúrese de haber iniciado sesión antes de acceder a cualquier característica.
</Alert>
