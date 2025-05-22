# Expense Tracker API

## Setup

1. Clone this repo
2. `cd expense-tracker-api`
3. `npm install`
4. Create a `.env` from `.env.example`
5. `npm run dev`

## Endpoints

-   **POST** `/signup`
-   **POST** `/login`
-   **POST** `/expenses` (auth)
-   **GET** `/expenses` (auth)
-   **GET** `/expenses/report?startDate=&endDate=` (auth)
-   **PUT** `/expenses/:id` (auth)
-   **DELETE** `/expenses/:id` (auth)
