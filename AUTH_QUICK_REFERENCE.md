# Authentication Quick Reference

## 🔐 API Endpoints

### Registration & Verification
```
POST /api/auth/register
Body: { name, email, password }
Response: { success, message, user }
Cookie: Sets JWT token

POST /api/auth/verify-email
Body: { email, otp }
Response: { success, message, user }

POST /api/auth/resend-verification
Body: { email }
Response: { success, message }
```

### Login & Logout
```
POST /api/auth/login
Body: { email, password }
Response: { success, message, user }
Cookie: Sets JWT token

POST /api/auth/logout
Response: { success, message }
Cookie: Clears JWT token
```

### Password Management
```
POST /api/auth/forgot-password
Body: { email }
Response: { success, message }

POST /api/auth/reset-password
Body: { email, otp, password }
Response: { success, message }
```

### Session
```
GET /api/auth/me
Headers: Cookie: token=<jwt>
Response: { success, user }
Auth: Required (JWT in cookie)
```

## 🛣️ Frontend Routes

```
/login              - Login page
/signup             - Registration page
/otp                - OTP verification
/forgot-password    - Password reset request
/reset-password     - New password entry
/home               - Home (public)
```

## 🔑 Key Files Modified

### Frontend
- `src/services/api.js` - Axios instance with cookies
- `src/context/AuthContext.jsx` - Global auth state
- `src/main.jsx` - AuthProvider wrapper
- `src/App.jsx` - Routes with auth
- `src/components/Auth/*.jsx` - All auth pages
- `.env.local` - API URL configuration

### Backend
- `server.js` - CORS & middleware setup
- `routes/authRoutes.js` - Auth endpoints
- `controllers/authController.js` - Auth logic
- `middleware/auth.js` - JWT verification
- `.env` - Configuration

## 🍪 Cookie Details

**Name:** token
**Value:** JWT (JSON Web Token)
**HttpOnly:** Yes ✓ (XSS protection)
**Secure:** No (development)
**SameSite:** Lax
**Max Age:** 7 days
**Domain:** localhost
**Path:** /

## ✅ Authentication Flow

### Signup → Verify → Login
```
1. User fills signup form
2. Backend creates user + OTP
3. Email sent with OTP (console log in dev)
4. User enters 6-digit OTP
5. Email verified → JWT cookie set
6. User redirected to login
7. User logs in with credentials
8. JWT cookie validated
9. User data loaded from /api/auth/me
10. Redirected to home with auth
```

## 🧪 Testing Checklist

- [ ] Signup creates account
- [ ] OTP email received (check console)
- [ ] OTP verification works
- [ ] JWT cookie appears after signup
- [ ] Login works with credentials
- [ ] Cookie persists on refresh
- [ ] Protected routes check auth
- [ ] Logout clears cookie
- [ ] Forgot password flow works
- [ ] Reset password with OTP works
- [ ] /api/auth/me returns user when authenticated

## 🐛 Debug Tips

### Check JWT Token
```javascript
// In browser console
document.cookie
```

### Check Token Payload
```javascript
// Decode JWT (in console)
atob(document.cookie.split('=')[1].split('.')[1])
```

### View Auth State
```javascript
// In React DevTools
<AuthContext> → Look for user, loading, isAdmin
```

### Backend Logs
```bash
# Watch server logs for OTP and JWT creation
npm start
```

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Action completed",
  "user": {
    "_id": "mongoid",
    "name": "User Name",
    "email": "user@email.com",
    "role": "user",
    "isVerified": true,
    "createdAt": "2024-01-11T..."
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🚀 Start Commands

**Backend:**
```bash
cd backend && npm start
# Server on http://localhost:5000
```

**Frontend:**
```bash
cd frontend && npm run dev
# App on http://localhost:5173
```

## 🔒 Security Notes

1. **Passwords** - Hashed with bcryptjs (never stored plain)
2. **JWT Secret** - Change in production (.env JWT_SECRET)
3. **CORS** - Only allows frontend origin (localhost:5173)
4. **HttpOnly Cookies** - Cannot be accessed by JavaScript
5. **OTP** - Hashed, expires in 10 minutes
6. **Session** - 7 days (change maxAge in setAuthCookie)

## 🆘 Common Issues

### Cookies Not Working
- Check `withCredentials: true` in api.js
- Check CORS `credentials: true` in server.js
- Check browser cookie settings

### 401 Unauthorized
- Token expired (7 day max age)
- Token tampered (JWT_SECRET mismatch)
- Cookie not sent (credentials not enabled)

### OTP Not Received
- Check backend console for OTP (dev mode logs it)
- Configure actual email service (Nodemailer ready)
- Check email spam folder

### Session Lost on Refresh
- Check /api/auth/me endpoint
- Check auth middleware (auth.js)
- Check cookie storage in browser

---

📚 Full documentation: See `AUTHENTICATION_SETUP.md`
