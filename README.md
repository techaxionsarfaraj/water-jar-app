# Water Jar App

This is a full-stack web application for managing water jar sales, built with Vue 3, Vite, and Express.js.

## Features

- Customer management (add, edit, delete)
- Stock management (add, edit, delete)
- Order management (add, edit, delete)
- Dashboard for quick insights

## Project Structure

- `frontend`: The Vue 3 web application
- `backend`: The Express.js API server
- `db`: The MySQL database schema and data

## Setup

### Frontend

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open [http://localhost:3001](http://localhost:3001) in your browser

### Database

1. Create a MySQL database named `water_jar_app`
2. Import the schema: `mysql -u <username> -p<password> water_jar_app < db/schema.sql`
3. Import the data: `mysql -u <username> -p<password> water_jar_app < db/data.sql`

## Building and Running for Production

### Frontend

1. Build the frontend: `npm run build`
2. Serve the built frontend: `npm run serve`

### Backend

1. Build the backend: `npm run build`
2. Serve the built backend: `npm run serve`

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

