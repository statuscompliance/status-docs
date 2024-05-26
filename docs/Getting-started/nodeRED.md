# Custom nodes

## ⚙ Running the server locally

### Installation prerequisites

- Before starting with the installation it is necessary to install docker and check that it is running correctly. You can find the installation guide for your operating system [here](https://docs.docker.com/get-docker/).

### Installation Guide for Windows

1. Open Git Bash or your preferred terminal on Windows.

2. Clone the GitHub repository with the following command:
   ```bash
   git clone https://github.com/statuscompliance/node-red-status-starter
   ```
3. Find the `node-red-status` folder or execute:
   ```bash
   cd .\node-red-status\
   ```
4. Run the setup script:
   ```bash
   .\setup.bat
   ```
5. Open a browser and go to `http://localhost:1880/` to access the Node-RED interface.

### Installation Guide for MacOS/Linux

1. Open a terminal.

2. Clone the GitHub repository by running the following command:

   ```bash
   git clone https://github.com/statuscompliance/node-red-status-starter
   ```

3. Change to the newly cloned directory:

   ```bash
   cd node-red-status
   ```

4. Grant execution permissions to the `setup.sh` script:

   ```bash
   chmod +x setup.sh
   ```

5. Run the setup script:
   ```bash
   ./setup.sh
   ```
6. Open a browser and go to `http://localhost:1880/` to access the Node-RED interface.
