---
sidebar_position: 3
tags:
  - status
  - compliance
  - calculation
  - engine
  - metrics
keywords:
  - compliance calculation
  - computation engine
  - guarantee points
  - time windowing
  - evidence processing
  - metrics aggregation
  - compliance scores
  - threshold evaluation
  - rolling windows
  - fixed windows
  - data collection
  - data validation
  - STATUS
  - compliance management
authors:
  - name: "STATUS Team"
    title: "Project Contributors"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Compliance Calculation Engine

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

The Compliance Calculation Engine is the core component of STATUS that processes computation evidence to generate compliance metrics and guarantee points with time-based analysis. This section will guide you through understanding how the engine works and how to interpret calculation results.

<Alert>
The Calculation Engine runs automatically based on your control definitions and scheduling. Make sure your datasources are properly configured to ensure accurate calculations.
</Alert>

## Overview

The Compliance Calculation Engine is responsible for:

- Processing computation evidence from datasources
- Calculating compliance status based on defined control rules
- Generating guarantee points for compliance verification
- Managing time windows for historical analysis
- Providing metrics for visualization and reporting

<div align="center">
![Calculation Engine Flow](/img/calculation/engineFlow.png)
**Figure 1:** *Calculation Engine data flow.*
</div>

## Compliance Metrics Calculation

The engine processes computation evidence to determine compliance status for each control.

### Evidence Processing

When a computation is executed, the engine:

1. **Collects Evidence**: Retrieves evidence from configured datasources
2. **Validates Data**: Verifies data integrity and completeness
3. **Applies Rules**: Processes evidence through control-defined rules
4. **Calculates Result**: Determines pass/fail status for the control
5. **Stores Result**: Persists the computation with all relevant metadata

<Disclaimer>
Computation results are only generated when all required evidence is available. If any required evidence is missing, the computation will fail.
</Disclaimer>

### Metric Aggregation

The engine can aggregate multiple computation results into comprehensive metrics:

- **Control-Level Metrics**: Individual control compliance status
- **Scope-Level Metrics**: Compliance by scope definition
- **Catalog-Level Metrics**: Overall compliance for entire catalogs
- **Time-Period Metrics**: Compliance trends over time

### Score Calculation

Compliance scores are calculated based on:

- **Pass Rate**: Percentage of computations that passed
- **Weighted Scores**: Custom weights for different evidence types
- **Threshold Comparison**: Comparison against defined compliance thresholds
- **Severity Adjustments**: Adjustments based on control severity

## Guarantee Point Management

Guarantee points are data points that verify compliance status at specific points in time.

### Point Generation

Guarantee points are generated automatically when:

- A computation completes successfully
- Time-based computations reach their scheduled execution
- Manual computations are triggered

Each guarantee point contains:

- **Timestamp**: When the computation was executed
- **Control ID**: Reference to the control being verified
- **Result**: Pass/fail status
- **Evidence**: All evidence used in the calculation
- **Scope**: The scope context for the computation
- **Metadata**: Additional information for tracking and analysis

<div align="center">
![Guarantee Point Structure](/img/calculation/guaranteePointStructure.png)
**Figure 2:** *Guarantee point data structure.*
</div>

### Temporal Storage

Guarantee points are stored with precise timestamps to enable:

- **Historical Analysis**: Track compliance trends over time
- **Time Windowing**: Analyze compliance in specific time periods
- **Auditing**: Verify compliance at any point in time
- **Reporting**: Generate historical compliance reports

## Time Windowing

The engine supports various time window configurations for analyzing compliance over different periods.

### Time Window Types

#### Rolling Windows

Calculate compliance over moving time periods that update continuously:

- **Daily Rolling**: Last 24 hours
- **Weekly Rolling**: Last 7 days
- **Monthly Rolling**: Last 30 days
- **Custom Rolling**: Custom number of days

<div align="center">
![Rolling Window Example](/img/calculation/rollingWindow.png)
**Figure 3:** *Rolling time window example.*
</div>

#### Fixed Windows

Analyze compliance in specific time ranges that don't change:

- **Daily**: Calendar days
- **Weekly**: Calendar weeks
- **Monthly**: Calendar months
- **Custom**: Specific date ranges

<div align="center">
![Fixed Window Example](/img/calculation/fixedWindow.png)
**Figure 4:** *Fixed time window example.*
</div>

### Aggregation Periods

When analyzing compliance over time, you can aggregate data by:

- **Hourly**: Useful for real-time monitoring
- **Daily**: Most common aggregation period
- **Weekly**: Good for trend analysis
- **Monthly**: Suitable for long-term reporting
- **Custom**: Define your own aggregation periods

