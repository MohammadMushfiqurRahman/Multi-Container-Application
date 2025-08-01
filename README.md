# Multi-Container Todo Application

A containerized Todo API application built with Node.js, Express, and MongoDB, demonstrating modern microservices architecture and Docker best practices.

## Overview

This repository contains a multi-container application built using Docker, consisting of two main services:

1. **API Service**: A Node.js/Express RESTful API that provides CRUD operations for a Todo application
2. **MongoDB Service**: A database service that stores the Todo items

The application follows a microservices architecture pattern, where each component runs in its own container and communicates with other components through well-defined interfaces.

## Architecture

```
Client Applications
        ↓ HTTP Requests
    API Service (Node.js/Express)
        ↓ Mongoose ODM
    MongoDB Database
```

## Features

- **RESTful API**: Complete CRUD operations for Todo items
- **Containerized**: Docker and Docker Compose for easy deployment
- **Database Integration**: MongoDB with Mongoose ODM
- **Testing**: Comprehensive test suite with Jest and Supertest
- **Development-friendly**: Hot reloading with nodemon
- **Health Checks**: Database health monitoring
- **Data Persistence**: Volume mapping for database data

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Multi-Container-Application
   ```

2. **Start the application**:
   ```bash
   docker-compose up
   ```

3. **Access the API**:
   - API Base URL: `http://localhost:3000`
   - MongoDB: `localhost:27017`

## API Endpoints

| Method | Endpoint      | Description                   | Request Body              |
|--------|---------------|-------------------------------|---------------------------|
| GET    | `/todos`      | Get all todo items            | -                         |
| POST   | `/todos`      | Create a new todo item        | `{"task": "string"}`      |
| GET    | `/todos/:id`  | Get a specific todo by ID     | -                         |
| PUT    | `/todos/:id`  | Update a specific todo by ID  | `{"task": "string"}`      |
| DELETE | `/todos/:id`  | Delete a specific todo by ID  | -                         |

## Creating a New Todo

### Using curl

```bash
curl -X POST \
  http://localhost:3000/todos \
  -H 'Content-Type: application/json' \
  -d '{"task": "Buy groceries"}'
```

### Using JavaScript (Fetch API)

```javascript
fetch('http://localhost:3000/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    task: 'Buy groceries',
  }),
})
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
```

### Expected Response

```json
{
  "_id": "60f7b0b42c91b32d58c9a9b3",
  "task": "Buy groceries",
  "createdAt": "2023-07-21T12:34:56.789Z",
  "updatedAt": "2023-07-21T12:34:56.789Z"
}
```

## Project Structure

```
Multi-Container-Application/
├── api/                          # API service directory
│   ├── __tests__/               # Test files
│   │   └── todos.test.js        # API endpoint tests
│   ├── models/                  # Data models
│   │   └── Todo.js              # Todo model definition
│   ├── routes/                  # API routes
│   │   └── todos.js             # Todo routes and handlers
│   ├── Dockerfile               # API service container definition
│   ├── package.json             # Node.js dependencies and scripts
│   ├── server.js                # Main application entry point
│   └── jest.config.js           # Jest testing configuration
├── docker-compose.yml           # Multi-container orchestration
├── .env                         # Environment variables
└── README.md                    # This file
```

## Technology Stack

### API Service
- **Node.js 18**: Runtime environment
- **Express.js**: Web application framework
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Development & Testing
- **Nodemon**: Development server with auto-restart
- **Jest**: Testing framework
- **Supertest**: HTTP assertion library

### Database
- **MongoDB 7.0**: Document database

### Containerization
- **Docker**: Container platform
- **Docker Compose**: Multi-container orchestration

## Development Workflow

### Starting Development

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f api
```

### Making Changes

- Code changes in the `./api` directory are automatically reflected in the running container
- Nodemon automatically restarts the server when changes are detected

### Running Tests

```bash
# Run tests inside the API container
docker-compose exec api npm test

# Run tests with coverage
docker-compose exec api npm test -- --coverage
```

### Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (resets database)
docker-compose down -v
```

## Docker Configuration

### API Service (docker-compose.yml)
- Built from `./api/Dockerfile`
- Exposed on port 3000
- Environment variables for MongoDB connection
- Volume mapping for live code changes
- Health check dependency on MongoDB

### MongoDB Service
- Uses official MongoDB 7.0 image
- Exposed on port 27017
- Named volume for data persistence
- Health check for service availability
- Automatic restart policy

## Data Model

### Todo Schema

```javascript
{
  task: {
    type: String,
    required: true
  },
  createdAt: Date,    // Auto-generated
  updatedAt: Date     // Auto-generated
}
```

## Testing

The application includes comprehensive tests covering:

- **GET /todos**: Retrieve all todos
- **POST /todos**: Create new todos
- **GET /todos/:id**: Retrieve specific todos
- **PUT /todos/:id**: Update todos
- **DELETE /todos/:id**: Delete todos

Tests use a separate test database to avoid affecting development data.

## Environment Variables

| Variable      | Description                    | Default                              |
|---------------|--------------------------------|--------------------------------------|
| `PORT`        | API server port                | `3000`                               |
| `MONGODB_URI` | MongoDB connection string      | `mongodb://mongo:27017/todoapp`     |

## Error Handling

The API includes proper error handling for:

- **400 Bad Request**: Invalid request data
- **404 Not Found**: Todo item not found
- **500 Internal Server Error**: Database or server errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues, please open an issue in the repository or contact the maintainers.