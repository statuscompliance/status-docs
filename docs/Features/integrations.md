---
sidebar_position: 6
tags:
  - status
  - integrations
  - Node-RED
  - Grafana
  - OpenAI
keywords:
  - integrations
  - Node-RED
  - Grafana
  - OpenAI
  - AI assistants
  - workflow orchestration
  - data visualization
  - dashboards
  - compliance monitoring
  - registry service
  - external services
  - STATUS
  - service integration
authors:
  - name: "STATUS Team"
    title: "Project Contributors"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# External Service Integrations

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

The STATUS system integrates with multiple external services to provide comprehensive functionality for compliance monitoring, workflow automation, data visualization, and AI-powered analysis. This section will guide you through understanding and configuring these integrations.

## Overview

STATUS provides seamless integration with:

- **Node-RED**: Workflow orchestration and data processing
- **Grafana**: Data visualization and monitoring dashboards
- **OpenAI**: AI-powered assistants and natural language processing
- **Registry Service**: Centralized guarantee data storage

<div align="center">
![Integrations Overview](/img/integrations/integrationsOverview.png)
**Figure 1:** *STATUS external service integrations.*
</div>

<Alert>
Most integrations require additional configuration. Make sure you have the necessary credentials and access rights before setting up integrations.
</Alert>

## Node-RED Integration

Node-RED is a powerful tool for visually programming and automating workflows. STATUS uses Node-RED to:

- Execute compliance computations
- Process and transform data
- Handle events and trigger actions
- Create custom integration flows

### How It Works

Node-RED flows are linked to controls through **Mashup IDs**. When a computation is triggered:

1. STATUS sends a request to Node-RED with the control's Mashup ID
2. Node-RED executes the corresponding flow
3. The flow collects evidence from datasources
4. Evidence is processed according to the control's logic
5. Results are returned to STATUS as computation data

<div align="center">
![Node-RED Flow](/img/integrations/nodeRedFlow.png)
**Figure 2:** *Node-RED integration flow.*
</div>

### View Node-RED Flows

To view Node-RED flows linked to controls:

1. Navigate to a **Control Details** page
2. Click the ***View Node-RED Flow*** link
3. You will be redirected to the Node-RED interface
4. The flow associated with the control will be displayed

<Disclaimer>
You need access to the Node-RED server to view and edit flows. Contact your administrator if you don't have access.
</Disclaimer>

### Create a New Flow

To create a new Node-RED flow for a control:

1. Access the Node-RED interface
2. Create a new flow
3. Design your flow using Node-RED's visual editor
4. Add nodes for data collection, processing, and output
5. Configure the flow to return results in the expected format
6. Deploy the flow
7. Copy the flow ID
8. Link the flow to a control by setting the Mashup ID

<div align="center">
![Node-RED Editor](/img/integrations/nodeRedEditor.png)
**Figure 3:** *Node-RED visual editor.*
</div>

### Flow Input/Output Format

STATUS expects flows to return data in the following format:

```json
{
  "value": true,
  "evidences": [
    {
      "key": "evidence_key",
      "value": "evidence_value",
      "result": true,
      "from": "2025-01-01T08:00:00",
      "to": "2025-01-01T17:30:00"
    }
  ]
}
```

<Alert>
Ensure your Node-RED flows return data in the correct format. Incorrect formats will cause computation failures.
</Alert>

### Common Node-RED Patterns

Some common patterns for Node-RED flows in STATUS:

- **HTTP Request Nodes**: Call external APIs to collect evidence
- **Function Nodes**: Transform and process data
- **Database Nodes**: Query databases for evidence
- **Filter Nodes**: Filter and validate data
- **Debug Nodes**: Debug and monitor flow execution

## Grafana Integration

Grafana provides powerful data visualization and monitoring capabilities for STATUS.

### Features

The Grafana integration allows you to:

- **Create Dashboards**: Visualize compliance metrics and trends
- **Real-Time Monitoring**: Monitor system health and compliance status
- **Alert Management**: Configure alerts for compliance violations
- **Custom Visualizations**: Create charts, graphs, and tables
- **Template Variables**: Use dynamic variables for flexible dashboards

