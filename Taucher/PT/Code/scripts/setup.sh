#!/bin/bash

echo "🚀 Setting up Note App Development Environment"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running ESLint..."
npm run lint

# Run tests
echo "🧪 Running tests..."
npm test

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "🐳 Docker is available"
    echo "📦 Building Docker image..."
    docker build -t noteapp .
    echo "✅ Docker image built successfully"
    echo "🚀 To run the container: docker run -p 3001:3001 noteapp"
else
    echo "⚠️  Docker is not installed. Skipping Docker build."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Available commands:"
echo "  npm start          - Start the application"
echo "  npm run dev        - Start with hot reload"
echo "  npm test           - Run all tests"
echo "  npm run lint       - Run ESLint"
echo "  npm run lint:fix   - Fix ESLint issues"
echo ""
echo "🌐 Application will run on: http://localhost:3001" 