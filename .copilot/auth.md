# Authentication System

Implement user authentication:

## Register
- Fields: username, email, password
- Hash passwords using bcrypt
- Save user in MongoDB

## Login
- Validate credentials
- Return JWT token

## Middleware
- Create `authMiddleware` that verifies JWT tokens

Use Express routes:
- POST `/api/auth/register`
- POST `/api/auth/login`
