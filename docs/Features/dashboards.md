---
sidebar_position: 8
tags:
  - status
  - dashboards
  - visualization
  - monitoring
keywords:
  - dashboards
  - visualization
  - monitoring
  - metrics
  - Grafana
  - panels
  - charts
  - real-time
  - alerts
  - STATUS
  - compliance dashboards
authors:
  - name: "STATUS Team"
    title: "Project Contributors"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Dashboards

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

Dashboards provide powerful visualization capabilities for monitoring compliance metrics, system health, and key performance indicators. This section will guide you through understanding, creating, and managing dashboards.

## Overview

STATUS dashboards, powered by Grafana, allow you to:

- **Visualize Data**: Create charts, graphs, and tables
- **Monitor Real-Time**: Watch compliance status in real-time
- **Set Up Alerts**: Configure alerts for compliance violations
- **Customize Layouts**: Arrange panels to your needs
- **Share Insights**: Share dashboards with team members

<div align="center">
![Dashboard Overview](/img/dashboards/dashboardOverview.png)
**Figure 1:** *STATUS dashboard example.*
</div>

<Alert>
Dashboards are built on Grafana but integrated with STATUS for seamless access and authentication. You don't need a separate Grafana account.
</Alert>

## Access Dashboards

To access dashboards:

1. Navigate to **Dashboards** section from main navigation
2. View the list of available dashboards
3. Click on a dashboard name to open it
4. The dashboard will open in a new tab with Grafana interface

<div align="center">
![Dashboards List](/img/dashboards/dashboardsList.png)
**Figure 2:** *Dashboards list view.*
</div>

<Disclaimer>
Some dashboards may require specific permissions to access. Contact your administrator if you cannot access a dashboard.
</Disclaimer>

## Dashboard Types

STATUS provides different types of dashboards:

### Compliance Dashboards

Monitor overall compliance status:

- **Compliance Percentage**: Overall compliance rate
- **Control Status**: Status of individual controls
- **Trends Over Time**: Compliance trends
- **Scope Breakdown**: Compliance by scope

### System Dashboards

Monitor system health and performance:

- **System Status**: Overall system health
- **Performance Metrics**: Response times, throughput
- **Resource Usage**: CPU, memory, disk usage
- **Error Rates**: Error frequency and types

### Operational Dashboards

Monitor operational metrics:

- **Computation Status**: Execution status of computations
- **Datasource Health**: Status of datasources
- **Integration Health**: Status of integrations
- **Alert Summary**: Summary of active alerts

<div align="center">
![Dashboard Types](/img/dashboards/dashboardTypes.png)
**Figure 3:** *Different dashboard types.*
</div>

## Create a Dashboard

To create a new dashboard:

1. Navigate to **Dashboards** section
2. Click on ***Create Dashboard*** button
3. Configure the dashboard:
   - **Name**: Descriptive name for the dashboard
   - **Description**: What the dashboard displays
   - **Folder**: Organize dashboard in a folder
   - **Tags**: Add tags for easy searching
4. Click ***Save*** to create the dashboard

<div align="center">
![Create Dashboard Form](/img/dashboards/createDashboardForm.png)
**Figure 4:** *Create dashboard form.*
</div>

### Dashboard Editor

After creating a dashboard, you'll enter the dashboard editor:

1. **Add Panels**: Click ***Add*** to add new panels
2. **Configure Panels**: Set up queries, visualizations, and options
3. **Arrange Layout**: Drag and drop panels to arrange them
4. **Set Variables**: Create template variables for dynamic dashboards
5. **Save Dashboard**: Click ***Save*** to save your changes

<div align="center">
![Dashboard Editor](/img/dashboards/dashboardEditor.png)
**Figure 5:** *Dashboard editor interface.*
</div>

<Disclaimer>
Grafana automatically saves drafts. Make sure to save your dashboard explicitly when you're done to make it available to others.
</Disclaimer>

## Dashboard Panels

Panels are the building blocks of dashboards. Each panel displays data in a specific way.

### Panel Types

STATUS supports various panel types through Grafana:

#### Time Series

Visualize data over time:

- **Use Cases**: Trends over time, historical data
- **Features**: Multiple series, thresholds, annotations
- **Customization**: Colors, line styles, area fills

<div align="center">
![Time Series Panel](/img/dashboards/timeSeriesPanel.png)
**Figure 6:** *Time series panel example.*
</div>

#### Gauge

Display current values with thresholds:

