# Authentication Implementation Guide

## Overview
The authentication system has been fully integrated with the following features:
- User Registration with Email OTP Verification
- Login with JWT Cookies
- Password Reset with OTP
- Protected Routes
- Automatic Session Management

## Changes Made

### Frontend Changes

#### 1. **API Service** (`frontend/src/services/api.js`)
- Created Axios instance with automatic cookie handling
- Configured `withCredentials: true` for cookie support
- Added response interceptor for global error handling
- Base URL configured via environment variable `VITE_API_URL`

#### 2. **AuthContext** (`frontend/src/context/AuthContext.jsx`)
- Uncommented and fully implemented
- Integrated with API service
- Methods:
  - `register(name, email, password)` - User registration
  - `login(email, password)` - User login
  - `logout()` - Clear auth session
  - `verifyEmail(email, otp)` - Verify OTP
  - `resendVerification(email)` - Resend OTP
  - `forgotPassword(email)` - Request password reset
  - `resetPassword(email, otp, password)` - Reset password
- Provides `user`, `loading`, and `isAdmin` states

#### 3. **Main Entry Point** (`frontend/src/main.jsx`)
- Wrapped app with `AuthProvider` for global auth context

#### 4. **App Router** (`frontend/src/App.jsx`)
- Added routes for all auth pages:
  - `/login` - Login page
  - `/signup` - Registration page
  - `/otp` - OTP verification
  - `/forgot-password` - Password reset request
  - `/reset-password` - New password entry
- Added loading state handling
- Protected routes redirect logged-in users away from auth pages

#### 5. **Login Component** (`frontend/src/components/Auth/Login.jsx`)
- Connected to AuthContext
- Real API integration
- Form validation
- Loading state with spinner
- Error handling and display

#### 6. **Signup Component** (`frontend/src/components/Auth/Signup.jsx`)
- Connected to AuthContext
- Real API integration
- Password strength validation
- Terms acceptance requirement
- Redirects to OTP verification on success

#### 7. **OTP Component** (`frontend/src/components/Auth/Otp.jsx`)
- Connected to AuthContext
- Real API calls for verification
- Auto-focus and paste support
- Resend OTP with countdown timer
- 10-minute OTP validity

#### 8. **ForgotPassword Component** (`frontend/src/components/Auth/ForgotPassword.jsx`)
- Connected to AuthContext
- Real API integration
- Email validation
- Redirects to OTP screen after email sent

#### 9. **ResetPassword Component** (`frontend/src/components/Auth/ResetPassword.jsx`)
- Connected to AuthContext
- Real API integration
- Password strength validation
- Protected by OTP verification state

#### 10. **Environment Configuration** (`.env.local`)
```
VITE_API_URL=http://localhost:5000
```

### Backend Changes

#### 1. **Server Setup** (`backend/server.js`)
- Added `multer` import for file handling
- Configured CORS with `credentials: true` for cookie support
- Environment-based client URL: `process.env.CLIENT_URL`
- Development mode cookie settings (secure: false, sameSite: Lax)

#### 2. **Environment Variables** (`.env`)
```
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/gsem
JWT_SECRET='supersecretjwttokenkey'
```

#### 3. **Auth Middleware** (`backend/middleware/auth.js`)
- Validates JWT from cookies
- Attaches user to request object
- Returns 401 for invalid/missing tokens

#### 4. **Auth Controller** (`backend/controllers/authController.js`)
Fixed bug: Changed `req.user.id` to `req.user._id` in `getCurrentUser` function
- All auth endpoints return consistent response format
- Cookies set with proper flags:
  - `httpOnly: true` - Prevents XSS attacks
  - `secure: false` in development (true in production)
  - `sameSite: Lax` in development (None in production)
  - `maxAge: 7 days`

#### 5. **Auth Routes** (`backend/routes/authRoutes.js`)
All endpoints properly configured:
- `POST /register` - User registration with OTP
- `POST /verify-email` - Email verification with OTP
- `POST /login` - User login
- `POST /resend-verification` - Resend OTP
- `POST /forgot-password` - Password reset request
- `POST /reset-password` - Reset password with OTP
- `GET /me` - Get current user (protected)
- `POST /logout` - Logout and clear cookie

