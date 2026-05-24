# Urban Traffic Management System

A microservices-based urban traffic management platform built with NestJS, GraphQL, and Next.js.

## Overview

This project provides real-time traffic monitoring and incident management for urban environments. It tracks vehicle movements, detects incidents, manages notifications, and analyzes traffic patterns across different zones.

## Architecture

The system consists of:

- **Gateway**: GraphQL API server that routes requests to microservices
- **Auth Service**: Handles user authentication and JWT tokens
- **Vehicle Service**: Manages vehicle data and GPS tracking
- **Traffic Service**: Monitors traffic zones and density levels
- **Incident Service**: Manages incident reporting and status updates
- **Notification Service**: Handles user notifications
- **Frontend**: Next.js dashboard with React and Leaflet for map visualization
- **Database**: PostgreSQL with isolated schemas per service

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- PostgreSQL 15 (or use Docker Compose)

## Quick Start

### Using Docker Compose

```bash
docker-compose up
```

This starts all services including PostgreSQL. The system will be available at:
- Frontend: http://localhost:3006
- Gateway (GraphQL): http://localhost:3000/graphql
- Auth Service: http://localhost:3001
- Vehicle Service: http://localhost:3002
- Traffic Service: http://localhost:3003
- Incident Service: http://localhost:3004
- Notification Service: http://localhost:3005

### Local Development

Install dependencies in the root directory and all subdirectories:

```bash
npm install
cd gateway && npm install
cd ../frontend && npm install
cd ../services/auth-service && npm install
cd ../services/vehicle-service && npm install
cd ../services/traffic-service && npm install
cd ../services/incident-service && npm install
cd ../services/notification-service && npm install
```

Start each service in separate terminals:

```bash
# Gateway
cd gateway
npm run start:dev

# Frontend
cd frontend
npm run dev -- -p 3006

# Auth Service
cd services/auth-service
npm run start:dev

# Vehicle Service
cd services/vehicle-service
npm run start:dev

# Traffic Service
cd services/traffic-service
npm run start:dev

# Incident Service
cd services/incident-service
npm run start:dev

# Notification Service
cd services/notification-service
npm run start:dev
```

## Project Structure

```
ProjetServicesWeb/
├── gateway/                 # GraphQL Gateway (NestJS)
├── frontend/                # Dashboard (React/Next.js)
├── services/
│   ├── auth-service/        # Authentication
│   ├── vehicle-service/     # Vehicle management
│   ├── traffic-service/     # Traffic monitoring
│   ├── incident-service/    # Incident management
│   └── notification-service/ # Notifications
├── docker-compose.yml       # Container orchestration
├── init.sql                 # Database initialization
├── package.json             # Root dependencies
└── README.md
```

## Environment Configuration

Services connect via environment variables configured in docker-compose.yml:

- DB_HOST: postgres
- DB_PORT: 5432
- DB_USERNAME: postgres
- DB_PASSWORD: postgres123
- DB_NAME: urban_traffic_db
- JWT_SECRET: secret123 (used by Auth Service)

## Database Schema

The PostgreSQL database contains separate schemas:

- auth: User authentication and roles
- vehicle: Vehicle data and GPS tracking
- traffic: Traffic zones and density information
- incident: Incident reports and status
- notification: User notifications

Initialize the database by running init.sql (automatically handled by Docker Compose).

## API Documentation

### GraphQL Queries

Available at the gateway GraphQL endpoint:

```graphql
# Vehicles
vehicles: [Vehicle!]!
vehicle(id: Int!): Vehicle!
vehicleHistory(vehicle_id: Int!): [GpsPosition!]!

# Traffic Zones
zones: [Zone!]!

# Incidents
incidents: [Incident!]!
incident(id: Int!): Incident!

# Notifications
notifications(user_id: Int!): [Notification!]!
```

### Authentication

```graphql
login(email: String!, password: String!): AuthResponse!
```

## Frontend Features

- Dashboard with real-time data
- Interactive map with vehicle tracking
- Traffic zone visualization
- Incident reporting and monitoring
- Notifications panel
- User authentication

## Testing

Run tests for each service:

```bash
cd <service-directory>
npm test                # Unit tests
npm run test:e2e       # End-to-end tests
npm run test:cov       # Coverage report
```

## Development

### Code Quality

Run linting and formatting:

```bash
npm run lint           # ESLint fixes
npm run format         # Prettier formatting
```

### Building for Production

```bash
# Gateway
cd gateway
npm run build
npm run start:prod

# Frontend
cd frontend
npm run build
npm start
```

## Common Issues

- Services fail to start: Ensure PostgreSQL is running and accessible
- GraphQL endpoint not found: Check gateway service is started
- Database connection errors: Verify init.sql has been executed
- Port conflicts: Adjust port mappings in docker-compose.yml