- **Use Cases**: Current status, key metrics
- **Features**: Thresholds, color coding, min/max
- **Customization**: Orientation, labels, tick marks

#### Stat Panel

Display key metrics at a glance:

- **Use Cases**: Important numbers, summaries
- **Features**: Large display, sparklines, color coding
- **Customization**: Font size, colors, prefixes/suffixes

<div align="center">
![Stat Panel](/img/dashboards/statPanel.png)
**Figure 7:** *Stat panel example.*
</div>

#### Table

Display data in tabular format:

- **Use Cases**: Detailed data, multiple fields
- **Features**: Sorting, filtering, pagination
- **Customization**: Column widths, colors, formatting

#### Pie Chart

Show proportions and percentages:

- **Use Cases**: Distribution, breakdowns
- **Features**: Multiple categories, legends
- **Customization**: Colors, labels, hole size

<div align="center">
![Pie Chart Panel](/img/dashboards/pieChartPanel.png)
**Figure 8:** *Pie chart panel example.*
</div>

#### Heatmap

Show data density and patterns:

- **Use Cases**: Patterns, distributions over time
- **Features**: Color gradients, multiple axes
- **Customization**: Color schemes, bucket sizes

### Add a Panel

To add a panel to a dashboard:

1. Open dashboard in edit mode
2. Click ***Add*** button in the top toolbar
3. Select panel type from the panel picker
4. The new panel will appear on the dashboard

### Configure a Panel

To configure a panel:

1. Click on the panel title
2. Select ***Edit*** from the dropdown menu
3. Configure panel settings:
   - **Title**: Panel title
   - **Queries**: Data queries
   - **Visualization Options**: Type-specific options
   - **Thresholds**: Set warning/critical thresholds
   - **Links**: Add drill-down links
4. Click ***Apply*** to save changes

<div align="center">
![Panel Configuration](/img/dashboards/panelConfiguration.png)
**Figure 9:** *Panel configuration dialog.*
</div>

<Alert>
Each panel type has specific configuration options. Refer to Grafana documentation for detailed options for each panel type.
</Alert>

## Dashboard Queries

Queries define what data is displayed in panels.

### Query Types

STATUS data can be queried in different ways:

#### PostgreSQL Queries

Query relational data from PostgreSQL:

```sql
SELECT
  date_trunc('day', created_at) as time,
  COUNT(*) as total,
  SUM(CASE WHEN value = true THEN 1 ELSE 0 END) as passed
FROM computations
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY date_trunc('day', created_at)
ORDER BY time;
```

#### MongoDB Queries

Query document data from MongoDB:

```javascript
db.computations.aggregate([
  {
    $match: {
      createdAt: { $gte: ISODate("2025-01-01") }
    }
  },
  {
    $group: {
      _id: "$controlId",
      count: { $sum: 1 },
      passed: { $sum: { $cond: ["$value", 1, 0] } }
    }
  }
])
```

#### Grafana Datasource Queries

Use STATUS as a datasource in Grafana:

1. Add STATUS as a datasource in Grafana
2. Select the datasource in panel query editor
3. Write your query using SQL or MongoDB syntax
4. Configure time range and other options

<div align="center">
![Query Editor](/img/dashboards/queryEditor.png)
**Figure 10:** *Grafana query editor.*
</div>

## Dashboard Variables

Variables make dashboards dynamic and reusable.

### Variable Types

#### Query Variable

Populate variable from a query:

```sql
SELECT DISTINCT catalog_name
FROM catalogs
ORDER BY catalog_name;
```

#### Custom Variable

Define variable values manually:

- Production
- Staging
- Development

#### Interval Variable

Time interval options:

- 1h, 6h, 12h, 24h, 7d, 30d

#### Constant Variable

Fixed values for reuse:

- Organization name
- Default thresholds

<div align="center">
![Variable Configuration](/img/dashboards/variableConfiguration.png)
**Figure 11:** *Variable configuration dialog.*
</div>

### Create a Variable

To create a variable:

1. Open dashboard in edit mode
2. Click ***Dashboard settings*** (gear icon)
3. Go to ***Variables*** tab
4. Click ***Add variable***
5. Configure the variable:
   - **Name**: Variable name
   - **Type**: Variable type
   - **Query/Data Source**: Query or custom values
   - **Selection Options**: Multi-select, include all option
6. Click ***Update*** to save variable

<Disclaimer>
Variables are referenced in queries as `$variable_name`. Make sure to use the correct syntax in your queries.
</Disclaimer>

