# Find A Friend API

REST API for pet adoption, built with Node.js, TypeScript, Fastify, Prisma, SOLID principles, and automated tests.

## Overview

The application allows organizations to register and authenticate, create pets, and search pets by city and characteristics.

Implemented flows:

- Register an ORG
- Authenticate an ORG
- Refresh the authentication token
- Create a pet linked to an authenticated ORG
- Search pets by city with optional filters
- Search pets by city using route params
- Fetch pet details by id

## Technologies

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- Zod
- Vitest
- Supertest

## Project Structure

```text
src/
  http/
    controllers/
    middleware/
  repositories/
    in-memory/
    prisma/
  use-cases/
    factories/
```

## Requirements

- Node.js 20+
- Docker

## Environment Variables

Create a `.env` file based on `.env.example`.

```env
NODE_ENV="develop"
PORT=3333
JWT_SECRET="secret"
DATABASE_URL="postgresql://docker:docker@localhost:5434/findafrienddb"
```

Important:

- `NODE_ENV` must be `develop`, `test`, or `production`
- the local application database runs on port `5434`
- the end-to-end test database runs on port `5433`

## Running the Project

1. Install dependencies:

```bash
npm install
```

2. Start PostgreSQL containers:

```bash
docker compose up -d
```

3. Run migrations for the main database:

```bash
npx prisma migrate deploy
```

4. Start the API:

```bash
npm run dev
```

The application will run on `http://localhost:3333`.

## Tests

Unit tests:

```bash
npm test
```

End-to-end tests:

```bash
npm run test:e2e
```

## Authentication

- `POST /session` returns an `accessToken`
- a `refreshToken` is also sent through an HTTP-only cookie
- `PATCH /token/refresh` uses the cookie to generate a new access token

## Routes

### ORGs

- `POST /orgs`
- `POST /session`
- `PATCH /token/refresh`

### Pets

All pet routes currently require authentication.

- `POST /pets`
- `GET /pets`
- `GET /pets/:id`
- `GET /pets/city/:city`

## Search Filters

`GET /pets` requires:

- `city`
- `page`

Optional filters:

- `age`
- `name`
- `size`
- `energyLevel`
- `independenceLevel`
- `environment`

Example:

```http
GET /pets?city=Guramirim&energyLevel=HIGH&page=1
Authorization: Bearer <accessToken>
```

## Available Enum Values

`size`

- `SMALL`
- `MEDIUM`
- `LARGER`

`energyLevel`

- `VERY_LOW`
- `LOW`
- `MEDIUM`
- `HIGH`
- `VERY_HIGH`

`independenceLevel`

- `LOW`
- `MEDIUM`
- `HIGH`

`environment`

- `SMALL`
- `MEDIUM`
- `LARGER`
