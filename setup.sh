#!/bin/bash

# Portfolio Setup Script for Vercel Deployment
echo "🚀 Setting up Portfolio for Vercel Deployment with Supabase Database"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📋 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✅ Created .env.local file"
    echo "⚠️  Please update .env.local with your Supabase credentials!"
else
    echo "✅ .env.local already exists"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Check if database directory exists
if [ ! -d "database" ]; then
    echo "❌ Database directory not found"
    exit 1
else
    echo "✅ Database schema files found"
fi

# Check if src/lib/supabase.ts exists
if [ ! -f "src/lib/supabase.ts" ]; then
    echo "❌ Supabase configuration file not found"
    exit 1
else
    echo "✅ Supabase configuration found"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Create a Supabase project at https://supabase.com"
echo "2. Update .env.local with your Supabase URL and key"
echo "3. Run the SQL scripts in database/ folder in Supabase SQL Editor"
echo "4. Test locally with: npm run dev"
echo "5. Deploy to Vercel with environment variables"
echo ""
echo "📖 See VERCEL_DEPLOYMENT_GUIDE.md for detailed instructions"
echo "✨ Your portfolio is ready for database-powered deployment!"