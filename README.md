# Timesheet Backend Service

## Overview
This project is a minimal backend service for a contractor timesheet submission system. It supports three user roles: Admin, Recruiter, and Contractor. Each role has specific functionalities, allowing for efficient management of timesheets and user interactions.

## Architecture
The application is built using Node.js and Express. It follows a modular structure with separate directories for controllers, middleware, models, routes, and utilities.

### Directory Structure
- **src/**: Contains the main application code.
  - **controllers/**: Business logic for handling requests.
    - `adminController.js`: Admin functionalities.
    - `authController.js`: User authentication.
    - `contractorController.js`: Timesheet submission.
    - `recruiterController.js`: Candidate management.
  - **middleware/**: Middleware functions for authentication.
    - `auth.js`: JWT authentication middleware.
  - **models/**: Data models representing the application's data structure.
    - `Timesheet.js`: Timesheet data model.
    - `User.js`: User data model.
    - `Project.js`: Project data model.
  - **routes/**: API route definitions.
    - `admin.js`: Routes for admin functionalities.
    - `auth.js`: Routes for authentication.
    - `contractor.js`: Routes for contractor functionalities.
    - `recruiter.js`: Routes for recruiter functionalities.
  - **utils/**: Utility functions.
    - `jwt.js`: Functions for JWT generation and verification.
  - `app.js`: Entry point of the application.

## Setup Instructions
1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd timesheet-backend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Configure environment variables**:
   Copy `.env.example` to `.env` and fill in the required values, such as database connection strings and JWT secrets.

4. **Run the application**:
   ```
   npm start
   ```

5. **Access the API**:
   The API will be available at `http://localhost:3000`.

## API Documentation
Refer to `api-spec.yaml` for detailed API specifications, including endpoints, request/response formats, and authentication requirements.

## Assumptions
- The application uses JWT for authentication and authorization.
- A MongoDB database is assumed for data storage.
- The application is designed for a development environment; production configurations may vary.

## License
This project is licensed under the MIT License.