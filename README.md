# Getting Started

In the project directory, 
You can run the application using:
### `npm start`

Run Mock API:
### `json-server --watch src\infrastructure\mock_api\db.json --port 3001`

BASE_URL = (mock API) http://localhost:3001

# Endpoints in Json Server 
GET /users: Get a list of users.
POST /users: Create a new user (for registration, you might use this or a separate /registrations endpoint).
GET /users/:id: Get a specific user.
PUT /users/:id, PATCH /users/:id, DELETE /users/:id

