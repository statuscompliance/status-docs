---
sidebar_position: 2
tags:
  - status
  - authentication
  - authorization
  - security
keywords:
  - auth
  - account
  - Account management
  - STATUS
  - Create account
  - Log in
  - Log out
  - Change profile information
  - Change password
  - Two-factor authentication
  - TOTP
  - Stored data
  - Session management
  - JWT tokens
  - API tokens
  - Role-based access control
  - RBAC
  - Service accounts
  - Security
  - Username
  - Password
  - Authentication
  - Session expiration
  - User data
  - Credential storage
authors:
  - name: "STATUS Team"
    title: "Project Contributors"
    url: "https://github.com/statuscompliance"
    image_url: "https://avatars.githubusercontent.com/u/123456789"
---

# Authentication & Authorization

import Disclaimer from '@site/src/components/Disclaimer.js';
import Alert from '@site/src/components/Alert.js';

Due to security reasons, STATUS implements a comprehensive account management system. In order to use both the UI and the API you **must have** an account. In this section you will learn everything you need to know about user data, session management, two-factor authentication, and many other security features.

## Create an account

In order to create an account in STATUS, you will have to click on the link in login modal that says: ***Register***. You will be redirected to register view.

<div align="center">
![Register form](/img/auth/registerModal.png)
**Figure 1:** *Register view form.*
</div>

Once there you will be asked about a username, email, and password. Please introduce secure credentials to protect your data. Once you have created your account, the system will display an alert and you will be redirected to the main page, **logged in** to your new account. If you already have an account, you can log in clicking on the text saying ***Log in*** at the bottom of the registration form.

<Disclaimer>
Your username must be unique. We recommend using a password with more than 12 characters for a better security.
</Disclaimer>

## Log in

The first thing you will see when visiting STATUS is this view. In order to log in you just have to introduce your username and password.

<div align="center" id='login-view'>
![Login form](/img/auth/loginModal.png)
**Figure 2:** *Log in form.*
</div>

If everything is fine you will be logged in and have access to the rest of the system, but be careful because you **will log out automatically after 2 hours**. If you do not have an account, you can create one clicking on the text saying ***Register*** at the bottom of the log in form.

## Log out

**Every two hours your session will expire**, which means that you will be forced to log in again. However, you can also log out by yourself. To do so, just go to the main page, click in the profile icon located up to the right. After that, click in the button saying ***Log out***.

<div align="center" id='profile-view'>
![Profile view](/img/auth/profilePage.png)
**Figure 3:** *Profile view.*
</div>

## Change profile information

If you want to change your user data, you can do it in two easy steps. Go to the main page and click in the profile icon located up to the right. You will see your current username and email in text inputs. You will be able to introduce new values and update them by clicking in ***Update profile*** button.

<div align="center">
![Profile update successful](/img/auth/profileUpdateAlert.png)
**Figure 4:** *Profile updated successfully.*
</div>

<Disclaimer>
Your username must be unique. STATUS won't let you update your username if another user already has that one or if it is the same as the one you already have.

<div align="center">
![Profile update error](/img/auth/profileUpdateAlertError.png)
**Figure 5:** *Profile not updated for validation errors.*
</div>

</Disclaimer>

## Change password

