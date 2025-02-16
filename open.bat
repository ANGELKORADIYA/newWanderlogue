@echo off

cd Backend
echo Starting backend server...
start cmd /k "npm run dev"


cd ..
cd Frontend
echo Starting frontend server...
start cmd /k "npm run dev"


pause