## Dashboard Alerts

Alerts notify you when specific conditions are met.

### Alert Types

#### Threshold Alerts

Alert when values exceed thresholds:

- **Warning**: Value exceeds warning threshold
- **Critical**: Value exceeds critical threshold
- **OK**: Value returns to normal range

#### No Data Alerts

Alert when no data is received:

- **No Data**: No data for specified time period
- **OK**: Data reception resumes

#### Query Alerts

Alert based on query conditions:

- Custom conditions using query results
- Complex logic with multiple conditions

<div align="center">
![Alert Configuration](/img/dashboards/alertConfiguration.png)
**Figure 12:** *Alert configuration panel.*
</div>

### Create an Alert

To create an alert on a panel:

1. Open dashboard in edit mode
2. Click on a panel and select ***Edit***
3. Go to ***Alert*** tab
4. Configure the alert:
   - **Rule Name**: Alert name
   - **Condition**: Alert condition (query, thresholds)
   - **Frequency**: How often to evaluate
   - **No Data State**: What to do when no data
   - **Notification Channels**: Where to send notifications
5. Click ***Apply*** to save alert

### Notification Channels

STATUS supports various notification channels:

- **Email**: Send alerts via email
- **Slack**: Send alerts to Slack channels
- **Webhook**: Send alerts to webhook URLs
- **Custom**: Custom notification integrations

<Alert>
Notification channels must be configured in Grafana. Contact your administrator if you need to set up new notification channels.
</Alert>

## Manage Dashboards

Once created, you can manage your dashboards:

### Edit Dashboard

To edit a dashboard:

1. Navigate to **Dashboards** section
2. Click on the dashboard to open it
3. Click ***Edit*** (gear icon) to enter edit mode
4. Make your changes
5. Click ***Save*** to save changes

### Duplicate Dashboard

To duplicate a dashboard:

1. Navigate to **Dashboards** section
2. Click on the dashboard to open it
3. Click ***Share*** (share icon)
4. Select ***Save as***
5. Enter new dashboard name
6. Click ***Save***

### Delete Dashboard

To delete a dashboard:

1. Navigate to **Dashboards** section
2. Click on the dashboard to open it
3. Click ***Dashboard settings*** (gear icon)
4. Click ***Delete dashboard***
5. Confirm deletion

<Disclaimer>
Deleting a dashboard cannot be undone. Make sure you have exported a copy if you might need it later.
</Disclaimer>

### Export Dashboard

To export a dashboard:

1. Navigate to **Dashboards** section
2. Click on the dashboard to open it
3. Click ***Share*** (share icon)
4. Select ***Export***
5. Choose export format (JSON, etc.)
6. Download the file

### Import Dashboard

To import a dashboard:

1. Navigate to **Dashboards** section
2. Click ***Import Dashboard*** button
3. Upload the JSON file or paste JSON content
4. Configure import options
5. Click ***Import***

<div align="center">
![Import Dashboard](/img/dashboards/importDashboard.png)
**Figure 13:** *Import dashboard dialog.*
</div>

## Best Practices

Follow these best practices for effective dashboards:

1. **Clear Purpose**: Define clear purpose for each dashboard
2. **Target Audience**: Design for intended users
3. **Optimize Performance**: Use efficient queries and appropriate time ranges
4. **Use Variables**: Make dashboards reusable with variables
5. **Logical Layout**: Arrange panels logically (left-to-right, top-to-bottom)
6. **Consistent Naming**: Use consistent naming conventions
7. **Document Dashboards**: Add descriptions for dashboards and panels
8. **Monitor Alerts**: Regularly review and update alerts

<Disclaimer>
Effective dashboards require careful design and ongoing maintenance. Invest time in understanding your data and users' needs.
</Disclaimer>

## Troubleshooting

### Dashboard Not Loading

If a dashboard is not loading:

1. Check network connectivity
2. Verify datasource connections
3. Review browser console for errors
4. Check Grafana logs
5. Ensure you have necessary permissions

### Queries Not Working

If queries are not working:

1. Verify query syntax is correct
2. Check datasource is connected
3. Ensure data exists for the time range
4. Review query execution logs
5. Test query in query editor

### Alerts Not Firing

If alerts are not firing:

1. Verify alert conditions are correct
2. Check notification channels are configured
3. Ensure alerts are enabled
4. Review alert evaluation logs
5. Test alert with manual evaluation

<Alert>
For complex issues, check Grafana documentation or contact support for assistance.
</Alert>
