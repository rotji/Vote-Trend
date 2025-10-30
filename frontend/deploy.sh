#!/bin/bash
# Frontend Deployment Script for Netlify

echo "🚀 Starting frontend deployment preparation..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linter..."
npm run lint

# Build the project
echo "🏗️ Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📂 Built files are in the 'dist' directory"
    echo "🌐 Ready for Netlify deployment!"
else
    echo "❌ Build failed!"
    exit 1
fi