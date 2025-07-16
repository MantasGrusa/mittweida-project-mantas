# Location-Based Game - Mittweida Explorer

A full-stack location-based exploration game built with React, TypeScript, and NestJS.

## 🎮 Features

- User authentication (signup, login, profile)
- 9 real Mittweida locations across 3 categories (Sports, Nightlife, Culture)
- QR code scanning for location completion
- Progress tracking and achievements
- Friends system with challenges
- Interactive maps with real coordinates

## 🚀 How to Run

### Prerequisites
- Node.js 16+
- Modern web browser with camera support

### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```
✅ **Backend:** `http://localhost:3000`  
✅ **API Documentation:** `http://localhost:3000/api`

### Frontend Setup
```bash
cd src
npm install  
npm run dev
```
✅ **Frontend:** `http://localhost:5173`  
✅ **Network URL:** `http://192.168.x.x:5173` (for mobile testing)

## 🎯 How to Play

1. **Sign up** for an account
2. **Choose category** (Sports, Nightlife, Culture)
3. **Get random location** in Mittweida
4. **Navigate** using the interactive map
5. **Scan QR code** at the location to complete it
6. **Track progress** and unlock achievements

## 📱 QR Codes

**QR codes for testing are included in the `qr-codes/` folder.**

Each location has a specific QR code:
- `SPORTS_001_QR` - Mittweida Sports Center
- `SPORTS_002_QR` - Zschopauer Mulde Riverside Trail
- `SPORTS_003_QR` - Mittweida Football Stadium
- `NIGHTLIFE_001_QR` - Studentenclub Red
- `NIGHTLIFE_002_QR` - Café Bar Central
- `NIGHTLIFE_003_QR` - Ratskeller Mittweida
- `CULTURE_001_QR` - Mittweida Castle Museum
- `CULTURE_002_QR` - St. Laurentius Church
- `CULTURE_003_QR` - University Gallery

## 🧪 Testing

1. **Start both backend and frontend**
2. **Create an account** and choose a category
3. **Note the expected QR code** shown in the scanner
4. **Use corresponding QR image** from `qr-codes/` folder
5. **Scan with your device camera** or display on another screen

## 📚 API Documentation

Full interactive API documentation available at: `http://localhost:3000/api`

### Authentication Endpoints
- `POST /users/signup` - Create a new user account
- `POST /users/login` - Login user

### Game Endpoints
- `GET /users/location/random` - Get random location by category
- `POST /users/scan-qr/{userId}` - Scan QR code to complete location
- `GET /users/progress/{userId}` - Get user progress and completed locations

### User Management
- `GET /users` - Get all users
- `GET /users/{id}` - Get user by ID
- `PATCH /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

### Friends System
- `GET /users/friends/{userId}` - Get user friends
- `POST /users/friends/{userId}` - Add friend by username
- `DELETE /users/friends/{userId}/{friendId}` - Remove friend
- `POST /users/friends/challenge/{userId}/{friendId}` - Challenge a friend

## 🏗️ Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, Leaflet Maps  
**Backend:** NestJS, TypeScript, File-based JSON storage  
**Testing:** Vitest for component testing