#!/bin/bash
# Build frontend
cd frontend
npm install
npm run build

# Go to backend and install dependencies
cd ../backend
npm install

echo "Build complete." 