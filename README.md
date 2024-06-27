# Sports Facility Booking Platform

## Overview
Welcome to the Sports Facility Booking Platform! This project is designed to provide a hassle-free way for users to book sports facilities. The backend is built with TypeScript, Express.js, and Mongoose for MongoDB. It includes user authentication, facility management, booking creation, and availability checking.

## Table of Contents
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Facility Routes](#facility-routes)
  - [Booking Routes](#booking-routes)
- [Error Handling](#error-handling)
- [Bonus Features](#bonus-features)

## Technology Stack
- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **ODM & Validation Library**: Mongoose for MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Package Manager**: Yarn

## Getting Started
### Prerequisites
- Node.js (v18 or higher)
- Yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sports-facility-booking-platform.git
   ```
2. Navigate to the project directory:
   ```bash
   cd sports-facility-booking-platform
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/sports-facility-booking
   JWT_SECRET=your_jwt_secret
   ```
5. Start the development server:
   ```bash
   yarn start-dev
   ```

### Build and Run
To build the project and run it in production mode:
```bash
yarn build
yarn start
```

### scripts
```bash 
yarn lint
yarn lint-fix
yarn prettier
yarn prettier-fix
```


## API Endpoints

### User Routes
1. **User Sign Up**
   - **Route**: `POST /api/auth/signup`
   - **Request Body**:
     ```json
     {
       "name": "Programming Hero",
       "email": "web@programming-hero.com",
       "password": "programming-hero",
       "phone": "01322901105",
       "role": "admin", // or 'user'
       "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "User registered successfully",
       "data": {
         "_id": "60d9c4e4f3b4b544b8b8d1c4",
         "name": "Programming Hero",
         "email": "web@programming-hero.com",
         "role": "admin",
         "phone": "01322901105",
         "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
       }
     }
     ```

2. **User Login**
   - **Route**: `POST /api/auth/login`
   - **Request Body**:
     ```json
     {
       "email": "web@programming-hero.com",
       "password": "programming-hero"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "User logged in successfully",
       "token": "JWT_TOKEN",
       "data": {
         "_id": "60d9c4e4f3b4b544b8b8d1c4",
         "name": "Programming Hero",
         "email": "web@programming-hero.com",
         "role": "admin",
         "phone": "01322901105",
         "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
       }
     }
     ```

### Facility Routes
3. **Create a Facility (Admin Only)**
   - **Route**: `POST /api/facility`
   - **Headers**:
     ```plaintext
     Authorization: Bearer JWT_TOKEN
     ```
   - **Request Body**:
     ```json
     {
       "name": "Tennis Court",
       "description": "Outdoor tennis court with synthetic surface.",
       "pricePerHour": 30,
       "location": "456 Sports Ave, Springfield"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "Facility added successfully",
       "data": {
         "_id": "60d9c4e4f3b4b544b8b8d1c5",
         "name": "Tennis Court",
         "description": "Outdoor tennis court with synthetic surface.",
         "pricePerHour": 30,
         "location": "456 Sports Ave, Springfield",
         "isDeleted": false
       }
     }
     ```

4. **Update a Facility (Admin Only)**
   - **Route**: `PUT /api/facility/:id`
   - **Headers**:
     ```plaintext
     Authorization: Bearer JWT_TOKEN
     ```
   - **Request Body**:
     ```json
     {
       "name": "Updated Tennis Court",
       "description": "Updated outdoor tennis court with synthetic surface.",
       "pricePerHour": 35,
       "location": "789 Sports Ave, Springfield"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "Facility updated successfully",
       "data": {
         "_id": "60d9c4e4f3b4b544b8b8d1c5",
         "name": "Updated Tennis Court",
         "description": "Updated outdoor tennis court with synthetic surface.",
         "pricePerHour": 35,
         "location": "789 Sports Ave, Springfield",
         "isDeleted": false
       }
     }
     ```

5. **Delete a Facility - Soft Delete (Admin Only)**
   - **Route**: `DELETE /api/facility/:id`
   - **Headers**:
     ```plaintext
     Authorization: Bearer JWT_TOKEN
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "Facility deleted successfully",
       "data": {
         "_id": "60d9c4e4f3b4b544b8b8d1c5",
         "name": "Updated Tennis Court",
         "description": "Updated outdoor tennis court with synthetic surface.",
         "pricePerHour": 35,
         "location": "789 Sports Ave, Springfield",
         "isDeleted": true
       }
     }
     ```

6. **Get All Facilities**
   - **Route**: `GET /api/facility`
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "Facilities retrieved successfully",
       "data": [
         {
           "_id": "60d9c4e4f3b4b544b8b8d1c5",
           "name": "Tennis Court",
           "description": "Outdoor tennis court with synthetic surface.",
           "pricePerHour": 30,
           "location": "456 Sports Ave, Springfield",
           "isDeleted": false
         }
       ]
     }
     ```

### Booking Routes
7. **Check Availability**
   - **Route**: `GET /api/check-availability`
   - **Query Parameters**:
     - `date` (optional): The date for which availability is to be checked. Format: `YYYY-MM-DD`. If not provided, today's date will be used by default.
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "Availability checked successfully",
       "data": [
         {
           "startTime": "08:00",
           "endTime": "10:00"
         },
         {
           "startTime": "14:00",
           "endTime": "16:00"
         }
       ]
     }
     ```

8. **Create a Booking (User Only)**
   - **Route**: `POST /api/bookings`
   - **Headers**:
     ```plaintext
     Authorization: Bearer JWT_TOKEN
     ```
   - **Request Body**:
     ```json
     {
       "facility": "60d9c4e4f3b4b544b8b8d1c5",
       "date": "2024-06-15",
       "startTime": "10:00",
       "endTime": "13:00"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "Booking
