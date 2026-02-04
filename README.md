Course Selling Backend

A Node.js + Express + MongoDB backend application for a course selling platform.
This project supports Admin and User roles, allowing admins to create courses and users to browse and purchase them.

 Features

Admin
1) Admin signup & login
2) Create new courses
3) View all courses
4) Protected admin routes

User
1) User signup & login
2) View available courses
3) Purchase courses
4) View purchased courses
5) Protected user routes

Authentication
1) JWT-based authentication
2) Role-based access (Admin / User)

Tech Stack
1) Backend: Node.js, Express.js
2) Database: MongoDB
3) Authentication: JSON Web Tokens (JWT)
4) Environment Management: dotenv

Project Structure

Course_Selling/
│
├── route/
│   ├── admin.js        # Admin routes and logic
│   ├── user.js         # User routes and logic
│   └── course.js       # Course routes and logic
├── middleware/
│   ├── admin.js        # Admin auth middleware
│   └── user.js         # User auth middleware
├── backend.js      # Main server entry point
├── database.js     # MongoDB connection
├── config.js       # Configuration & secrets
├── .env.example    # Environment variable template
├── package.json
└── package-lock.json

Getting Started

1) Install dependencies
   npm install

2) Create a .env file based on .env.example and fill in values:
   MONGODB_URL=your_mongodb_connection_string
   JWT_ADMIN_SCERAT=your_admin_jwt_secret
   JWT_USER_SCERAT=your_user_jwt_secret

3) Start the server
   npm run start

The server listens on port 4000 by default.

Frontend (Angular)

1) Install dependencies
   cd frontend
   npm install

2) Start the development server
   npm start

The Angular dev server runs on http://localhost:4200 by default.
