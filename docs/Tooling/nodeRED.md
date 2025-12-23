---
sidebar_position: 1
tags:
  - tools
  - integrations
  - workflow-automation
keywords:
  - Node-RED
  - tools
  - setup
  - workflow
  - automation
  - integrations
  - configuration
---

# Node-RED

Node-RED is a visual programming platform based on Node.js that allows users to connect devices and web services intuitively through graphical workflows, facilitating the creation of IoT (Internet of Things) and automation applications. In the research project it will be used to design mashups capable of measuring compliance.

In order to collect information from different platforms to measure compliance, the following nodes have been designed:

<p align="center">
<img src="\img\customNodes.png" alt="portada" width="60%" height="60%"/>
Figure 1. Customised Node-RED nodes
</p>

The operation of each of the nodes shown in Figure 1 is described below.

- `trello-collector`: Given the id of a trello board, the API key and the token, return the github repositories linked to each existing card.
- `filter-by`: Given the name of the attribute to be used for missing, the filter value and the filter type, returns objects that pass the filter.
- `exists-section-in-doc`: Given the GitHub organisation name, the repository name, the file path, the file name, the section it has to contain and the GitHub token, returns true if that document contains the given section.
- `exists-url`: returns true if a trello board card has an associated github repository. Input parameters: the card id, the trello API key, the trello authorisation token and the GitHub token.
- `exists-pipe`: return true if the array given has the same length as the parameter "count".
- `filter-by-date`: Given the name of the attribute to be used for filtering and the period to be filtered, returns the objects that pass the filter.
- `github-collector`: Given the github username, the repository name, the file path, the file name and the GitHub token, returns the content of the file.
- `url-to-doc`: Given the GitHub organisation name, the repository name, the file path, the file name, the section it has to contain and the GitHub token, returns the content of the file.
- `project-to-url`: Given the id of a trello board, the id of a trello card in the board, the API key and the trello token, return the github repositories linked to the given card.

In addition to this, a chatbot has also been developed to help non-technical users create and describe Node-RED flows (You can check the [<u>OpenAI integration</u>](/docs/Tooling/openAI)).
