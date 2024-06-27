# Installation

## ⚙ Running STATUS locally with Docker

:::caution
STATUS is in a pre-production version, so the infrastructure setup is currently being used for testing AI mashup generation and description.
:::

### Installation prerequisites

Before starting with the installation it is necessary to install the following tools:

- Docker: You can find the installation guide for your operating system [here](https://docs.docker.com/get-docker/).

- Docker-compose: You can find the installation guide for your operating system [here](https://docs.docker.com/compose/install/).

:::info
This installation includes a `.env.deploy` file that must be partially filled in by the user. In order to use the application correctly, you must enter this .env:

- OpenAI API Key
- OpenAI OrgID
- Github Client Secret
  :::

### Installation Guide for Windows

1. Open Git Bash or your preferred terminal on Windows.

2. Clone the GitHub repository with the following command:
   ```bash
   git clone https://github.com/statuscompliance/infraestructure
   ```
3. Find the `infraestructure` folder or execute:
   ```bash
   cd .\infraestructure\
   ```
4. Run the setup script:
   ```bash
   .\setup.bat
   ```

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
