# API Endpoints Reference

## User Profile Endpoints

### 1. Get User Profile
**Endpoint**: `GET /api/user/profile`

**Authentication**: Required (JWT token in cookie or Authorization header)

**Request**:
```
GET http://localhost:5000/api/user/profile
Cookie: auth_token=<token>
```

**Response** (Success):
```json
{
  "success": true,
  "user": {
    "_id": "user_id_123",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "New York, USA",
    "jobTitle": "Senior Software Engineer",
    "bio": "Passionate developer with 5+ years of experience...",
    "profileImage": "data:image/jpeg;base64,...",
    "skills": ["JavaScript", "React", "Node.js", "MongoDB"],
    "experience": [
      {
        "_id": "exp_1",
        "position": "Senior Developer",
        "company": "Tech Corp",
        "description": "Led team of 5 developers...",
        "startDate": "2022-01-01T00:00:00.000Z",
        "endDate": null,
        "isCurrent": true
      }
    ],
    "education": [
      {
        "_id": "edu_1",
        "degree": "B.S. Computer Science",
        "school": "MIT",
        "field": "Computer Science",
        "startDate": "2018-09-01T00:00:00.000Z",
        "endDate": "2022-05-31T00:00:00.000Z",
        "isCurrent": false
      }
    ],
    "kycStatus": "approved",
    "kycDetails": null
  }
}
```

**Response** (Error - User not found):
```json
{
  "success": false,
  "message": "User not found"
}
```

---

### 2. Update User Profile
**Endpoint**: `PUT /api/user/profile`

**Authentication**: Required (JWT token in cookie or Authorization header)

**Request**:
```
PUT http://localhost:5000/api/user/profile
Content-Type: application/json
Cookie: auth_token=<token>

{
  "fullName": "Jane Doe",
  "phone": "+1 (555) 987-6543",
  "location": "San Francisco, USA",
  "jobTitle": "Full Stack Developer",
  "bio": "Experienced developer focused on web technologies",
  "skills": ["Python", "Django", "React", "PostgreSQL"],
  "experience": [
    {
      "position": "Senior Developer",
      "company": "Tech Startup",
      "description": "Built scalable web applications",
      "startDate": "2022-01-01",
      "endDate": null,
      "isCurrent": true
    }
  ],
  "education": [
    {
      "degree": "B.S. Software Engineering",
      "school": "Stanford University",
      "field": "Software Engineering",
      "startDate": "2018-09-01",
      "endDate": "2022-05-31",
      "isCurrent": false
    }
  ]
}
```

**Response** (Success):
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "_id": "user_id_123",
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1 (555) 987-6543",
    "location": "San Francisco, USA",
    "jobTitle": "Full Stack Developer",
    "bio": "Experienced developer focused on web technologies",
    "profileImage": "data:image/jpeg;base64,...",
    "skills": ["Python", "Django", "React", "PostgreSQL"],
    "experience": [...],
    "education": [...]
  }
}
```

**Response** (Error - Validation failed):
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Email already exists"
}
```

---

## Frontend API Service

**File**: `frontend/src/services/api.js`

### Usage:

```javascript
import { getUserFullProfile, saveUserProfile } from "../services/api.js";

// Fetch user profile
const fetchProfile = async () => {
  try {
    const response = await getUserFullProfile();
    if (response.data.success) {
      const userData = response.data.user;
      console.log(userData);
    }
  } catch (error) {
    console.error("Error:", error.response?.data?.message);
  }
};

// Save user profile
const saveProfile = async (profileData) => {
  try {
    const response = await saveUserProfile(profileData);
    if (response.data.success) {
      console.log("Profile saved!");
    }
  } catch (error) {
    console.error("Error:", error.response?.data?.message);
  }
};
```

---

## Field Specifications

### Profile Fields

| Field | Type | Max Length | Required | Notes |
|-------|------|-----------|----------|-------|
| fullName | String | - | No | User's full name |
| email | String | - | No | Must be valid email format |
| phone | String | - | No | Phone number in any format |
| location | String | - | No | City, Country format recommended |
| jobTitle | String | - | No | Current job title |
| bio | String | 500 | No | Professional summary |
| profileImage | String (base64) | - | No | Profile picture |
| skills | Array[String] | - | No | Array of skill names |

### Experience Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| position | String | Yes | Job position/title |
| company | String | Yes | Company name |
| description | String | No | Job description |
| startDate | Date | No | Start date (ISO format) |
| endDate | Date | No | End date (null if current) |
| isCurrent | Boolean | No | Currently working here |

### Education Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| degree | String | Yes | Degree name (B.S., M.S., etc.) |
| school | String | Yes | University/School name |
| field | String | No | Field of study |
| startDate | Date | No | Start date (ISO format) |
| endDate | Date | No | End date (null if current) |
| isCurrent | Boolean | No | Currently studying |

---

## Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authenticated"
}
```
**Cause**: JWT token expired or missing

### 404 Not Found
```json
{
  "success": false,
  "message": "User not found"
}
```
**Cause**: User ID doesn't exist in database

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Specific error message"
}
```
**Cause**: Database or server error

---

## Curl Examples

### Get Profile
```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Cookie: auth_token=<your_token>"
```

### Update Profile
```bash
curl -X PUT http://localhost:5000/api/user/profile \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=<your_token>" \
  -d '{
    "fullName": "John Doe",
    "phone": "+1234567890",
    "bio": "Software developer"
  }'
```

---

## Rate Limiting

- No rate limiting currently implemented
- Recommended for production: 100 requests per 15 minutes per user

---

## CORS Configuration

**Enabled**: Yes
**Origins**: All (configured in backend)
**Credentials**: Allowed

---

## Notes

1. **Base64 Images**: Currently storing images as base64 strings. For large images, consider:
   - Compressing before encoding
   - Uploading to cloud storage
   - Storing URLs instead

2. **Date Format**: All dates should be ISO 8601 format (e.g., "2022-01-01T00:00:00.000Z")

3. **Authentication**: Token must be valid and not expired. Token is automatically sent via cookies.

4. **Field Validation**: 
   - Email must match `/^\S+@\S+\.\S+$/` pattern
   - Bio limited to 500 characters
   - Required fields checked on backend

---

**Last Updated**: 2025-01-29
**Version**: 1.0
