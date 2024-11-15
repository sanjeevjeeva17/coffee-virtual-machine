# Coffee Virtual Machine

This web application provides a virtual user experience of using a coffee machine and servicing it as an admin who can also view the order history.

## Tech Stack
### Frontend
- Angular 18
- Angular Material

### Backend
- Node.js
- Nest.js

### Monorepo
- Nx Monorepo

## Running the Application
### Steps:
1. Run `npm install` to install the necessary dependencies.
2. To start the frontend, use `npm run start:frontend`.
3. To start the backend, use `npm run start:backend`.

**Optional**: Install `concurrently` using `npm install concurrently` and then run `npm run start` to start both the frontend and backend simultaneously.

## About the Application
### Overview:
There are three main steps in using the coffee machine:
1. **Starting the Machine**: The machine can be started only when all the necessary resources are available. The application makes an API call to fetch the resources, allowing the machine to use them for serving users with coffee.

**Note**: When running the application for the first time, resources need to be loaded. To simulate this real-life scenario, log in as an admin, load the resources, and then navigate to the `/dashboard` route (e.g., `https://localhost:4200/dashboard`). The machine will then be ready for use.

### Types of Coffee and Their Ingredients (Assuming there is a water connection):
- **Espresso**: Coffee beans, sugar, and cup size.
- **Latte**: Coffee beans, milk, sugar, and cup size.
- **Cappuccino**: Coffee beans, milk, sugar, and cup size.
- **Americano**: Coffee beans, hot water, sugar, and cup size.
- **Make Your Own**: Custom combination of coffee beans, milk, sugar, and cup size.

**Note**: Although cappuccino and latte may seem similar, the amount of coffee beans used is different.

### Admin Features:
Admins can service the machine by loading resources and viewing the order history. To access these features, log in using the following credentials:

- **Username**: `admin1@example.com`
- **Password**: `password1`
