# Morgex Platform - Backend

A robust Node.js and Express.js REST API that powers the Morgex education platform. It manages user authentication, course enrollments, and completion status.

## 💾 Core Logic

- **Course Management**: Complete CRUD operations for courses, categorized with metadata.
- **User Authentication**: Secure JWT-based login and registration with hashed passwords.
- **Enrollment Tracking**: Records course access, enrollment dates, and 1-year expiry logic.
- **New Feature: Completion Logic**: POST `/api/courses/complete/:id` marks a course as finished and saves the completion date.
- **Admin Utilities**: Seeding scripts for initial course population (`seed.js`).

## 🛠️ Technology Stack

- **Server Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JSON Web Tokens (JWT), Bcrypt.js
- **Environment**: Dotenv for secure variable management

## 🚀 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Configure Environment**:
    Create a `.env` file and set:
    ```
    MONGO_URI=mongodb+srv://... (Your Atlas cluster)
    JWT_SECRET=... (Secret string)
    PORT=5000
    ```
3.  **Seed Data (Optional)**:
    ```bash
    node seed.js
    ```
4.  **Start Server**:
    ```bash
    node server.js
    ```

## 📄 API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/courses` | List all available courses |
| GET | `/api/courses/:id` | Fetch specific course details |
| POST | `/api/courses/enroll` | Enroll a user in a course |
| POST | `/api/courses/complete/:id`| Mark a course as completed |
| GET | `/api/courses/user/enrolled`| Fetch courses for the logged-in user |
| POST | `/api/auth/register` | Create a new user account |
| POST | `/api/auth/login` | Log in to an existing account |

## 📄 License
MIT License - Morgex Education Platform 2026.
