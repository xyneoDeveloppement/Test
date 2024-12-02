# SurveyTool Project - API and Frontend Setup

## Overview

This project is a survey management tool that includes:

- **API**: Available on port **8080**.
- **Frontend**: Available on port **8082**.
- **phpMyAdmin**: Available on port **8081** for database management.

The project uses Docker to simplify deployment and ensure consistency across environments.

---

## Prerequisites

- Ensure you have **Docker** and **Docker Compose** installed on your machine.
  - [Install Docker](https://docs.docker.com/get-docker/)
  - [Install Docker Compose](https://docs.docker.com/compose/install/)

---

## Getting Started

1. Clone the repository and navigate to the project root directory.
2. Run the following command to start the application:

   ```bash
   docker-compose up
    ```

---

## Troubleshooting

- If the **docker-compose up** command **fails**, follow these steps:

1. Navigate to the surveytool directory:

   ```bash
   cd surveytool
    ```

2. Run the following Gradle command to clean and build the project:

   ```bash
   ./gradlew clean build

    ```

3. Return to the project root directory and try starting the application again:

   ```bash
   docker-compose up
    ```