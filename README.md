# Berserk Gym E-commerce Platform

## Introduction

Welcome to the documentation for the Berserk Gym E-commerce Platform. This comprehensive guide provides an in-depth overview of the architecture, features, technologies used, setup instructions, and usage guidelines for the platform.

LIVE DEMO: https://berserkfit.netlify.app

Admin credentials:
Email:     admin@berserk.fit
Password:  berserk12 

## Architecture Overview

The Berserk Gym E-commerce Platform is built using a modern and scalable architecture that ensures reliability, flexibility, and performance. Here's an overview of the key components:

- **Frontend Framework:** The frontend is developed using React.js, a popular JavaScript library for building user interfaces. React allows for the creation of interactive and dynamic single-page applications (SPAs) with reusable components.

- **Backend Service:** Firebase serves as the backend infrastructure for the platform. Firebase provides a suite of services, including Firestore for real-time database storage, Authentication for user authentication and authorization, and Storage for storing user-uploaded files such as product images.

- **Serverless Computing:** Firebase Cloud Functions are used to implement serverless computing, enabling the execution of backend logic in response to events triggered by Firebase services or HTTPS requests.

- **Development Tools:** The development process is facilitated by npm, the package manager for JavaScript, and tools such as ESLint and Prettier for code linting and formatting.

## Features

### User Features

- **Product Browsing:** Users can explore a wide range of gym products through an intuitive and responsive interface. The platform offers categories, filters, and search functionality to simplify product discovery.

- **Product Details:** Detailed product pages provide users with comprehensive information about each product, including descriptions, specifications, pricing, and availability status.

- **Shopping Cart:** A feature-rich shopping cart allows users to add, remove, and update items in their cart. Real-time quantity adjustment and subtotal calculation enhance the shopping experience.

- **Checkout Process:** The platform offers a seamless checkout process, guiding users through address input, order summary review, and secure payment processing. Firebase Firestore is integrated to store and manage orders.

### Admin Features

- **Admin Dashboard:** Administrators have access to a centralized dashboard for managing products, orders, and site settings. The dashboard provides insights into key metrics and actionable data for decision-making.

- **Product Management:** Admins can perform CRUD (Create, Read, Update, Delete) operations on products, enabling them to add new products, edit existing ones, and remove outdated items.

- **Order Management:** An efficient order processing system allows administrators to review orders, update order status, and communicate with customers regarding order updates and delivery schedules.

- **Analytics:** Basic analytics functionality provides administrators with essential metrics such as the number of orders, total revenue, and the number of products sold. This data helps in evaluating performance and identifying growth opportunities.

## Technologies Used

The Berserk Gym E-commerce Platform leverages the following technologies to deliver a robust and feature-rich user experience:

- **Frontend:** React.js, React Router, Context API, Tailwind CSS
- **Backend:** Firebase (Firestore, Authentication, Storage)
- **Serverless Computing:** Firebase Cloud Functions
- **UI Components:** React Modal, react-toastify
- **Development Tools:** npm, ESLint, Prettier

## Setup and Configuration

To set up and configure the Berserk Gym E-commerce Platform for local development or deployment, follow these steps:

1. **Clone the Repository:** Clone the project repository from GitHub.
2. **Install Dependencies:** Navigate to the project directory and install dependencies using npm.
3. **Firebase Configuration:** Configure Firebase settings and replace Firebase configuration in the project files.
4. **Start the Development Server:** Run the development server to test the application locally.
5. **Access the Application:** Access the application through the specified URL and explore its features.

## Usage

- **Admin Authentication:** Use admin credentials to sign in and access the admin dashboard for managing products, orders, and site settings.
