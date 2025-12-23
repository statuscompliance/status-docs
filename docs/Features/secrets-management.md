---
sidebar_position: 7
tags:
  - status
  - secrets
  - security
  - credentials
keywords:
  - secrets management
  - credentials
  - encryption
  - sensitive data
  - API keys
  - passwords
  - certificates
  - vault
  - security
  - STATUS
  - secure storage
authors:
  - name: "STATUS Team"
    title: "Project Contributors"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Secrets Management

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

Secrets Management allows you to securely store and manage sensitive credentials such as passwords, API keys, certificates, and other confidential information. This section will guide you through understanding and using the secrets management features.

## Overview

STATUS provides a secure secrets vault for storing sensitive data:

- **Encrypted Storage**: All secrets are encrypted at rest
- **Access Control**: Fine-grained access control for secrets
- **Audit Logs**: Track who accessed which secrets and when
- **Secret Versioning**: Keep track of secret versions and history
- **Secure Retrieval**: Secrets are retrieved securely without exposing them

<div align="center">
![Secrets Management](/img/secrets/secretsManagement.png)
**Figure 1:** *Secrets management architecture.*
</div>

<Alert>
Secrets are never displayed in plain text after creation. Take care to copy values when creating secrets, as you won't be able to see them again.
</Alert>

## Create a Secret

To create a new secret:

1. Navigate to the **Secrets** section from main navigation
2. Click the ***Create Secret*** button
3. Fill in the secret details:
   - **Name**: A descriptive name for the secret
   - **Description**: What the secret is used for
   - **Type**: Secret type (Password, API Key, Certificate, etc.)
   - **Value**: The secret value (only shown during creation)
   - **Scope**: Optional scope for organizing secrets
4. Click ***Save*** to create the secret

<div align="center">
![Create Secret Form](/img/secrets/createSecretForm.png)
**Figure 2:** *Create secret form.*
</div>

<Disclaimer>
Make sure to copy the secret value immediately after creation. Once saved, the value cannot be retrieved.
</Disclaimer>

## View Secrets

Once created, you can view your secrets in the Secrets page:

- **Name**: The secret's name
- **Type**: The type of secret (Password, API Key, etc.)
- **Description**: The secret's description
- **Scope**: The scope the secret belongs to (if any)
- **Created At**: When the secret was created
- **Last Used**: When the secret was last accessed

<div align="center">
![Secrets List](/img/secrets/secretsList.png)
**Figure 3:** *Secrets list view.*
</div>

## Secret Types

STATUS supports various secret types:

### Passwords

Simple password secrets for authentication:

- **Use Cases**: Database passwords, system accounts, service accounts
- **Security**: Stored with strong encryption
- **Validation**: Optional password strength validation

### API Keys

API keys for external service authentication:

- **Use Cases**: Cloud provider credentials, third-party API access
- **Format**: Can be any string format
- **Expiration**: Optional expiration dates

### Certificates

SSL/TLS certificates and keys:

- **Use Cases**: HTTPS certificates, client certificates
- **Format**: PEM format supported
- **Chain**: Can include certificate chains

### SSH Keys

SSH key pairs for secure access:

- **Use Cases**: Server access, Git authentication
- **Format**: Supported formats include RSA, ECDSA, Ed25519
- **Passphrase**: Optional passphrase protection

### Custom

Custom secret types for specialized needs:

- **Use Cases**: Application-specific secrets
- **Format**: Any format you need
- **Validation**: Custom validation rules

## Manage Secrets

Once created, you can manage your secrets:

### Edit Secret

To edit a secret:

1. Navigate to the **Secrets** section
2. Click the ***Edit*** button next to the secret
3. Update the secret details (except value)
4. Click ***Save*** to update

<Disclaimer>
You cannot view or edit the secret value. To update a secret value, you must create a new version.
</Disclaimer>

### Update Secret Value

To update a secret's value:

1. Navigate to the **Secrets** section
2. Click the ***Update Value*** button next to the secret
3. Enter the new value
4. Optionally add a reason for the update
5. Click ***Save*** to create a new version

<div align="center">
![Update Secret Value](/img/secrets/updateSecretValue.png)
**Figure 4:** *Update secret value form.*
</div>

### Delete Secret

To delete a secret:

1. Navigate to the **Secrets** section
2. Click the ***Delete*** button next to the secret
3. Confirm the deletion
4. The secret will be permanently removed

<Alert>
Deleting a secret cannot be undone. Make sure you have backups or alternatives before deletion.
</Alert>

## Secret Versioning

