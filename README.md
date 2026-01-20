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
├── admin.js        # Admin routes and logic
├── user.js         # User routes and logic
├── course.js       # Course routes and logic
├── backend.js      # Main server entry point
├── database.js     # MongoDB connection
├── config.js       # Configuration & secrets
├── .env.example    # Environment variable template
├── package.json
└── package-lock.json
