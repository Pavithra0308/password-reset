# 🔐 Password Reset Flow – Client

This is the frontend for the Password Reset Flow, built with React and designed to interact with a Node.js/Express backend.

## 🚀 Features
- User registration and login
- Request password reset via email
- Reset password using a secure token
- Form validation and user feedback
  
## 🧱 Tech Stack
- React
- React Router
- Tailwind CSS (optional)

# 🔐 Password Reset Flow – Server

This is the backend for the Password Reset Flow, built with Node.js, Express, and MongoDB. It handles user authentication, password hashing, token generation, and email-based password reset.

## 🚀 Features
- User registration and login with hashed passwords
- JWT-based authentication
- Secure password reset token generation
- Email dispatch using Nodemailer
- Token expiry and validation
  
## 🧱 Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- bcryptjs for password hashing
- jsonwebtoken for authentication
- crypto for secure token generation
- nodemailer for sending emails

# 🔄 API Endpoints
## ✅ Register New User
- Method: POST
- Endpoint: http://localhost:3000/
- Description: Registers a new user with a hashed password.
- Request Body:
{
  "username": "pavi",
  "email": "pavi@example.com",
  "password": "secret123"
}

## ✅ Login
- Method: POST
- Endpoint: http://localhost:3000/login
- Description: Authenticates the user and returns a JWT token.
- Request Body:
{
  "email": "pavi@example.com",
  "password": "secret123"
}


## ✅ Forgot Password
- Method: POST
- Endpoint: http://localhost:3000/forgot-password
- Description: Sends a password reset link to the user's email.
- Request Body:
{
  "email": "pavi@example.com"
}


## ✅ Reset Password
- Method: POST
- Endpoint: http://localhost:3000/reset-password/:token
- Description: Resets the user's password using a valid token.
- URL Parameter: :token – the reset token sent via email
- Request Body:
{
  "newPassword": "newSecret123"
}
