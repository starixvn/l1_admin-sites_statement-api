# Daily Statements API

A NestJS-based API service for retrieving daily statement data from MongoDB.

## Description

This service provides API endpoints to fetch daily statement data with specific filters and projections. It's built using NestJS framework and MongoDB for data storage.

## Prerequisites

- Node.js (v20 or higher)
- MongoDB
- npm or yarn
- Docker (optional)

## Installation

```bash
# Install dependencies
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

### Building the Image

```bash
# Build the Docker image
docker build -t daily-statements-api .
```

### Running with Docker

```bash
# Run the container
docker run -p 3000:3000 --env-file .env daily-statements-api
```

### Using Docker Compose

```bash
# Start the service
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop the service
docker-compose down
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:

```
http://localhost:3000/api
```

### Available Endpoints

#### GET /daily-statements

Retrieves daily statements filtered by date.

Query Parameters:

- `date` (required): Date in YYYY-MM-DD format

Example:

```bash
curl "http://localhost:3000/daily-statements?date=2024-03-20"
```

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
```

## License

This project is licensed under the MIT License.
