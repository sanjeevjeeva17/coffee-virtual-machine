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

Admins can add resources in the admin panel by clicking the **Load Resource** button. This sends a predefined maximum quantity of ingredients to the backend via API calls, as seen in the `onLoadResource` method of `admin-panel.component.ts`.

## API Overview
### Resource Management:
- **Get Resources**:
  - `GET http://localhost:3000/api/resources`
- **Load Resources to Machine**:
  - `POST http://localhost:3000/api/resources/load`
  - **Payload**:
    ```json
    {
      "milk": {
        "soy": 2,
        "almond": 2,
        "whole": 2,
        "skimmed": 2
      },
      "sugar": 1,
      "coffeeBean": 1
    }
    ```

### Coffee Brewing:
- **Use Resources After Brewing**:
  - `PATCH http://localhost:3000/api/resources/use`
  - **Payload**:
    ```json
    {
      "almond": 0.45,
      "soy": 0,
      "whole": 0,
      "skimmed": 0,
      "sugar": 0.3,
      "coffeeBean": 0
    }
    ```

### Order Management:
- **Update Order History**:
  - `POST http://localhost:3000/api/orders`
  - **Payload**:
    ```json
    {
      "coffeeType": "Latte",
      "size": "Medium",
      "sugar": "",
      "milk": ""
    }
    ```

### Authentication:
- **Admin Login**:
  - `POST http://localhost:3000/api/auth/login`
  - **Payload**:
    ```json
    {
      "username": "admin1@example.com",
      "password": "*******"
    }
    ```

## TODO:
1. Fix backend authorization validation to ensure the admin API cannot be used without proper authorization.
2. Implement localization to support multiple languages for the application.
3. Add theme implementation to allow users to switch between different UI themes.
