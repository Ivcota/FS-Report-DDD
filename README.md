# ServiceReport

A modern web application for managing and analyzing field service reports. Built with Next.js, TypeScript, and Prisma, following Domain-Driven Design principles.

## Features

- **Service Report Parser**: Efficiently parse and analyze service reports with our advanced parsing tool
- **Workstation Report Management**: Comprehensive system for tracking and managing service reports across your organization
- **User Authentication**: Secure login and registration system
- **Modern UI**: Built with Tailwind CSS and Geist font for a beautiful, responsive interface

## Tech Stack

- **Framework**: Next.js 15.0.3
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Testing**: Vitest
- **AI Integration**: OpenAI API for advanced parsing capabilities
- **Architecture**: Domain-Driven Design (DDD)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** (comes with Node.js)
- **Docker** and **Docker Compose** (for local database)
- **OpenAI API Key** (for service report parsing features)

## Getting Started

1. Clone the repository

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

Create a `.env` file in the root directory with the following variables:

```bash
# Database Configuration (for local development with Docker)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fs_report_db"

# OpenAI API (for service report parsing)
OPENAI_API_KEY="your_openai_api_key"

# NextAuth Configuration
NEXTAUTH_SECRET="your_nextauth_secret_key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Run the startup script to initialize the database and start the development server:

```bash
npm run startup
```

This will:
- Start PostgreSQL using Docker Compose
- Run Prisma database migrations
- Start the Next.js development server

> **Note**: Use `npm run startup -- --reset` to reset the database and start fresh.

Alternatively, you can start the development server manually:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Development

### Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run test` - Run tests with Vitest
- `npm run test:watch` - Run tests in watch mode
- `npm run coverage` - Generate test coverage report
- `npm run lint` - Run ESLint
- `npm run startup` - Full startup script (Docker + DB + Dev server)
- `npm run db:migrate` - Run Prisma migrations
- `npm run db:generate` - Generate Prisma client
- `npm run build:deploy` - Build script for deployment

### Docker Setup

The project includes a Docker Compose configuration for running PostgreSQL locally:

```bash
docker compose up -d    # Start database
docker compose down     # Stop database
docker compose down --volumes  # Stop and remove database volumes
```

The startup script (`npm run startup`) handles this automatically.

## Project Structure

The project follows a Domain-Driven Design architecture, organized into bounded contexts and modules:

### Core Structure

- `/src/app` - Next.js application routes and pages
  - `/(features)` - Feature routes (parser, workstation)
  - `/(user)` - User authentication pages
  - `/api` - API routes including NextAuth
  - `/ui` - Reusable UI components
- `/src/module` - Core business logic modules organized by domain
- `/prisma` - Database schema and migrations

### Domain Modules

Each module under `/src/module` follows the DDD layered architecture:

```
module/
├── service_report/             # Bounded context for service reports
│   ├── application/            # Application services and use cases
│   │   └── use_cases/          # Individual use case implementations
│   ├── domain/                 # Domain model and business logic
│   │   ├── entities/           # Domain entities
│   │   ├── events/             # Domain events
│   │   └── infra_ports/        # Repository interfaces
│   └── infrastructure/         # Infrastructure implementations
│       └── repositories/       # Concrete repository implementations
└── shared/                     # Shared kernel for cross-cutting concerns
    ├── domain/                 # Shared domain primitives
    └── infrastructure/         # Shared infrastructure services
```

### Key DDD Concepts Implemented

- **Bounded Contexts**: Clear separation between different domain areas (e.g., service reports, user management)
- **Domain Events**: Event-driven communication between bounded contexts
- **Repositories**: Interface-based persistence abstraction
- **Use Cases**: Encapsulated business operations
- **Service Container**: Centralized dependency injection container
- **Value Objects**: Immutable domain primitives
- **Aggregates**: Consistency boundaries for related entities

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Domain-Driven Design Reference](https://www.domainlanguage.com/ddd/reference/)
