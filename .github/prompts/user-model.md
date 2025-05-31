# Mongoose User Model

Create a User model with the following fields:
- username: String, required, unique
- email: String, required, unique
- password: String, required
- isOnline: Boolean (optional)
- socketId: String (optional)

Use bcrypt middleware to hash passwords before saving.
Add a method to compare passwords.
