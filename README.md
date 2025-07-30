# WorkCity API

### Documentation

## Setup

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Set up environment variables in `.env` file

3. Generate Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```


4. To compile & Start the development server:
   ```bash
   yarn tsc --watch
   yarn dev
   ```

## Authentication

### Register a new user/admin
- **URL:** `/auth/signup`
- **Method:** POST
- **Admin Registration:** Include `adminKey` in the request body
- **Example Request:**
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123",
    "adminKey": "admin_key_here" // Only for admin registration
  }
  ```

### Login
- **URL:** `/auth/login`
- **Method:** POST
- **Example Request:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response:** Returns JWT token for authenticated requests

## Users

### List all users (Admin only)
- **URL:** `/users?page=1&limit=10`
- **Method:** GET
- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
- **Headers:**
  - `Authorization: Bearer <token>`

## Clients

### Create a new client (Admin only)
- **URL:** `/clients`
- **Method:** POST
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Example Request:**
  ```json
  {
    "name": "Acme Corp",
    "email": "contact@acme.com",
    "phone": "+1234567890",
    "address": "123 Business St, City",
    "industry": "Technology"
  }
  ```

### Get client by ID
- **URL:** `/clients/:id`
- **Method:** GET
- **Headers:**
  - `Authorization: Bearer <token>`

### Update client (Admin only)
- **URL:** `/clients/:id`
- **Method:** PATCH
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`

### Delete client (Admin only)
- **URL:** `/clients/:id`
- **Method:** DELETE
- **Headers:**
  - `Authorization: Bearer <token>`

### List all clients (Admin only)
- **URL:** `/clients?page=1&limit=10`
- **Method:** GET
- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
- **Headers:**
  - `Authorization: Bearer <token>`

## Projects

### Create a new project (Admin only)
- **URL:** `/projects`
- **Method:** POST
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Example Request:**
  ```json
  {
    "name": "E-commerce Website",
    "description": "Build a new e-commerce platform",
    "clientId": "client_id_here"
  }
  ```

### Get project by ID
- **URL:** `/projects/:id`
- **Method:** GET
- **Headers:**
  - `Authorization: Bearer <token>`

### List all projects
- **URL:** `/projects?page=1&limit=10`
- **Method:** GET
- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
- **Headers:**
  - `Authorization: Bearer <token>`

### Update project status
- **URL:** `/projects/status/:id`
- **Method:** PATCH
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Example Request:**
  ```json
  {
    "status": "IN_PROGRESS"
  }
  ```
  **Possible status values:** `REQUESTED`, `ACCEPTED`, `IN_PROGRESS`, `REVIEW`, `COMPLETED`

### Update project details (Admin only)
- **URL:** `/projects/:id`
- **Method:** PATCH
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`

## Notes
- All endpoints (except `/auth/*`) require authentication via JWT token in the `Authorization` header
- Admin-only endpoints are clearly marked
- Pagination is available on list endpoints using `page` and `limit` query parameters
