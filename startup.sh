#!/bin/bash

handle_error() {
  echo "❌ An error occurred. Exiting."
  echo $1
  exit 1
}

# Parse command line arguments
RESET_FLAG=""
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --reset) RESET_FLAG="--volumes"; shift ;;
    *) echo "Unknown parameter: $1"; exit 1 ;;
  esac
done

# Stop and remove existing containers
echo "🛑 Stopping existing containers..."
docker compose down --remove-orphans $RESET_FLAG || handle_error "Failed to stop existing containers"

# Start the database with Docker Compose
echo "🚀 Starting database with Docker Compose..."
docker compose up -d || handle_error "Failed to start database"
sleep 2 || handle_error "Failed to wait for PostgreSQL to be ready"

# Run Prisma db push
echo "🔄 Running Prisma db push..."
npx prisma db push || handle_error "Failed to run Prisma db push"

# Start the Next.js development server
echo "✨ Starting Next.js development server..."
npm run dev