# Recam

Recam is a full-stack real estate media delivery platform for photography companies and real estate agents. It supports the workflow from creating a property listing case through media selection, page preview, asset download, and final delivery.

The repository currently contains a completed React frontend prototype and an ASP.NET Core backend under active development.

## Project Goals(?)

Recam is designed to support two primary user roles:

- **Admin**: creates and manages listing cases, uploads media, assigns staff, reviews agent selections, and controls delivery status.
- **Agent**: views assigned listing cases, selects display media, edits the final property page, previews the result, and downloads delivery assets.

## Current Implementation Status

### Implemented

- React and TypeScript frontend screens
- ASP.NET Core Web API project
- PostgreSQL development database with Docker Compose
- Entity Framework Core database access and migrations
- Listing Case entity and initial database schema
- Create Listing Case API
- Get Listing Case by ID API
- Request validation with data annotations
- Service abstraction and dependency injection
- Health endpoint
- Swagger UI and OpenAPI documentation
- Local secrets through .NET User Secrets


## Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios
- MUI date pickers

### Backend

- .NET 10
- ASP.NET Core Web API
- Entity Framework Core
- Npgsql
- PostgreSQL 16
- Swagger UI and OpenAPI

### Development Infrastructure

- Docker Compose
- .NET User Secrets
- Git and GitHub

## Repository Structure

```text
Recam/
├── backend/
│   ├── Controller/
│   ├── Data/
│   │   └── Migrations/
│   ├── DTOs/
│   ├── Entities/
│   ├── Enums/
│   ├── Interfaces/
│   ├── Services/
│   ├── Program.cs
│   └── backend.csproj
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── compoments/
│   │   ├── pages/
│   │   └── pages2/
│   └── package.json
├── .env.example
├── .gitignore
├── docker-compose.yml
└── Recam.sln
```

## Prerequisites

Install the following tools before running the project:

- [.NET SDK 10](https://dotnet.microsoft.com/download)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

Verify the installations:

```bash
dotnet --version
docker --version
docker compose version
node --version
npm --version
git --version
```

## Quick Start

The commands below assume the repository has already been cloned and the terminal is open in the repository root.

### 1. Configure the PostgreSQL container

Create the local Docker environment file:

```bash
cp .env.example .env
```

Open `.env` and replace the example password:

```env
POSTGRES_DB=recam_db
POSTGRES_USER=recam_user
POSTGRES_PASSWORD=your_local_password
```

The `.env` file is ignored by Git and must not be committed.

### 2. Start PostgreSQL

Make sure Docker Desktop is running, then execute:

```bash
docker compose up -d
```

Check the database status:

```bash
docker compose ps
```

The `recam-postgres` service should report `healthy`. PostgreSQL is published on host port `5433` to avoid conflicts with other local PostgreSQL projects:

```text
localhost:5433 -> recam-postgres:5432
```

### 3. Configure the backend connection string

Enter the backend directory:

```bash
cd backend
```

Restore NuGet dependencies:

```bash
dotnet restore
```

Install the Entity Framework Core CLI if it is not already installed:

```bash
dotnet tool install --global dotnet-ef --version "10.*"
```

If `dotnet-ef` is already installed, update it instead:

```bash
dotnet tool update --global dotnet-ef --version "10.*"
```

Save the local database connection with .NET User Secrets. Use the same password as `POSTGRES_PASSWORD` in the root `.env` file:

```bash
dotnet user-secrets set \
  "ConnectionStrings:DefaultConnection" \
  "Host=localhost;Port=5433;Database=recam_db;Username=recam_user;Password=your_local_password"
```

Do not commit a real connection string or password to the repository.

### 4. Apply database migrations

From the `backend` directory, run:

```bash
dotnet ef database update
```

List the available migrations and their status:

```bash
dotnet ef migrations list
```

### 5. Run the backend

From the `backend` directory, run:

```bash
dotnet run
```

The development API listens at:

```text
http://localhost:5138
```

Useful development URLs:

- Swagger UI: `http://localhost:5138/swagger`
- Health endpoint: `http://localhost:5138/api/health`

Keep this terminal running while using the API.

### 6. Run the frontend

Open a second terminal from the repository root:

```bash
cd frontend
npm install
```

Create or update `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5138/api
```

Start the Vite development server:

```bash
npm run dev
```

Open the URL printed by Vite, normally:

```text
http://localhost:5173
```

## API Documentation

Swagger UI is available in the Development environment:

```text
http://localhost:5138/swagger
```

### Current endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Check whether the API is running |
| `POST` | `/api/listing-cases` | Create a Listing Case |
| `GET` | `/api/listing-cases/{id}` | Get a Listing Case by ID |

### Create a Listing Case

Request:

```http
POST /api/listing-cases
Content-Type: application/json
```

```json
{
  "address": "93 Beach Road, Sydney NSW",
  "bedrooms": 3,
  "bathrooms": 2,
  "garages": 1,
  "area": 180.5
}
```

Successful response:

```text
201 Created
```

The response contains the generated Listing Case ID and a `Location` header for the new resource.

### Get a Listing Case

```http
GET /api/listing-cases/{id}
```

Possible responses:

- `200 OK`: the Listing Case was found.
- `404 Not Found`: no Listing Case exists with the supplied ID.

## Common Development Commands

### Build the backend solution

Run from the repository root:

```bash
dotnet build Recam.sln
```

### Run the backend with automatic reload

Run from the `backend` directory:

```bash
dotnet watch run
```

### Create a new migration

Run this only after changing an EF Core entity or database configuration:

```bash
dotnet ef migrations add MigrationName --output-dir Data/Migrations
```

Then apply it:

```bash
dotnet ef database update
```

### Build the frontend

Run from the `frontend` directory:

```bash
npm run build
```

### Lint the frontend

Run from the `frontend` directory:

```bash
npm run lint
```

## Stopping the Development Environment

Stop the ASP.NET Core server with `Control + C` in its terminal.

Stop the PostgreSQL container from the repository root:

```bash
docker compose down
```

This stops the container without deleting database data.

To remove the local PostgreSQL data as well:

```bash
docker compose down -v
```

Warning: the `-v` option permanently deletes the local database volume.

## Configuration and Secret Management

- `.env` is used by Docker Compose and is ignored by Git.
- `.env.example` documents required Docker variables and is safe to commit.
- `frontend/.env` contains the local frontend API URL and is ignored by the frontend project.
- .NET User Secrets store the backend connection string during local development.
- Production secrets must be supplied by the deployment environment or a managed secret store.

Never commit passwords, access tokens, private keys, or production connection strings.

## Troubleshooting

### The root URL returns 404

`http://localhost:5138/` does not currently have a route. Use:

```text
http://localhost:5138/swagger
http://localhost:5138/api/health
```

### PostgreSQL port 5432 is already in use

Recam publishes PostgreSQL on host port `5433`. Confirm that `docker-compose.yml` contains:

```yaml
ports:
  - "5433:5432"
```

The backend connection string must also use `Port=5433`.

### PostgreSQL password authentication fails

Confirm that the password in the backend User Secrets matches `POSTGRES_PASSWORD` in `.env`.

If the database was initialized with an old password and contains no data that needs to be preserved, recreate the local volume:

```bash
docker compose down -v
docker compose up -d
```

Warning: this deletes all local data in the Recam PostgreSQL volume.

### A new Controller does not appear in Swagger

Restart the backend:

```bash
dotnet run
```

Alternatively, use automatic reload during development:

```bash
dotnet watch run
```


## License

This project is currently maintained as a personal portfolio and learning project. No open-source license has been assigned yet.