<Disclaimer>
The aggregation period affects the granularity of your compliance metrics. Choose shorter periods for detailed analysis and longer periods for high-level trends.
</Disclaimer>

## Viewing Computation Results

You can view computation results in the Control Details page.

### Access Computation Results

To view computation results for a control:

1. Navigate to the **Catalogs** section
2. Select a catalog
3. Click on a control to view its details
4. Scroll down to the **Computation Results** section

<div align="center">
![Computation Results Table](/img/calculation/computationResultsTable.png)
**Figure 5:** *Computation results table.*
</div>

### Understanding Results

The computation results table shows:

- **Index**: Sequential number for reference (clickable to view details)
- **Result**: Pass/fail status with visual indicator
- **Scope**: The scope context for the computation
- **From**: Start time of the computation period
- **Additional Columns**: Custom columns based on your configuration

<Alert>
Click on the Index number to view detailed information about a computation, including all evidence used in the calculation.
</Alert>

### Filtering and Search

The computation results table supports:

- **Global Search**: Search across all columns
- **Column Visibility**: Show/hide specific columns
- **Pagination**: Navigate through large result sets
- **Export**: Export results to various formats

## Calculation Workflows

The Calculation Engine follows these workflows to generate compliance metrics.

### Automatic Calculation

Most calculations run automatically based on your control configuration:

1. **Schedule Creation**: Define computation schedules for each control
2. **Execution**: Engine executes computations at scheduled times
3. **Processing**: Evidence is collected and processed
4. **Result Storage**: Results are stored as guarantee points
5. **Notification**: Alerts are sent if computation fails

<Disclaimer>
Make sure your Node-RED flows are properly configured for automatic computations to work correctly.
</Disclaimer>

### Manual Calculation

You can trigger calculations manually:

1. Navigate to a control's details page
2. Click the ***Run Computation*** button
3. Select the scope and time period
4. Wait for the computation to complete
5. View results in the computation results table

<div align="center">
![Manual Computation](/img/calculation/manualComputation.png)
**Figure 6:** *Manual computation dialog.*
</div>

### Data Collection Workflow

The data collection process involves:

1. **Datasource Connection**: Connect to configured datasources
2. **Evidence Retrieval**: Pull relevant evidence based on control definitions
3. **Data Validation**: Verify data integrity and completeness
4. **Transformation**: Transform data into required format
5. **Processing**: Process evidence through control rules

### Validation Workflow

Before calculations are performed, the engine validates:

- **Datasource Availability**: Verify datasources are accessible
- **Data Completeness**: Ensure all required evidence is present
- **Data Quality**: Check for data anomalies or corruption
- **Schema Compliance**: Verify data matches expected schema
- **Time Validity**: Ensure timestamps are within valid ranges

### Storage Workflow

After successful calculations:

1. **Result Generation**: Create guarantee point with result
2. **Metadata Attachment**: Add metadata for tracking and analysis
3. **Persistence**: Store in appropriate database (MongoDB for flexible data)
4. **Indexing**: Index for fast querying
5. **Cache Update**: Update Redis cache for quick access

## Performance Considerations

<Disclaimer>
The Calculation Engine can consume significant resources when processing large volumes of data. Consider the following for optimal performance.
</Disclaimer>

### Optimization Tips

1. **Time Windows**: Use appropriate time window sizes
2. **Indexing**: Ensure databases are properly indexed
3. **Caching**: Leverage Redis caching for frequently accessed data
4. **Scheduling**: Spread computation schedules to avoid peak loads
5. **Data Pruning**: Remove old computation results as needed

### Monitoring

Monitor the Calculation Engine performance by:

- Checking computation execution times
- Monitoring datasource response times
- Tracking database query performance
- Reviewing error logs regularly
- Analyzing resource utilization

<Alert>
If you experience performance issues, consider reducing computation frequency or optimizing your datasource queries.
</Alert>

## Best Practices

Follow these best practices for effective use of the Calculation Engine:

1. **Define Clear Schedules**: Set appropriate computation schedules for each control
2. **Configure Time Windows**: Use time windows that match your compliance requirements
3. **Monitor Results**: Regularly review computation results for anomalies
4. **Handle Errors**: Set up alerts for failed computations
5. **Optimize Queries**: Optimize datasource queries for faster evidence retrieval
6. **Clean Up Data**: Periodically clean up old computation results
7. **Document Workflows**: Document your control definitions and computation logic

<Disclaimer>
The Calculation Engine is a powerful component that requires proper configuration and monitoring. Invest time in understanding its capabilities and limitations to maximize its effectiveness.
</Disclaimer>
