---
sidebar_position: 9
tags:
  - status
  - scopes
  - context
  - organization
keywords:
  - scopes
  - scope management
  - context
  - environment
  - region
  - compliance context
  - multi-environment
  - STATUS
  - scope definitions
authors:
  - name: "STATUS Team"
    title: "Project Contributors"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Scopes Management

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

Scopes Management allows you to define and manage scope boundaries for compliance verification. This section will guide you through understanding, creating, and managing scopes.

## Overview

Scopes provide context for compliance verification, allowing you to:

- **Multi-Environment**: Verify compliance across different environments
- **Organizational Structure**: Align scopes with organizational units
- **Geographic Boundaries**: Define scopes by region or location
- **Flexible Definitions**: Create custom scope types as needed
- **Consistent Grouping**: Group related resources together

<div align="center">
![Scopes Overview](/img/scopes/scopesOverview.png)
**Figure 1:** *Scopes concept and usage.*
</div>

<Alert>
Scopes allow you to verify the same control across different contexts. For example, verify password policy for both production and staging environments separately.
</Alert>

## Scope Concepts

### What are Scopes?

Scopes are key-value pairs that define context for compliance verification:

- **Key**: The scope dimension (e.g., environment, region)
- **Value**: The specific value for that dimension (e.g., production, us-east-1)

A control can have multiple scopes, and computations are executed for each unique combination of scope values.

### Scope Example

Consider a control with the following scopes:

```json
{
  "environment": "production",
  "region": "us-east-1",
  "cloud-provider": "aws",
  "criticality": "high"
}
```

This control will be verified for the production environment in the US East region on AWS with high criticality.

<div align="center">
![Scope Example](/img/scopes/scopeExample.png)
**Figure 2:** *Scope with multiple dimensions.*
</div>

### Scope Combinations

Multiple scope values create combinations for verification:

| Environment | Region | Combinations |
|-------------|---------|---------------|
| production  | us-east-1 | 1 |
| production  | eu-west-1 | 1 |
| staging      | us-east-1 | 1 |
| staging      | eu-west-1 | 1 |
| **Total**    |         | **4** |

With 2 environments and 2 regions, there are 4 unique combinations, resulting in 4 separate computations for the control.

## Predefined Scope Types

STATUS provides several predefined scope types commonly used in compliance verification:

### Environment

Common environments in software development:

- **production**: Production/live systems
- **staging**: Pre-production testing environment
- **development**: Development environment
- **testing**: Dedicated testing environment

<div align="center">
![Environment Scope](/img/scopes/environmentScope.png)
**Figure 3:** *Environment scope values.*
</div>

### Region

Geographic regions for distributed systems:

- **us-east-1**: US East (N. Virginia)
- **us-west-2**: US West (Oregon)
- **eu-west-1**: EU (Ireland)
- **eu-central-1**: EU (Frankfurt)
- **ap-southeast-1**: Asia Pacific (Singapore)

### Cloud Provider

Cloud service providers:

- **aws**: Amazon Web Services
- **gcp**: Google Cloud Platform
- **azure**: Microsoft Azure
- **on-premise**: On-premise infrastructure

### Criticality

System criticality levels:

- **high**: Critical systems
- **medium**: Important systems
- **low**: Non-critical systems

<div align="center">
![Common Scopes](/img/scopes/commonScopes.png)
**Figure 4:** *Common predefined scope types.*
</div>

## Manage Scope Definitions

Scope definitions define the available scope types and their values.

### View Scope Definitions

To view scope definitions:

1. Navigate to **Scopes** section from main navigation
2. View the list of scope definitions:
   - **Name**: Scope dimension name
   - **Description**: What this scope represents
   - **Type**: Scope type
   - **Default**: Default value (if any)
   - **Created At**: When the scope was created

<div align="center">
![Scope Definitions List](/img/scopes/scopeDefinitionsList.png)
**Figure 5:** *Scope definitions list view.*
</div>

### Create a Scope Definition

To create a new scope definition:

1. Navigate to **Scopes** section
2. Click on ***Create Scope*** button
3. Configure the scope:
   - **Name**: Scope dimension name (e.g., environment, region)
   - **Description**: What this scope represents
   - **Type**: Scope type (text, select, etc.)
   - **Default**: Default value (optional)
   - **Available Values**: List of available values (for select type)
4. Click ***Save*** to create the scope

<div align="center">
![Create Scope Form](/img/scopes/createScopeForm.png)
**Figure 6:** *Create scope definition form.*
</div>

<Disclaimer>
Scope definitions define what scope types are available. They don't assign scopes to controls - that's done at the control level.
</Disclaimer>

### Edit a Scope Definition

To edit a scope definition:

1. Navigate to **Scopes** section
2. Click the ***Edit*** button next to the scope
3. Make your changes
4. Click ***Save*** to update

<Alert>
Editing a scope definition affects all controls using this scope type. Be careful when changing available values.
</Alert>

### Delete a Scope Definition

To delete a scope definition:

1. Navigate to **Scopes** section
2. Click the ***Delete*** button next to the scope
3. Confirm the deletion

