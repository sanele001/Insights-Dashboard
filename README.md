
# Insights Dashboard

A modern, responsive customer spending insights dashboard built with **Next.js, React, TypeScript and Tailwind CSS**.

The application is designed to provide a centralized interface for understanding customer spending behaviour, monitoring financial activity, exploring spending patterns and making data-driven decisions.

It includes a customer authentication entry point, theme management and a foundation for visualizing customer spending information through interactive dashboards.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Docker Deployment](#docker-deployment)
- [API Documentation](#api-documentation)
- [Available API Endpoints](#available-api-endpoints)
- [Data Models](#data-models)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Insights Dashboard is a customer spending analytics application intended to help users understand how money is being spent over time.

The project focuses on presenting financial information in an accessible and structured format, making it easier to identify spending patterns, compare financial periods, monitor budgets and understand transaction history.

The dashboard's documented API contract covers customer profiles, spending summaries, category breakdowns, monthly trends, transaction records, spending goals and available filtering options.

The application is built using the Next.js App Router architecture and TypeScript, providing a foundation for a scalable and maintainable frontend.

### Project Goals

The main objectives are to:

- Provide a centralized view of customer spending activity.
- Present financial information in an understandable format.
- Support analysis across different spending periods.
- Categorize transactions for easier financial tracking.
- Identify spending trends and behavioural patterns.
- Help customers monitor their spending goals.
- Provide a responsive and accessible user interface.
- Support integration with customer spending APIs.

---

## Key Features

The following describes the application's intended functionality and documented capabilities.

### 1. Customer Authentication

The application includes a login entry point for accessing the dashboard.

The authentication interface is integrated into the main application entry point and wrapped in a user context provider.

### 2. Customer Spending Summary

Provides an overview of customer spending activity.

The documented summary data includes:

- Total amount spent.
- Number of transactions.
- Average transaction value.
- Highest spending category.
- Spending changes compared with the previous period.
- Transaction activity changes.

### 3. Spending by Category

Allows spending activity to be grouped into categories.

Examples include:

- Groceries
- Entertainment
- Transportation
- Dining
- Shopping
- Utilities

Category information can include the total amount spent, percentage of overall spending, transaction count, category colour and associated icon.

### 4. Spending Trends

The API specification supports monthly spending analysis.

This allows customers to examine:

- Monthly expenditure.
- Changes in transaction volume.
- Average transaction values.
- Spending behaviour over time.

### 5. Transaction History

The documented transaction endpoint supports retrieving and filtering customer transactions.

Available filtering capabilities include:

- Transaction category.
- Start and end dates.
- Sorting by transaction date.
- Sorting by transaction amount.
- Pagination.

### 6. Spending Goals

The API specification includes spending goal information.

Customers can monitor:

- Monthly category budgets.
- Current spending.
- Percentage of budget consumed.
- Remaining days.
- Budget status.

### 7. Filtering and Date Selection

The documented API supports predefined date ranges:

| Period | Description |
|---|---|
| `7d` | Last 7 days |
| `30d` | Last 30 days |
| `90d` | Last 90 days |
| `1y` | Last year |

Custom date ranges can also be provided where supported by the endpoint.

### 8. Light and Dark Themes

The application includes theme management.

Theme preferences use CSS variables and a `data-theme` attribute to support light and dark appearances.

The selected dark theme is persisted using browser local storage under the key:

`dashboard-theme`

---

## Technology Stack

The project uses the following technologies:

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework and application routing |
| React 19 | Component-based user interface |
| TypeScript 5 | Static typing and maintainability |
| Tailwind CSS 4 | Utility-first styling |
| Recharts 3 | Data visualization and charts |
| SWR 2 | Data fetching and caching |
| Zod 4 | Data validation and schema definitions |
| React Icons 5 | Icon library |
| Jest 30 | Unit and integration testing |
| React Testing Library | Component testing |
| ESLint 9 | Code quality and linting |
| Docker | Containerization and deployment |
| Node.js 22 | Runtime environment |

### Why These Technologies?

**Next.js**

Provides application routing, rendering capabilities and production optimization.

**React**

Enables reusable components and a modular interface.

**TypeScript**

Improves code reliability through static typing.

**Tailwind CSS**

Makes it easier to build consistent and responsive interfaces.

**Recharts**

Provides charting capabilities for financial and customer analytics.

**SWR**

Supports efficient data fetching, caching and revalidation.

**Zod**

Provides runtime validation for structured data.

**Jest and React Testing Library**

Support automated testing of application functionality and user interface components.

---

## Application Architecture

The application follows a component-based architecture using Next.js and React.

The main application entry point is located in:

`src/app/page.tsx`

The entry point integrates:

- Login component.
- User context provider.
- Theme toggle component.

The root application layout is defined in:

`src/app/layout.tsx`

It provides:

- Global application metadata.
- Geist and Geist Mono fonts.
- Global CSS.
- Theme provider.
- Initial theme configuration.

### Architecture Overview

```text
                 USER
                   |
                   v
          Next.js Application
                   |
                   v
              App Router
                   |
                   v
             Root Layout
                   |
          +--------+--------+
          |                 |
          v                 v
     Theme Provider    Global Styles
          |
          v
       Home Page
          |
    +-----+------+
    |            |
    v            v
  Login      Theme Toggle
    |
    v
 User Context
    |
    v
 Customer Dashboard
    |
    v
 Data Fetching / API Layer
    |
    v
 Customer Spending API
```

*The diagram represents the intended application and data flow. The API layer and downstream dashboard integration should be verified against the implemented components before being treated as a complete implementation.*

---

## Getting Started

Follow the instructions below to set up the project locally.

### Prerequisites

Ensure that the following tools are installed:

- Node.js 22 or later.
- npm.
- Git.
- A code editor such as Visual Studio Code.

Optional:

- Docker.
- Docker Compose.

Check your installed versions:

```bash
node --version
npm --version
git --version
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sanele001/Insights-Dashboard.git
```

### 2. Navigate to the Project Directory

```bash
cd Insights-Dashboard
```

### 3. Install Dependencies

```bash
npm install
```

Alternatively, use the lockfile for a reproducible installation:

```bash
npm ci
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Access the Application

Open your browser and navigate to:

```text
http://localhost:3000
```

The development server supports hot reloading, allowing changes to application files to appear automatically during development.

---

## Running the Application

The project defines the following npm scripts:

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint |
| `npm run test` | Runs Jest tests |

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

---

## Docker Deployment

The repository includes a Dockerfile configured for production deployment.

The Docker configuration uses a multi-stage build to reduce the final container image size.

### Docker Architecture

The Dockerfile uses three stages:

1. **Dependencies:** Installs project dependencies.
2. **Builder:** Compiles the Next.js application.
3. **Runner:** Runs the optimized production application.

The final container uses an unprivileged user to improve security.

### Build Docker Image

From the project root:

```bash
docker build -t insights-dashboard .
```

### Run Docker Container

```bash
docker run --rm -p 3000:3000 insights-dashboard
```

### Access the Application

```text
http://localhost:3000
```

### Run in the Background

```bash
docker run -d \
  --name insights-dashboard \
  -p 3000:3000 \
  insights-dashboard
```

### Stop the Container

```bash
docker stop insights-dashboard
```

### View Container Logs

```bash
docker logs insights-dashboard
```

### Docker Configuration

The Docker image uses:

| Configuration | Value |
|---|---|
| Base image | `node:22-alpine` |
| Working directory | `/app` |
| Application port | `3000` |
| Environment | Production |
| Server hostname | `0.0.0.0` |
| Runtime user | `nextjs` |
| Build output | Next.js standalone |

The Next.js configuration enables standalone output to support the production Docker image.

---

## API Documentation

The repository includes a dedicated API specification:

`CustomerSpendingInsightsEndpoints(1).md`

This document describes the expected endpoints for retrieving customer spending information.

The endpoints below represent the documented API contract. They should not be assumed to be implemented by the Next.js application itself; a compatible backend API must provide them.

### API Base URL

The actual backend base URL depends on the API environment.

For illustration:

```text
https://api.example.com
```

The endpoint paths below are relative to the configured backend base URL.

### 1. Customer Profile

Retrieves customer account information.

**Endpoint**

```http
GET /api/customers/{customerId}/profile
```

**Example Response**

```json
{
  "customerId": "12345",
  "name": "John Doe",
  "email": "john.doe@email.com",
  "joinDate": "2023-01-15",
  "accountType": "premium",
  "totalSpent": 15420.5,
  "currency": "ZAR"
}
```

### 2. Spending Summary

Retrieves a summary of customer spending over a selected period.

**Endpoint**

```http
GET /api/customers/{customerId}/spending/summary?period=30d
```

**Supported Periods**

- `7d`
- `30d`
- `90d`
- `1y`

**Example Response**

```json
{
  "period": "30d",
  "totalSpent": 4250.75,
  "transactionCount": 47,
  "averageTransaction": 90.44,
  "topCategory": "Groceries",
  "comparedToPrevious": {
    "spentChange": 12.5,
    "transactionChange": -3.2
  }
}
```

### 3. Spending by Category

Retrieves spending information grouped by category.

**Endpoint**

```http
GET /api/customers/{customerId}/spending/categories
```

**Optional Query Parameters**

| Parameter | Description |
|---|---|
| `period` | Predefined spending period |
| `startDate` | Custom start date |
| `endDate` | Custom end date |

**Example Request**

```http
GET /api/customers/12345/spending/categories?period=30d
```

**Example Response**

```json
{
  "dateRange": {
    "startDate": "2024-08-16",
    "endDate": "2024-09-16"
  },
  "totalAmount": 4250.75,
  "categories": [
    {
      "name": "Groceries",
      "amount": 1250.3,
      "percentage": 29.4,
      "transactionCount": 15,
      "color": "#FF6B6B",
      "icon": "shopping-cart"
    },
    {
      "name": "Entertainment",
      "amount": 890.2,
      "percentage": 20.9,
      "transactionCount": 8,
      "color": "#4ECDC4",
      "icon": "film"
    }
  ]
}
```

### 4. Monthly Spending Trends

Retrieves historical spending information.

**Endpoint**

```http
GET /api/customers/{customerId}/spending/trends?months=12
```

**Query Parameters**

| Parameter | Description |
|---|---|
| `months` | Number of months to retrieve |
| Default | 12 |
| Maximum | 24 |

**Example Response**

```json
{
  "trends": [
    {
      "month": "2024-01",
      "totalSpent": 3890.25,
      "transactionCount": 42,
      "averageTransaction": 92.62
    },
    {
      "month": "2024-02",
      "totalSpent": 4150.8,
      "transactionCount": 38,
      "averageTransaction": 109.23
    }
  ]
}
```

### 5. Customer Transactions

Retrieves transaction history with filtering, sorting and pagination.

**Endpoint**

```http
GET /api/customers/{customerId}/transactions
```

**Query Parameters**

| Parameter | Description | Default |
|---|---|---|
| `limit` | Number of transactions | 20 |
| `offset` | Pagination offset | 0 |
| `category` | Transaction category | All |
| `startDate` | Starting date | Optional |
| `endDate` | Ending date | Optional |
| `sortBy` | Sorting method | `date_desc` |

**Supported Sorting Options**

- `date_desc`
- `date_asc`
- `amount_desc`
- `amount_asc`

**Example Request**

```http
GET /api/customers/12345/transactions?limit=20&offset=0&sortBy=date_desc
```

**Example Response**

```json
{
  "transactions": [
    {
      "id": "txn_123456",
      "date": "2024-09-16T14:30:00Z",
      "merchant": "Pick n Pay",
      "category": "Groceries",
      "amount": 245.8,
      "description": "Weekly groceries",
      "paymentMethod": "Credit Card"
    }
  ],
  "pagination": {
    "total": 1250,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

### 6. Spending Goals

Retrieves customer spending goals and budget progress.

**Endpoint**

```http
GET /api/customers/{customerId}/goals
```

**Example Response**

```json
{
  "goals": [
    {
      "id": "goal_001",
      "category": "Entertainment",
      "monthlyBudget": 1000.0,
      "currentSpent": 650.3,
      "percentageUsed": 65.03,
      "daysRemaining": 12,
      "status": "on_track"
    },
    {
      "id": "goal_002",
      "category": "Groceries",
      "monthlyBudget": 1500.0,
      "currentSpent": 1450.8,
      "percentageUsed": 96.72,
      "daysRemaining": 12,
      "status": "warning"
    }
  ]
}
```

### 7. Available Categories and Filters

Retrieves supported spending categories and date range presets.

**Endpoint**

```http
GET /api/customers/{customerId}/filters
```

**Example Response**

```json
{
  "categories": [
    {
      "name": "Groceries",
      "color": "#FF6B6B",
      "icon": "shopping-cart"
    },
    {
      "name": "Entertainment",
      "color": "#4ECDC4",
      "icon": "film"
    }
  ],
  "dateRangePresets": [
    {
      "label": "Last 7 days",
      "value": "7d"
    },
    {
      "label": "Last 30 days",
      "value": "30d"
    },
    {
      "label": "Last 90 days",
      "value": "90d"
    },
    {
      "label": "Last year",
      "value": "1y"
    }
  ]
}
```

---

## Data Models

The documented API uses several core data structures.

### Customer

Represents an individual customer.

| Field | Type |
|---|---|
| customerId | string |
| name | string |
| email | string |
| joinDate | string |
| accountType | string |
| totalSpent | number |
| currency | string |

### Transaction

Represents an individual financial transaction.

| Field | Type |
|---|---|
| id | string |
| date | string |
| merchant | string |
| category | string |
| amount | number |
| description | string |
| paymentMethod | string |

### Spending Category

Represents a spending classification.

| Field | Type |
|---|---|
| name | string |
| amount | number |
| percentage | number |
| transactionCount | number |
| color | string |
| icon | string |

### Spending Goal

Represents a customer's budget target.

| Field | Type |
|---|---|
| id | string |
| category | string |
| monthlyBudget | number |
| currentSpent | number |
| percentageUsed | number |
| daysRemaining | number |
| status | string |

---

## Testing

The project uses Jest and React Testing Library for automated testing.

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

### Testing Configuration

The repository includes:

- `jest.config.ts`
- `jest.setup.ts`

These files provide the configuration and setup required for the Jest testing environment.

---

## Code Quality

ESLint is configured to help maintain consistent coding standards.

Run the linter:

```bash
npm run lint
```

TypeScript is also used to identify potential type-related errors during development and production builds.

---

## Configuration

The application currently uses its Next.js configuration in:

`next.config.ts`

The configuration includes:

- Standalone production output.
- Turbopack CSS loader configuration.
- Next.js experimental configuration.

### Environment Variables

The repository's documented setup does not establish a required environment-variable list.

If the application is connected to a separate backend API, configure the backend URL through an environment variable rather than hardcoding it.

For example, a possible configuration is:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

This is a suggested integration variable, not an existing verified project requirement.

For production deployments, sensitive credentials and authentication secrets should remain server-side and must not be exposed through `NEXT_PUBLIC_` variables.

---

## Project Structure

The repository contains the following main directories and configuration files:

```text
Insights-Dashboard/
│
├── public/
│
├── src/
│   ├── app/
│   ├── components/
│   └── context/
│
├── .dockerignore
├── .gitignore
├── AGENTS.md
│
├── CustomerSpendingInsightsEndpoints(1).md
│
├── Dockerfile
├── LICENSE
├── README.md
│
├── eslint.config.mjs
├── jest.config.ts
├── jest.setup.ts
│
├── next.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

### Important Directories

**`public/`**

Contains static assets served by the application.

**`src/`**

Contains the main application source code.

**`src/app/`**

Contains the Next.js application entry point, root layout and global styles.

**`src/components/`**

Contains reusable user interface components.

**`src/context/`**

Contains React context providers used for shared application state, including user and theme contexts.

### Important Files

| File | Purpose |
|---|---|
| `src/app/page.tsx` | Main application entry point |
| `src/app/layout.tsx` | Root layout and application metadata |
| `src/app/globals.css` | Global styling and theme variables |
| `next.config.ts` | Next.js configuration |
| `package.json` | Project dependencies and scripts |
| `Dockerfile` | Production container configuration |
| `jest.config.ts` | Jest testing configuration |
| `jest.setup.ts` | Test environment setup |
| `CustomerSpendingInsightsEndpoints(1).md` | Customer spending API specification |

---

## Deployment

The application can be deployed using Docker or a platform that supports Next.js applications.

### Vercel Deployment

The application can be deployed through the Vercel platform.

General deployment steps:

1. Push the project to GitHub.
2. Sign in to Vercel.
3. Import the GitHub repository.
4. Configure any required environment variables.
5. Deploy the application.

### Docker Deployment

For container-based deployment, use the included Dockerfile.

Build the production image:

```bash
docker build -t insights-dashboard .
```

Run the container:

```bash
docker run -d -p 3000:3000 insights-dashboard
```

---

## Troubleshooting

### 1. Port 3000 Is Already in Use

If another application is using port 3000, start Next.js on another port:

```bash
npm run dev -- -p 3001
```

### 2. Dependency Installation Issues

Try reinstalling dependencies:

```bash
rm -rf node_modules
npm ci
```

### 3. Production Build Errors

Run:

```bash
npm run build
```

Review the output for missing dependencies, TypeScript errors or configuration issues.

### 4. Docker Build Issues

Ensure Docker is running and that the build is executed from the project root:

```bash
docker build -t insights-dashboard .
```

### 5. Theme Not Persisting

Check whether browser local storage is enabled and whether the `dashboard-theme` preference is available.

---

## Future Improvements

Potential areas for extending the application include:

- Complete customer authentication and authorization.
- Integration with a live customer spending backend.
- Interactive spending analytics dashboards.
- Advanced spending visualizations.
- Custom date range selection.
- Transaction search and filtering.
- Budget creation and management.
- Spending alerts and notifications.
- Exporting financial reports to CSV and PDF.
- Improved accessibility.
- Enhanced automated test coverage.
- Role-based access control.
- API error handling and loading states.
- Improved mobile responsiveness.

---

## Contributing

Contributions, suggestions and improvements are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Run the application and relevant tests.
5. Ensure that ESLint reports no issues.
6. Commit your changes.
7. Submit a pull request.

### Example

```bash
git checkout -b feature/new-feature

git add .

git commit -m "feat: add new dashboard functionality"

git push origin feature/new-feature
```

---

## License

This project is distributed under the MIT License.

See the [LICENSE](LICENSE) file for additional information.

---

## Author

**Sanele**

GitHub: [@sanele001](https://github.com/sanele001)

Project Repository:

[Insights Dashboard](https://github.com/sanele001/Insights-Dashboard)

---

## Acknowledgements

This project is built using the React and Next.js ecosystem and benefits from the open-source libraries that make modern web application development possible.

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [SWR](https://swr.vercel.app/)
- [Jest](https://jestjs.io/)

---

**Insights Dashboard — Turning customer spending data into meaningful insights.**