Changing password is similar to profile information update. You will also have to go to the main page and click in profile icon up to the right. Once you are in your [profile page](#profile-view), click in ***Change password*** button. You will access another view where you can introduce your new password.

<div align="center">
![Update password](/img/auth/changePasswordScreen.png)
**Figure 6:** *Change password screen.*
</div>

Please use secure passwords to avoid hacking and protect your data. If you changed your mind and do not want to update your password anymore, you can go back to your [profile page](#profile-view) by clicking in ***Go back to profile*** button. Otherwise, introduce your new password and click in ***Update password***.

## Two-Factor Authentication (TOTP)

STATUS supports optional Two-Factor Authentication using Time-based One-Time Passwords (TOTP). This adds an extra layer of security to your account.

### Enable Two-Factor Authentication

To enable TOTP, go to your profile page and click on the ***Two-Factor Authentication*** button. You will be redirected to the setup screen where you can scan a QR code with your authenticator app.

<div align="center">
![TOTP setup](/img/auth/totpSetupScreen.png)
**Figure 7:** *TOTP setup screen with QR code.*
</div>

Once you have scanned the QR code with your authenticator app (such as Google Authenticator, Authy, or Microsoft Authenticator), enter the 6-digit code to verify and enable TOTP.

<Disclaimer>
Make sure to save your backup codes! These codes are the only way to recover your account if you lose access to your authenticator app.
</Disclaimer>

### Disable Two-Factor Authentication

To disable TOTP, go to your profile page and click on the ***Two-Factor Authentication*** button. You will need to provide a TOTP code to confirm that you want to disable this security feature.

<div align="center">
![TOTP disable](/img/auth/totpDisableScreen.png)
**Figure 8:** *TOTP disable confirmation screen.*
</div>

## Role-Based Access Control (RBAC)

STATUS implements a role-based access control system to manage user permissions effectively. The system supports four primary roles:

### User Roles

- **USER**: Basic access to view and interact with compliance data. Users can:
  - View catalogs, controls, and computations
  - Create and manage scopes
  - View dashboards
  - Perform read operations on compliance data

- **DEVELOPER**: Advanced access for development and integration tasks. Developers can:
  - All USER permissions
  - Create and manage catalogs and controls
  - Configure datasources and linkers
  - Create and edit mashups
  - Access and use service accounts

- **ADMIN**: Full administrative privileges for system configuration. Admins can:
  - All DEVELOPER permissions
  - Manage users and service accounts
  - Configure system settings
  - Access system logs and metrics
  - Perform administrative operations

<Alert>
Your role is assigned when your account is created and can only be changed by an administrator.
</Alert>

## Service Accounts

Service accounts are special accounts designed for programmatic access and integrations. These accounts do not have a username and password but use API tokens for authentication.

### Create a Service Account

To create a service account, you need to have DEVELOPER or ADMIN role. Go to the main page, click on your profile icon, and select ***Service Accounts***. Click on the ***Create Service Account*** button.

<div align="center">
![Create service account](/img/auth/createServiceAccount.png)
**Figure 9:** *Create service account form.*
</div>

You will need to provide a name and select a role for the service account. Once created, you will receive an API token.

<Disclaimer>
Make sure to copy and save your API token immediately! You will not be able to see it again.
</Disclaimer>

### Manage Service Accounts

You can view, edit, and delete your service accounts from the Service Accounts page. Each service account shows:

- Name
- Role
- Created date
- Last used date
- Token expiration

<div align="center">
![Service accounts list](/img/auth/serviceAccountsList.png)
**Figure 10:** *Service accounts list.*
</div>

## Stored data

Due to security, scalability, and consistency reasons, STATUS must have users to manage their requests and ensure correct compliance configuration use. STATUS will store username, email, hashed passwords, TOTP secrets, and API tokens. This way, each user will have access only to their data, and we can associate credentials to their owners to avoid unethical use.

## Session management

As we said before, STATUS requires authentication for using its API and UI. When you log in, you will receive a JWT ciphered with a secret key only known by the system. Every token expires after 2 hours, so you will have to renew your session to continue using STATUS after that time. STATUS's UI is prepared to manage session expiration, and will redirect you to log in page **automatically** once it detects that your session expired. Then, you will have to log in again to continue working.

<Disclaimer>
STATUS checks your token expiration date **every minute**, which can lead to some errors in rare cases when you try to use the UI before it has detected that your session expired. In those cases, we recommend reloading the page or logging out. However, these problems are not common and the **API is prepared** to manage these type of errors, so do not be scared.
</Disclaimer>

## API Tokens

In some cases, token expiration can be annoying. If we want to build an API or a system that uses STATUS, managing session expiration can be difficult. Even though we recommend doing that, we can create special accounts (service accounts) having ***NO EXPIRATION TOKENS***. This is only possible using STATUS's API or by creating service accounts in the UI.

## Security Best Practices

To keep your STATUS account secure, follow these recommendations:

1. **Use Strong Passwords**: Create passwords with at least 12 characters, including uppercase, lowercase, numbers, and special characters
2. **Enable TOTP**: Always enable two-factor authentication for your account
3. **Protect Your Tokens**: Never share your API tokens or passwords
4. **Regular Updates**: Change your password regularly
5. **Monitor Activity**: Check your profile for recent login activity
6. **Use Secure Connections**: Always access STATUS over HTTPS

<Alert>
STATUS ***does not*** allow password or account recovery if you forgot your password. If you enabled TOTP and lost access to your authenticator app without saving backup codes, you will need to contact an administrator to reset your account.
</Alert>
