#!/bin/bash

echo "🏥 Starting HealthWise Platform..."
echo "=================================="

# Check if backend virtual environment exists
if [ ! -d "backend/venv" ]; then
    echo "❌ Backend virtual environment not found!"
    echo "Please run: cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
    exit 1
fi

# Check if MySQL is running
if ! systemctl is-active --quiet mysql; then
    echo "❌ MySQL is not running!"
    echo "Please start MySQL: sudo systemctl start mysql"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Start backend in background
echo "🐍 Starting Python Backend (Port 8001)..."
cd backend
source venv/bin/activate
python run.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 5

# Check if backend is running
if curl -s http://localhost:8001/health > /dev/null; then
    echo "✅ Backend started successfully at http://localhost:8001"
    echo "📚 API Documentation: http://localhost:8001/docs"
else
    echo "❌ Backend failed to start"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo "🚀 Starting Next.js Frontend (Port 3000)..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 HealthWise Platform is starting up!"
echo "=================================="
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8001"
echo "API Docs: http://localhost:8001/docs"
echo ""
echo "Sample Login Credentials:"
echo "Admin:   admin@healthwise.com / admin123"
echo "Patient: patient@example.com / patient123"
echo "Doctor:  doctor@example.com / doctor123"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
trap 'echo ""; echo "🛑 Stopping HealthWise Platform..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0' INT

# Keep script running
wait