<Disclaimer>
You cannot delete a scope definition that is used by any controls. Remove it from controls first.
</Disclaimer>

## Use Scopes in Controls

Scopes are assigned to controls to define context for compliance verification.

### Add Scopes to a Control

To add scopes to a control:

1. Navigate to a **Control Details** page
2. Find the **Scopes** section
3. Click the ***Edit*** button next to Scopes
4. Select the scopes to assign:
   - **Scope Type**: Select scope dimension
   - **Value**: Select value for that scope
5. Click ***Add*** to add more scopes
6. Click ***Save*** to save the scopes

<div align="center">
![Add Scopes to Control](/img/scopes/addScopesToControl.png)
**Figure 7:** *Add scopes to control form.*
</div>

### Update Control Scopes

To update a control's scopes:

1. Navigate to the **Control Details** page
2. Click the ***Edit*** button next to Scopes
3. Add, remove, or modify scopes
4. Click ***Save*** to update

<Alert>
Updating scopes on a control will create new computations for the new scope combinations. Existing computations will be preserved for historical analysis.
</Alert>

### Remove a Scope from Control

To remove a scope from a control:

1. Navigate to the **Control Details** page
2. Click the ***Edit*** button next to Scopes
3. Click the ***X*** button next to the scope to remove
4. Click ***Save***

<Disclaimer>
Removing a scope from a control doesn't delete existing computations. They remain available for historical analysis.
</Disclaimer>

## View Scoped Computations

Scopes affect how computations are executed and displayed.

### Computation Results by Scope

Computation results show the scope for each computation:

- **Index**: Sequential number (clickable for details)
- **Result**: Pass/fail status
- **Scope**: The scope context for the computation
- **From**: Start time of the computation period

<div align="center">
![Scoped Computations](/img/scopes/scopedComputations.png)
**Figure 8:** *Computation results showing scope.*
</div>

### Filter by Scope

You can filter computation results by scope:

1. Navigate to a **Control Details** page
2. In the **Computation Results** section
3. Use the search/filter functionality
4. Filter by scope values (e.g., "environment:production")

### Compliance Status by Scope

Compliance status can be viewed by scope:

- **Overall Compliance**: Compliance across all scopes
- **Scope-Specific Compliance**: Compliance for each scope value
- **Scope Combinations**: Compliance for each unique combination

<div align="center">
![Compliance by Scope](/img/scopes/complianceByScope.png)
**Figure 9:** *Compliance status breakdown by scope.*
</div>

## Scope Best Practices

Follow these best practices for effective scope management:

1. **Logical Dimensions**: Use dimensions that align with your organization
2. **Consistent Naming**: Use consistent naming conventions for scopes
3. **Minimize Combinations**: Be careful with too many scope dimensions (combinatorial explosion)
4. **Default Values**: Set sensible defaults for scope types
5. **Clear Descriptions**: Document what each scope represents
6. **Review Regularly**: Review and update scope definitions as your organization evolves

<Disclaimer>
More scope dimensions create more computation combinations. Be mindful of performance when designing your scope structure.
</Disclaimer>

### Scope Design Tips

When designing scopes:

- **Start Simple**: Begin with 1-2 scope dimensions
- **Expand Gradually**: Add more dimensions as needed
- **Consider Volume**: Estimate computation volume for each scope combination
- **Prioritize**: Focus on most important scope dimensions first
- **Document**: Document the purpose and usage of each scope

## Scope Examples

### Example 1: Simple Environment Scope

A control with just an environment scope:

```json
{
  "environment": "production"
}
```

**Combinations**: 1 (production)
**Computations**: 1 per period

### Example 2: Environment and Region

A control with environment and region scopes:

```json
{
  "environment": "production",
  "region": "us-east-1"
}
```

**Combinations**: 4 (production × us-east-1, us-west-2, eu-west-1, eu-central-1)
**Computations**: 4 per period

### Example 3: Multiple Dimensions

A control with multiple scope dimensions:

```json
{
  "environment": "production",
  "region": "us-east-1",
  "cloud-provider": "aws",
  "criticality": "high"
}
```

**Combinations**: Potentially many
**Computations**: Many per period (use with caution)

<div align="center">
![Scope Complexity](/img/scopes/scopeComplexity.png)
**Figure 10:** *Scope complexity and computation volume.*
</div>

<Alert>
Be careful with too many scope dimensions. Each additional dimension multiplies the number of computations required.
</Alert>

## Troubleshooting

### Too Many Computations

If you have too many computations:

1. Review your scope dimensions
2. Reduce number of scope values
3. Remove unnecessary scopes from controls
4. Increase computation period

### Scope Not Working

If a scope is not working as expected:

1. Verify scope definition exists
2. Check scope values are correct
3. Ensure scope is assigned to the control
4. Review computation logs for errors

### Cannot Remove Scope

If you cannot remove a scope:

1. Check which controls use this scope
2. Remove scope from those controls first
3. Try removing the scope definition again

<Disclaimer>
For complex scope issues, review the computation logs or contact support for assistance.
</Disclaimer>