<div align="center">
![Grafana Dashboard](/img/integrations/grafanaDashboard.png)
**Figure 4:** *Grafana dashboard example.*
</div>

### Access Grafana

To access Grafana:

1. Navigate to the **Dashboards** section in STATUS
2. Click on a dashboard to open it
3. You will be redirected to Grafana with the dashboard pre-loaded

<Disclaimer>
Grafana uses STATUS authentication for seamless access. You will be automatically logged in to Grafana when accessing it from STATUS.
</Disclaimer>

### Create a Dashboard

To create a new Grafana dashboard:

1. Navigate to the **Dashboards** section
2. Click the ***Create Dashboard*** button
3. Configure the dashboard:
   - **Name**: Descriptive name for the dashboard
   - **Description**: What the dashboard displays
   - **Panels**: Add panels and configure visualizations
   - **Queries**: Set up data queries
   - **Variables**: Add template variables if needed
4. Click ***Save*** to create the dashboard

<div align="center">
![Create Dashboard](/img/integrations/createDashboard.png)
**Figure 5:** *Create dashboard form.*
</div>

### Dashboard Panels

Dashboards are composed of panels that display data:

- **Time Series**: Visualize data over time
- **Gauges**: Display current values with thresholds
- **Tables**: Show data in tabular format
- **Stat Panels**: Display key metrics
- **Heatmaps**: Show data density and patterns

<Alert>
Use Grafana's powerful query editor to create complex queries that aggregate and transform your compliance data.
</Alert>

### Alerts

Grafana allows you to configure alerts based on your data:

1. Configure alert conditions based on thresholds
2. Set up notification channels (email, Slack, etc.)
3. Define evaluation intervals and grouping
4. Test alerts to ensure they work correctly

<div align="center">
![Alert Configuration](/img/integrations/alertConfiguration.png)
**Figure 6:** *Grafana alert configuration.*
</div>

<Disclaimer>
Alerts are managed in Grafana. Make sure your Grafana instance has access to notification channels you want to use.
</Disclaimer>

### Dashboards Management

You can manage dashboards from the STATUS interface:

- **Edit Dashboard**: Modify existing dashboards
- **Delete Dashboard**: Remove dashboards you no longer need
- **Export Dashboard**: Export dashboard configuration
- **Import Dashboard**: Import dashboards from files
- **View History**: Track changes to dashboards

## OpenAI Integration

STATUS integrates with OpenAI to provide AI-powered capabilities for compliance management.

### AI Assistants

The OpenAI integration allows you to:

- **Create Assistants**: Build intelligent assistants for specific compliance tasks
- **Natural Language Processing**: Process and analyze compliance documents
- **Automated Insights**: Generate compliance recommendations
- **Conversation Management**: Maintain context-aware conversations

<div align="center">
![AI Assistant](/img/integrations/aiAssistant.png)
**Figure 7:** *AI assistant interface.*
</div>

### Create an Assistant

To create a new AI assistant:

1. Navigate to the **Assistants** section
2. Click the ***Create Assistant*** button
3. Configure the assistant:
   - **Name**: Descriptive name for the assistant
   - **Description**: What the assistant does
   - **Instructions**: Guidelines for the assistant's behavior
   - **Model**: Select the OpenAI model to use
   - **Tools**: Enable tools like code interpreter, file search, etc.
   - **Knowledge Base**: Upload relevant documents
4. Click ***Save*** to create the assistant

<div align="center">
![Create Assistant](/img/integrations/createAssistant.png)
**Figure 8:** *Create assistant form.*
</div>

### Chat with Assistant

To interact with an AI assistant:

1. Navigate to the **Assistants** section
2. Select an assistant
3. Type your message in the chat interface
4. The assistant will respond based on its instructions and knowledge
5. Continue the conversation as needed