STATUS keeps track of secret versions to maintain history and enable rollback if needed.

### View Versions

To view a secret's version history:

1. Navigate to the **Secrets** section
2. Click on the secret name
3. View the list of all versions:
   - **Version Number**: Sequential version identifier
   - **Created At**: When this version was created
   - **Created By**: Who created this version
   - **Reason**: Reason for the update (if provided)

<div align="center">
![Secret Versions](/img/secrets/secretVersions.png)
**Figure 5:** *Secret version history.*
</div>

### Rollback Version

To rollback to a previous version:

1. View the secret's version history
2. Click the ***Rollback*** button next to the desired version
3. Confirm the rollback
4. The previous version becomes the current version

<Disclaimer>
Rolling back creates a new version that copies the old value. Version history is preserved.
</Disclaimer>

## Access Control

Secrets are protected by access control to ensure only authorized users can access them.

### Secret Scopes

Secrets can be organized into scopes for better access control:

- **Global**: Secrets accessible by all authorized users
- **Environment**: Secrets scoped to specific environments (production, staging, etc.)
- **Service**: Secrets scoped to specific services
- **Custom**: Custom scopes as needed

### Permission Levels

Different users have different levels of access:

- **USER**: Can view secrets they have access to
- **DEVELOPER**: Can create and update secrets within their scopes
- **ADMIN**: Full access to all secrets

## Secret Usage in STATUS

Secrets are used in various parts of STATUS:

### Datasources

Datasources can reference secrets for authentication:

- **Database Credentials**: Use secret for database password
- **API Keys**: Use secret for external API authentication
- **Certificates**: Use secret for client certificates

<div align="center">
![Secret in Datasource](/img/secrets/secretInDatasource.png)
**Figure 6:** *Using secrets in datasource configuration.*
</div>

### Node-RED Flows

Node-RED flows can retrieve secrets securely:

- **Flow Credentials**: Use secrets for flow credentials
- **Environment Variables**: Use secrets for environment variables
- **Dynamic Retrieval**: Retrieve secrets at runtime

### Mashups

Mashups can reference secrets for secure access:

- **Authentication**: Use secrets for authentication to external systems
- **Encrypted Data**: Use secrets for encryption/decryption

## Security Features

STATUS implements multiple security features for secrets:

### Encryption at Rest

All secrets are encrypted using industry-standard encryption:

- **Algorithm**: AES-256 encryption
- **Key Management**: Secure key management
- **Rotation**: Regular key rotation

### Encryption in Transit

Secrets are transmitted securely:

- **TLS**: All communications use TLS encryption
- **Certificate Validation**: Strict certificate validation
- **Secure Channels**: Secure channels for secret retrieval

### Audit Logging

All secret access is logged:

- **Access Logs**: Who accessed which secrets and when
- **Creation Logs**: Who created which secrets
- **Update Logs**: Who updated which secrets
- **Deletion Logs**: Who deleted which secrets

<div align="center">
![Audit Logs](/img/secrets/auditLogs.png)
**Figure 7:** *Secret access audit logs.*
</div>

### Secure Retrieval

Secrets are retrieved securely:

- **No Display**: Secrets are never displayed after creation
- **Temporary Access**: Secrets are available only when needed
- **Auto-Expiration**: Temporary access tokens expire automatically
- **Secure Memory**: Secrets are stored securely in memory

## Best Practices

Follow these best practices for effective secrets management:

1. **Unique Secrets**: Use unique secrets for different purposes
2. **Strong Passwords**: Use strong, complex passwords
3. **Regular Rotation**: Rotate secrets regularly
4. **Least Privilege**: Grant minimum necessary access
5. **Audit Regularly**: Regularly review audit logs
6. **Document Usage**: Document what each secret is used for
7. **Backup**: Keep secure backups of critical secrets
8. **Version Control**: Use versioning to track changes

<Disclaimer>
Effective secrets management is critical for security. Invest time in understanding the features and following best practices.
</Disclaimer>

## Troubleshooting

### Secret Not Working

If a secret isn't working as expected:

1. Verify the secret value is correct
2. Check the secret hasn't expired
3. Ensure the secret has the right scope
4. Verify the referencing component has access to the secret

### Cannot Access Secret

If you cannot access a secret:

1. Verify you have the necessary permissions
2. Check the secret is in an accessible scope
3. Ensure the secret hasn't been deleted
4. Contact your administrator if you believe you should have access

<Alert>
If you suspect a secret has been compromised, rotate it immediately and check audit logs for suspicious activity.
</Alert>
