#!/bin/bash
# Backend Deployment Script for Render

echo "🚀 Starting backend deployment preparation..."

# Install dependencies
echo "📦 Installing production dependencies..."
npm ci --only=production

# Run TypeScript compilation
echo "🔧 Compiling TypeScript..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Compiled files are in the 'dist' directory"
    echo "🌐 Ready for Render deployment!"
    
    # Optional: Run migrations if needed
    echo "🔄 Running database migrations..."
    npm run migrate
else
    echo "❌ Build failed!"
    exit 1
fi