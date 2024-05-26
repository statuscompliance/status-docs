# Architecture

<div class="justified-text">
The STATUS System is a comprehensive Business Process Compliance Management System designed to integrate multiple components and external systems to ensure business processes comply with regulatory and organizational standards.

### Logic Architecture

The architecture of the STATUS System is divided into several key components: Presentation, Business Logic, Data Persistence, and various external systems including Governance, GitHub, Trello, Node-RED, and OpenAI (see Figure 1).

<p align="center">
<img src="\img\logicArchitecture.png" alt="portada" width="70%" height="70%"/>
Figure 1. Logic Architecture
</p>

#### Presentation Layer

The Presentation layer is responsible for interacting with the end-users. It handles user input and displays the necessary information back to the users. This layer communicates with the Business Logic layer to fetch and display data, providing a user-friendly interface for compliance management tasks.

#### Business Logic Layer

The Business Logic layer is the core of the STATUS System, encapsulating the primary functionalities of the application. It is composed of several interfaces, each responsible for a distinct part of the system's functionality:

- **Control Management**: Manages the overall control flow and coordination of compliance processes.
- **Mashup Management**: Handles the integration of various data sources and services to create comprehensive compliance reports.
- **Catalog Management**: Manages the catalog of controls within the system.
- **Chat Management**: Support users to facilitate the creation of mashups.
- **Input Management**: Handles user input related to compliance data.
- **User Management**: Manages user data, authentication, and roles, ensuring that only authorized personnel can access and modify compliance-related information.

#### Data Persistence Layer

The Data Persistence layer is responsible for storing and retrieving compliance data. This includes a robust database system that ensures data integrity and availability. The database system is connected to a Document Management System (DMS) for handling document storage and retrieval, ensuring all compliance documents are securely stored and easily accessible.

#### External Systems Integration

The STATUS System integrates with several external systems to enhance its functionality:

- **Governify System**: Provides compliance statistics via a dashboard with graphs
- **GitHub System**: Allows users to perform compliance checks on such platforms.
- **Trello System**:Allows users to perform compliance checks on such platforms.
- **Node-RED System**:Provides system technicians with an editor to create and modify existing mashups.
- **OpenAI System**: Incorporates advanced AI capabilities for natural language processing and other AI-driven functionalities, helping to create and describe mashups.

### Deployment Architecture

<p align="center">
<img src="\img\deployment.png" alt="portada" width="70%" height="70%"/>
Figure 2. Deployment Architecture
</p>

The deployment architecture of the STATUS System involves multiple devices and execution environments to ensure high availability and scalability (see Figure 2). The main components include:

- **User Client**: Runs Node-RED and a web browser for client-side operations, allowing users to interact with the system.
- **Web Server**: Hosts an ExpressJS application on NodeJS, serving as the backend server that processes compliance data and user requests.
- **Database Server**: Utilizes MySQL for data storage, managed via the Sequelize ORM, ensuring reliable and efficient data management.
- **BlueJay Infrastructure**: Provides additional infrastructure support to show compliance graphs.
- **OpenAI Server**: Hosts the OpenAI services for AI functionalities, enabling advanced data analysis and natural language understanding.

The communication between these components is primarily through HTTP/HTTPS protocols, ensuring secure and efficient data exchange.

In summary, the STATUS System is a robust and flexible Business Process Compliance Management System that integrates various components and external services to provide a comprehensive solution for managing compliance processes. Its modular architecture ensures scalability and maintainability, making it suitable for a wide range of applications in ensuring compliance with regulatory and organizational standards.

</div>
