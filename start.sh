#!/bin/bash
# Quick Start Script for Authentication Testing

echo "🚀 Starting Globalizing Business Authentication Setup"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${YELLOW}⚠️  Please run this script from the root directory${NC}"
    exit 1
fi

echo -e "${BLUE}Backend Setup${NC}"
echo "================================"
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

echo -e "${GREEN}✓ Backend ready${NC}"
echo ""

# Go back to root
cd ..

echo -e "${BLUE}Frontend Setup${NC}"
echo "================================"
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

echo -e "${GREEN}✓ Frontend ready${NC}"
echo ""

# Go back to root
cd ..

echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${YELLOW}To start the application:${NC}"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend && npm start"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend && npm run dev"
echo ""
echo -e "${YELLOW}Then open:${NC}"
echo "  http://localhost:5173"
echo ""
echo -e "${BLUE}Test Accounts:${NC}"
echo "================================"
echo "After signup, use any valid email and password"
echo "OTP will be logged in backend console (check npm start output)"
echo ""
echo -e "${YELLOW}Auth Endpoints:${NC}"
echo "================================"
echo "Register:      POST http://localhost:5000/api/auth/register"
echo "Login:         POST http://localhost:5000/api/auth/login"
echo "Verify Email:  POST http://localhost:5000/api/auth/verify-email"
echo "Current User:  GET  http://localhost:5000/api/auth/me"
echo "Logout:        POST http://localhost:5000/api/auth/logout"
echo "Forgot Pass:   POST http://localhost:5000/api/auth/forgot-password"
echo "Reset Pass:    POST http://localhost:5000/api/auth/reset-password"
echo ""
echo -e "${YELLOW}Testing Tips:${NC}"
echo "================================"
echo "1. Open DevTools → Application → Cookies"
echo "2. Look for 'token' cookie from http://localhost:5173"
echo "3. The token is your JWT stored securely"
echo "4. Refresh page - auth persists via cookie"
echo "5. Check backend console for OTP codes"
echo ""
