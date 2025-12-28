# AWS Task Manager

A simple **serverless to-do list API** built using AWS services.  
This project demonstrates how to build and deploy a CRUD backend with **AWS Lambda, API Gateway, and DynamoDB**.

## Features

- Create, read, update, and delete tasks
- Fully serverless architecture
- Scalable and cost-efficient
- No server management required

## Architecture

- **AWS Lambda** – Business logic
- **API Gateway** – REST API endpoints
- **DynamoDB** – Task storage
- **IAM** – Access control

## API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/{id}` | Get task by ID |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/{id}` | Update a task |
| DELETE | `/tasks/{id}` | Delete a task |

All requests and responses use JSON.

## Setup

```bash
git clone https://github.com/TBarisSatir/aws-task-manager.git
cd aws-task-manager
npm install
