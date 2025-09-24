#!/bin/bash

# GitHub Achievement Generator Setup Script
# This script helps you set up the environment for generating GitHub achievements

echo "🚀 GitHub Achievement Generator Setup"
echo "======================================"
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "💡 Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    echo "💡 Please install npm (usually comes with Node.js)"
    exit 1
fi

echo "✅ npm is installed: $(npm --version)"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created from template"
    echo
    echo "⚠️  IMPORTANT: Please edit .env file with your GitHub credentials:"
    echo "   1. GITHUB_TOKEN=your_personal_access_token"
    echo "   2. GITHUB_USERNAME=your_github_username"
    echo
    echo "💡 Get a token at: https://github.com/settings/tokens"
    echo "   Required scopes: repo, read:user, read:org"
    echo
else
    echo "✅ .env file already exists"
fi

# Install dependencies if package.json exists
if [ -f package.json ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "⚠️  No package.json found, skipping dependency installation"
fi

# Make scripts executable
echo "🔧 Setting script permissions..."
chmod +x scripts/*.js
chmod +x scripts/setup.sh
echo "✅ Script permissions set"

# Test GitHub token if provided
if [ -f .env ]; then
    source .env
    if [ ! -z "$GITHUB_TOKEN" ] && [ ! -z "$GITHUB_USERNAME" ]; then
        echo "🔍 Testing GitHub API access..."
        
        # Simple test using curl
        response=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
                      -H "Accept: application/vnd.github.v3+json" \
                      https://api.github.com/user)
        
        if echo "$response" | grep -q '"login"'; then
            echo "✅ GitHub API access test passed"
            username=$(echo "$response" | grep -o '"login":"[^"]*"' | cut -d'"' -f4)
            echo "👤 Authenticated as: $username"
        else
            echo "❌ GitHub API access test failed"
            echo "💡 Please check your GITHUB_TOKEN in .env file"
        fi
    else
        echo "⚠️  GITHUB_TOKEN or GITHUB_USERNAME not set in .env"
        echo "💡 Please edit .env file with your credentials"
    fi
fi

echo
echo "🎯 Available Achievement Generators:"
echo "  🦈 Pull Shark:     node scripts/pullShark.js"
echo "  🌌 Galaxy Brain:   node scripts/galaxyBrain.js"
echo "  🚀 All at once:    node scripts/generateAll.js"
echo
echo "📚 Quick Start:"
echo "  1. Edit .env file with your GitHub credentials"
echo "  2. Run: node scripts/generateAll.js"
echo "  3. Wait for GitHub to process (10-30 minutes)"
echo "  4. Check your profile for new achievement badges!"
echo
echo "🔗 Your GitHub Profile: https://github.com/$GITHUB_USERNAME"
echo
echo "✅ Setup completed! Ready to generate achievements! 🏆"