# 🧪 Test Accounts - Quick Reference

## Test User Accounts Created ✅

Your database now has two fully seeded test accounts, both email-verified and ready to use immediately!

---

## 👤 Job Seeker Account

```
Name:     Nigam Subedi
Email:    jobseeker@gmail.com
Password: Jobseeker123
Type:     Job Seeker
```

**What you can do:**
- ✅ Login and access `/home` dashboard
- ✅ Browse jobs at `/jobs`
- ✅ View job details at `/job/:id`
- ✅ Access networking at `/network`
- ✅ Apply to jobs
- ✅ Manage your profile

**Cannot access:**
- ❌ `/jobportal` (redirects to `/home`)

---

## 💼 Job Provider Account

```
Email:    jobprovider@gmail.com
Password: Jobprovider123
Type:     Job Provider
```

**What you can do:**
- ✅ Login and access `/jobportal` dashboard
- ✅ View statistics cards
- ✅ Manage job postings
- ✅ View applicants
- ✅ Track applications

**Cannot access:**
- ❌ `/home` (redirects to `/jobportal`)
- ❌ `/jobs`, `/job/:id`, `/network`

---

## 🚀 How to Test

### Test Signup Flow
1. Go to `/signup`
2. Select role (Job Seeker or Job Provider)
3. Fill in details with your own credentials
4. Verify email with OTP
5. You'll be redirected to the appropriate dashboard

### Test Login Flow

**As Job Seeker:**
1. Go to `/login`
2. Enter: `jobseeker@gmail.com` / `Jobseeker123`
3. ✅ Should redirect to `/home`

**As Job Provider:**
1. Go to `/login`
2. Enter: `jobprovider@gmail.com` / `Jobprovider123`
3. ✅ Should redirect to `/jobportal`

### Test Role-Based Access

**As Job Seeker:**
1. Login as `jobseeker@gmail.com`
2. Try accessing `/jobportal` directly
3. ✅ Should auto-redirect to `/home`

**As Job Provider:**
1. Login as `jobprovider@gmail.com`
2. Try accessing `/home` directly
3. ✅ Should auto-redirect to `/jobportal`

---

## 📋 Features to Test

### Authentication
- [x] Signup with role selection
- [x] Email OTP verification
- [x] Login redirects
- [x] Route protection
- [x] Logout functionality

### Job Seeker Features
- [ ] Browse job listings
- [ ] View job details
- [ ] Apply to jobs
- [ ] Save jobs
- [ ] View applications
- [ ] Network with others

### Job Provider Features
- [ ] View dashboard
- [ ] See statistics
- [ ] Manage job postings
- [ ] View applicants
- [ ] Post new jobs

---

## 🔧 Database Commands

### Reseed Database
If you need to reset the test accounts:
```bash
npm run seed
```

### Verify Seeded Users
Check if users are in database:
```bash
node verify-seed.js
```

### Clear Both Users
To manually clear these test users:
```bash
# Use MongoDB Compass or CLI to delete:
db.users.deleteMany({ email: { $in: ["jobseeker@gmail.com", "jobprovider@gmail.com"] } })
```

---

## 📊 Database Details

### Collection: users

**Fields for each user:**
- `_id` - MongoDB ID
- `name` - User's name
- `email` - Login email
- `password` - Hashed password
- `userType` - "jobSeeker" or "jobProvider"
- `isVerified` - true (pre-verified)
- `isActive` - true (active account)
- `role` - "user" (standard user)
- `kycStatus` - "not_submitted"
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

---

## ✨ Tips for Testing

1. **Use Different Browsers**
   - Chrome for Job Seeker
   - Firefox for Job Provider
   - Or use Incognito/Private modes

2. **Test Logout**
   - Logout as one role
   - Verify token is cleared
   - Login as another role

3. **Check Console**
   - Open DevTools (F12)
   - Watch for route changes
   - Check for errors

4. **Test Error Cases**
   - Wrong password
   - Non-existent email
   - Invalid role selection

5. **Mobile Testing**
   - Test responsive design
   - Check role selection on mobile
   - Verify dashboard layout

---

## 🎯 Test Checklist

### Authentication Flow
- [ ] Signup as Job Seeker
- [ ] Signup as Job Provider
- [ ] Login as Job Seeker
- [ ] Login as Job Provider
- [ ] Logout works
- [ ] Password validation works

### Role-Based Routing
- [ ] Job Seeker can access `/home`
- [ ] Job Seeker cannot access `/jobportal`
- [ ] Job Provider can access `/jobportal`
- [ ] Job Provider cannot access `/home`
- [ ] Auto-redirect works on route change

### Dashboard Display
- [ ] Job Seeker dashboard displays correctly
- [ ] Provider dashboard shows stats
- [ ] All buttons are functional
- [ ] Navigation works
- [ ] Logout button works

### UI/UX
- [ ] Role selection cards look good
- [ ] Forms are easy to use
- [ ] Error messages are clear
- [ ] Loading states show
- [ ] Animations are smooth

---

## 🐛 Troubleshooting

### Password Not Working?
- **Check**: Verify password is exactly: `Jobseeker123` or `Jobprovider123`
- **Case sensitive**: Yes, capital J
- **Reset**: Run `npm run seed` to recreate

### Still Seeing Old Account?
- Clear browser cookies
- Clear localStorage
- Try Incognito/Private mode
- Check `.env` MONGO_URI is correct

### Can't Access Dashboard?
- Check userType is correct in database
- Verify user is email-verified (isVerified: true)
- Check JWT token in cookies
- Try logging out and back in

### Wrong Redirect After Login?
- Verify userType in database matches login
- Check RoleBasedRoute logic in App.jsx
- Clear browser cache
- Check console for errors

---

## 📚 Related Documentation

- **README_ROLE_BASED_AUTH.md** - Full implementation guide
- **QUICK_START_GUIDE.md** - Testing guide
- **IMPLEMENTATION_CHECKLIST.md** - Detailed test scenarios

---

## ✅ You're All Set!

Both test accounts are ready to use. Start testing the role-based authentication system now! 🚀

**Created**: February 3, 2026
**Status**: Ready for Testing
