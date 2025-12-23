---
sidebar_position: 4
tags:
  - status
  - compliance
  - catalogs
  - controls
keywords:
  - compliance management
  - catalogs
  - controls
  - computations
  - guarantee points
  - hierarchical structure
  - compliance requirements
  - control definitions
  - mashups
  - Node-RED flows
  - STATUS
  - compliance framework
authors:
  - name: "STATUS Team"
    title: "Project Contributors"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Compliance Management System

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

The Compliance Management System provides a structured approach to managing compliance requirements through a hierarchical organization of catalogs, controls, computations, and guarantee points. This section will guide you through understanding and managing your compliance framework in STATUS.

## Overview

The Compliance Management System allows you to:

- Organize compliance requirements in a catalog-based hierarchy
- Define and manage compliance controls within catalogs
- Configure automatic computations using Node-RED mashups
- Track guarantee points for compliance verification
- Monitor compliance status across different scopes

<div align="center">
![Compliance Hierarchy](/img/compliance/complianceHierarchy.png)
**Figure 1:** *Compliance management hierarchical structure.*
</div>

<Alert>
You need DEVELOPER or ADMIN role to create and manage catalogs and controls. Users with USER role can only view compliance data.
</Alert>

## Catalogs

Catalogs are the top-level containers for organizing your compliance requirements. They help you structure your compliance framework logically.

### Create a Catalog

To create a new catalog:

1. Navigate to the **Catalogs** section from the main navigation
2. Click the ***Create Catalog*** button
3. Fill in the catalog details:
   - **Name**: A descriptive name for your catalog
   - **Description**: Detailed description of the catalog's purpose
   - **Framework**: The compliance framework this catalog follows (e.g., ISO 27001, GDPR, SOC 2)
   - **Version**: Version of the compliance framework
4. Click ***Save*** to create the catalog

<div align="center">
![Create Catalog Form](/img/compliance/createCatalogForm.png)
**Figure 2:** *Create catalog form.*
</div>

### Manage Catalogs

Once created, you can:

- **Edit Catalog**: Update catalog information
- **Delete Catalog**: Remove catalog and all its controls
- **View Controls**: See all controls within the catalog
- **Export Catalog**: Export catalog configuration
- **Import Catalog**: Import catalog from file

<Disclaimer>
Deleting a catalog will also delete all controls, computations, and guarantee points within it. This action cannot be undone.
</Disclaimer>

## Controls

Controls are specific compliance rules and requirements within catalogs. They define what needs to be verified and how.

### Control Structure

Each control contains:

- **Basic Information**: Name, description, and documentation
- **Period**: How often compliance should be verified (HOURLY, DAILY, WEEKLY, MONTHLY)
- **Duration**: Start and end dates for the control's validity
- **Parameters**: Configuration parameters for the control
- **Scopes**: Scope definitions for context-specific compliance
- **Mashup ID**: Reference to the Node-RED flow for computation
- **Evidence Type**: Type of evidence required for verification

<div align="center">
![Control Details](/img/compliance/controlDetails.png)
**Figure 3:** *Control details view.*
</div>

### Create a Control

To create a new control within a catalog:

1. Navigate to the catalog where you want to add the control
2. Click the ***Create Control*** button
3. Fill in the control details:
   - **Name**: A descriptive name for the control
   - **Description**: Detailed description of the control's purpose
   - **Period**: Select the verification period (HOURLY, DAILY, WEEKLY, MONTHLY)
   - **Start Date**: When the control becomes active
   - **End Date**: When the control expires (optional)
   - **Mashup ID**: ID of the Node-RED flow for computation
   - **Parameters**: Add any required parameters
   - **Scopes**: Define scope contexts (e.g., environment: production, region: us-east-1)
4. Click ***Save*** to create the control

<div align="center">
![Create Control Form](/img/compliance/createControlForm.png)
**Figure 4:** *Create control form.*
</div>

<Disclaimer>
Make sure the Node-RED flow specified in the Mashup ID exists and is properly configured. The control will fail to execute if the mashup is not found.
</Disclaimer>

### Edit a Control

To edit an existing control:

1. Navigate to the catalog containing the control
2. Click on the control to view its details
3. Click the ***Edit*** button in the control header
4. Make your changes in the form
5. Click ***Save*** to update the control

<div align="center">
![Edit Control](/img/compliance/editControl.png)
**Figure 5:** *Edit control form.*
</div>

### Manage Control Scopes

Scopes allow you to define context-specific compliance for different environments, regions, or other dimensions.

To manage scopes for a control:

1. Navigate to the control's details page
2. Find the **Scopes** section
3. Click the ***Edit*** button next to Scopes
4. Add, remove, or modify scope definitions:
   - **environment**: production, staging, development
   - **region**: us-east-1, eu-west-1, etc.
   - **cloud-provider**: aws, gcp, azure
   - **criticality**: high, medium, low
5. Click ***Save*** to update the scopes

<div align="center">
![Manage Scopes](/img/compliance/manageScopes.png)
**Figure 6:** *Manage control scopes.*
</div>

<Alert>
Scopes allow you to verify compliance for different contexts using the same control. For example, you can verify a password policy control for both production and staging environments separately.
</Alert>

### View Node-RED Flow

Each control is linked to a Node-RED flow that performs the computation:

1. Navigate to the control's details page
2. Click the ***View Node-RED Flow*** link
3. You will be redirected to the Node-RED interface where you can view and edit the flow

<div align="center">
![View Node-RED Flow](/img/compliance/viewNodeRedFlow.png)
**Figure 7:** *View Node-RED flow link.*
</div>

## Computations

Computations are automated calculations derived from controls. They execute at scheduled intervals and generate compliance results.

### Computation Structure

Each computation contains:

- **ID**: Unique identifier for the computation
- **Computation Group**: Group ID for related computations
- **Value**: Pass/fail result of the computation
- **Scope**: The scope context for the computation
- **Evidence**: All evidence used in the calculation
- **Period**: The time period covered by the computation
- **Control ID**: Reference to the control that generated it

<div align="center">
![Computation Details](/img/compliance/computationDetails.png)
**Figure 8:** *Computation details view.*
</div>

### View Computation Results

To view computation results for a control:

1. Navigate to the control's details page
2. Scroll down to the **Computation Results** section
3. View the table with all computations:
   - **Index**: Sequential number (clickable for details)
   - **Result**: Pass/fail status with visual indicator
   - **Scope**: The scope context
   - **From**: Start time of the computation period
4. Click on an index number to view detailed computation information

<div align="center">
![Computation Results Table](/img/compliance/computationResultsTable.png)
**Figure 9:** *Computation results table.*
</div>

### Computation Details

When you click on a computation, you can see:

- **Basic Information**: Computation ID, result, scope
- **Period**: Time period covered
- **Evidence List**: All evidence used in the calculation with:
  - **Key**: Evidence identifier
  - **Value**: Evidence value
  - **Result**: Whether this piece of evidence passed
  - **From/To**: Time range for this evidence

<div align="center">
![Computation Details Expanded](/img/compliance/computationDetailsExpanded.png)
**Figure 10:** *Detailed computation view.*
</div>

<Alert>
Each piece of evidence can pass or fail independently. The overall computation result is based on the aggregation of all evidence results according to the control's logic.
</Alert>

## Guarantee Points

Guarantee points are data points that verify compliance status at specific points in time. They are generated by computations and stored for historical analysis.

### Guarantee Point Structure

Each guarantee point contains:

- **Timestamp**: When the computation was executed
- **Control ID**: Reference to the control
- **Result**: Pass/fail status
- **Evidence**: All evidence used
- **Scope**: The scope context
- **Metadata**: Additional tracking information

<div align="center">
![Guarantee Points](/img/compliance/guaranteePoints.png)
**Figure 11:** *Guarantee points timeline view.*
</div>

### Viewing Guarantee Points

Guarantee points are automatically stored when computations complete. You can:

- View them in the **Control Details** page under **Computation Results**
- Analyze trends over time using **Grafana** dashboards
- Query them using the **API** for custom analysis
- Export them for external reporting

## Compliance Status

The system tracks overall compliance status at different levels:

### Control-Level Status

Each control has a compliance status based on its recent computations:

- **Compliant**: All recent computations passed
- **Non-Compliant**: One or more recent computations failed
- **Pending**: No recent computations available

<div align="center">
![Control Status](/img/compliance/controlStatus.png)
**Figure 12:** *Control status indicators.*
</div>

### Catalog-Level Status

Catalogs show aggregated compliance status:

- **Total Controls**: Number of controls in the catalog
- **Compliant Controls**: Controls that are currently compliant
- **Non-Compliant Controls**: Controls that are currently non-compliant
- **Overall Compliance Percentage**: (Compliant Controls / Total Controls) × 100

<div align="center">
![Catalog Status](/img/compliance/catalogStatus.png)
**Figure 13:** *Catalog status overview.*
</div>

### Scope-Level Status

Compliance can also be viewed by scope:

- **Environment-Specific**: Compliance per environment
- **Region-Specific**: Compliance per region
- **Custom Scopes**: Compliance based on your custom scope definitions

## Best Practices

Follow these best practices for effective compliance management:

1. **Logical Organization**: Structure catalogs logically by framework or business unit
2. **Descriptive Names**: Use clear, descriptive names for catalogs and controls
3. **Appropriate Periods**: Set verification periods based on risk and requirements
4. **Scope Definition**: Define scopes that match your organizational structure
5. **Regular Review**: Regularly review and update controls
6. **Documentation**: Document control purposes and evidence requirements
7. **Testing**: Test Node-RED flows before linking them to controls
8. **Monitoring**: Monitor computation results regularly for anomalies

<Disclaimer>
Effective compliance management requires ongoing attention. Regularly review your compliance status and update controls as requirements change.
</Disclaimer>

## Troubleshooting

### Computations Not Running

If computations are not executing:

1. Check the **Node-RED** flow is correctly configured
2. Verify the **Mashup ID** is correct
3. Ensure **datasources** are accessible
4. Check **system logs** for errors

### Incorrect Results

If computation results seem incorrect:

1. Review the **Node-RED flow** logic
2. Verify **evidence collection** is working
3. Check **control parameters** are correct
4. Validate **scope definitions**
5. Examine **computation details** for each piece of evidence

<Alert>
For complex issues, check the Calculation Engine documentation or contact support for assistance.
</Alert>