<Alert>
AI assistants maintain conversation context, allowing for natural, multi-turn conversations about compliance topics.
</Alert>

### Assistant Capabilities

AI assistants can:

- **Answer Questions**: Answer compliance-related questions
- **Analyze Documents**: Analyze compliance documents and regulations
- **Generate Reports**: Generate compliance reports and summaries
- **Recommend Actions**: Suggest actions for compliance issues
- **Explain Concepts**: Explain complex compliance concepts

### Manage Conversations

You can manage your conversations with assistants:

- **View History**: See past conversations
- **Delete Conversations**: Remove conversations you no longer need
- **Export Conversations**: Export conversations for documentation
- **Archive Conversations**: Archive conversations for later reference

<div align="center">
![Conversation History](/img/integrations/conversationHistory.png)
**Figure 9:** *Conversation history view.*
</div>

### Configure OpenAI API

To use the OpenAI integration, you need to:

1. Obtain an OpenAI API key from https://platform.openai.com
2. Configure the API key in STATUS settings
3. Select the default model to use
4. Configure rate limits and usage policies

<Disclaimer>
OpenAI API usage incurs costs. Monitor your usage and set appropriate limits to control costs.
</Disclaimer>

## Registry Service Integration

The Registry Service provides centralized storage and management of guarantee points.

### Features

The Registry Service offers:

- **Centralized Storage**: All guarantee points in one place
- **Data Synchronization**: Sync compliance data across services
- **Historical Tracking**: Maintain historical compliance records
- **Query Capabilities**: Advanced querying of compliance data
- **API Access**: RESTful API for external access

<div align="center">
![Registry Service](/img/integrations/registryService.png)
**Figure 10:** *Registry service architecture.*
</div>

### Access Registry Data

Guarantee points are automatically stored in the Registry Service when computations complete. You can:

- **Query Data**: Query guarantee points via API
- **Filter Results**: Filter by various criteria
- **Aggregate Data**: Aggregate data for analysis
- **Export Data**: Export data for external tools

### Registry API

The Registry Service provides a RESTful API for accessing data:

```bash
# Query guarantee points
GET /api/registry/guarantees?control_id=xxx&from=2025-01-01&to=2025-12-31

# Get aggregated compliance
GET /api/registry/compliance?catalog_id=xxx&scope=environment:production

# Get historical trends
GET /api/registry/trends?control_id=xxx&period=monthly
```

<Alert>
Registry API authentication uses STATUS tokens. Ensure you have valid authentication credentials when calling the API.
</Alert>

## Best Practices

Follow these best practices for effective use of integrations:

1. **Security**: Secure all integrations with proper authentication
2. **Monitoring**: Monitor integration health and performance
3. **Error Handling**: Implement proper error handling in flows and dashboards
4. **Documentation**: Document your flows, dashboards, and assistants
5. **Testing**: Test integrations thoroughly before putting them in production
6. **Rate Limits**: Respect rate limits for external APIs
7. **Cost Management**: Monitor and manage costs, especially for OpenAI
8. **Backup**: Back up important flows, dashboards, and configurations

<Alert>
Integrations greatly extend STATUS's capabilities but require careful configuration and monitoring. Invest time in understanding each integration and its configuration options.
</Alert>

## Troubleshooting

### Node-RED Flows Not Executing

If Node-RED flows are not executing:

1. Check the Node-RED server is accessible
2. Verify the Mashup ID is correct
3. Check flow logs for errors
4. Ensure datasources are accessible from Node-RED

### Grafana Dashboards Not Loading

If Grafana dashboards are not loading:

1. Check the Grafana URL is correct
2. Verify authentication between STATUS and Grafana
3. Check data sources are configured in Grafana
4. Review Grafana logs for errors

### OpenAI Assistants Not Responding

If OpenAI assistants are not responding:

1. Verify the OpenAI API key is valid
2. Check you have available API credits
3. Review the assistant configuration
4. Check network connectivity to OpenAI

<Disclaimer>
For complex integration issues, check the logs or contact support for assistance.
</Disclaimer>
