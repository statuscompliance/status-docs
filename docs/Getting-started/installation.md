# Installation

## ⚙ Running STATUS locally with Docker

:::caution
STATUS is in a pre-production version, so it is normal that some parts of the system contain bugs, if you find any, please report them [here](https://github.com/orgs/statuscompliance/discussions/new?category=bugs).
:::

### Installation prerequisites

Before starting with the installation it is necessary to install (or upgrade if the Docker version is less than 1.27.0) the following tools:

- Docker: You can find the installation guide for your operating system [here](https://docs.docker.com/get-docker/).

:::info
This installation includes a `.env.deploy` file that must be partially filled in by the user. In order to use the application correctly, you must enter this .env:

- OpenAI API Key
- OpenAI OrgID
- Github Client Secret

**If you don't have this information, don't worry, you will be able to use a part of the system.**
:::

### Installation Guide for Windows

1. Open the Windows Powershell.

2. Clone the GitHub repository with the following command:
   ```bash
   git clone https://github.com/statuscompliance/infraestructure
   ```
3. Find the `infraestructure` folder or execute:
   ```bash
   cd .\infraestructure\Windows\
   ```
4. Run the setup script:
   ```bash
   .\setup.ps1
   ```
5. Enter the requested information (username, password and e-mail address to be used in the system).
6. After the installation is complete, you can access the system at `http://localhost:3000`.

### Installation Guide for MacOS/Linux

1. Open a terminal.

2. Clone the GitHub repository by running the following command:

   ```bash
   git clone https://github.com/statuscompliance/infraestructure
   ```

3. Change to the newly cloned directory:

   ```bash
   cd infraestructure
   ```

4. Run the setup script:
   ```bash
   ./setup.sh
   ```
5. Enter the requested information (username, password and e-mail address to be used in the system).
6. After the installation is complete, you can access the system at `http://localhost:3000`.
