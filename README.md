# Treasure E-Commerce Platform

A full-featured e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- Full-featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc.)
- Stripe / PayPal / COD payment integration
- Cloudinary image upload
- Dark mode support
- Responsive design
- Redux Toolkit for state management

## Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. Create a `.env` file in the backend directory with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

## Run the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
3. Import sample data:
   ```bash
   cd backend
   npm run data:import
   ```

## Admin Credentials

- Email: `admin@treasure.com`
- Password: `Admin@123`

## Tech Stack

- Frontend: React, Vite, React Bootstrap, Redux Toolkit
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: JWT, bcrypt
- Image Storage: Cloudinary
- Payment Gateway: Stripe, PayPal, COD