## Authentication Flow

### Registration Flow
1. User signs up with name, email, and password
2. Backend creates user and generates 6-digit OTP
3. OTP sent to user's email
4. User enters OTP to verify account
5. Account is marked as verified
6. JWT cookie is set in browser
7. User can now login

### Login Flow
1. User enters email and password
2. Backend validates credentials
3. Backend creates JWT token
4. JWT is sent as HTTP-only cookie
5. Frontend stores user data from response
6. User redirected to dashboard

### Password Reset Flow
1. User enters email on forgot-password page
2. Backend sends reset OTP to email
3. User redirects to OTP verification
4. User enters 6-digit OTP
5. User enters new password
6. Backend updates password and clears OTP
7. User redirected to login

### Session Management
- JWT stored in HTTP-only cookie (secure from XSS)
- Cookie sent automatically with requests (`withCredentials: true`)
- Protected endpoints check for valid token
- `/api/auth/me` endpoint used to verify session on app load
- Logout clears cookie and auth context

## Cookie Storage (Localhost)
Cookies are automatically stored in browser for `localhost:5173`:
- **Name:** `token`
- **Value:** JWT token
- **HttpOnly:** Yes (secure)
- **Secure:** No (for local development)
- **SameSite:** Lax
- **Expiry:** 7 days

View cookies in browser DevTools → Application → Cookies → http://localhost:5173

## Running the Application

### Backend
```bash
cd backend
npm install
npm start
```
Server runs on: `http://localhost:5000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs on: `http://localhost:5173`

## Testing the Flow

### 1. Test Signup
- Navigate to `/signup`
- Fill form and submit
- Check console/email for OTP (mock or actual depending on email config)
- Enter OTP at `/otp`
- Should redirect to login

### 2. Test Login
- Navigate to `/login`
- Enter credentials
- Check browser cookies (should have `token`)
- Should redirect to dashboard
- Refresh page - auth should persist

### 3. Test Logout
- Click logout button
- Cookie should be cleared
- Should redirect to login

### 4. Test Protected Routes
- Without token: Should redirect to login
- With token: Should access protected resources

### 5. Test Password Reset
- Navigate to `/forgot-password`
- Enter email
- Redirects to OTP verification
- Enter OTP and new password
- Should redirect to login
- Login with new password

## Dependencies Installed

### Frontend
- `axios` - HTTP client with cookie support
- `react-router-dom` - Routing
- `react` - UI library

### Backend
- `jsonwebtoken` - JWT creation and validation
- `bcryptjs` - Password hashing
- `cookie-parser` - Cookie parsing
- `cors` - CORS handling
- `express` - Server framework
- `mongoose` - MongoDB ODM

## Security Features

1. **Passwords** - Hashed with bcryptjs before storage
2. **JWT** - Signed with secret key, expires in 1 day
3. **Cookies** - HttpOnly flag prevents XSS access
4. **OTP** - 10-minute expiry, hashed storage
5. **CORS** - Configured to accept only frontend origin
6. **Environment Variables** - Secrets not hardcoded

## Troubleshooting

### Cookies Not Storing
- Ensure `withCredentials: true` in axios instance
- Ensure CORS allows `credentials: true`
- Check browser security settings

### 401 Errors on Protected Routes
- Token may be expired (7-day expiry)
- Cookie might not be sent (check credentials config)
- User session might be invalid

### OTP Issues
- Check email configuration in mailer.js
- OTP expires after 10 minutes
- OTP is 6 digits, numeric only

### JWT Decode Errors
- Ensure JWT_SECRET matches in .env
- Check token format in cookies
- Verify token is not corrupted

## Next Steps

1. Configure actual email service (Nodemailer is ready)
2. Add remember-me functionality
3. Implement refresh tokens for extended sessions
4. Add role-based access control (admin/user)
5. Set up production environment with secure cookies
6. Add two-factor authentication
7. Implement session timeout warnings
