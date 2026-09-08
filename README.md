# react-leaflet-tutorial

Eve Panzarino (jhankins)

1.4 Exercise 01: Library Tutorial

Full Sail University

Repo for React Leaflet Tutorial Assignment

---

# MERN Stack App

A full-stack starter on the MERN stack: **M**ongoDB, **E**xpress, **R**eact, **N**ode.

The backend is complete and working — a REST API for an "Item" resource (title, description,
completed) backed by Mongoose and MongoDB. The frontend is the **default Vite + React starter
page**, left clean so the UI can be built from scratch. The wiring between them is already in
place: Vite proxies `/api` to Express, so a component can call `fetch('/api/items')` with no
extra setup.

## Project structure

```
.
├── package.json          # root scripts (runs client + server together)
├── client/               # React frontend (Vite) — stock starter template
│   ├── vite.config.js    # dev server + /api proxy to Express
│   ├── index.html
│   ├── public/vite.svg
│   └── src/
│       ├── main.jsx
│       ├── App.jsx       # default Vite + React starter page
│       ├── App.css
│       ├── index.css
│       └── assets/react.svg
└── server/               # Express + Mongoose backend
    ├── server.js         # app setup, middleware order, startup
    ├── .env              # local config (gitignored)
    ├── .env.example      # template to copy
    ├── config/db.js      # MongoDB connection
    ├── models/Item.js    # Mongoose schema
    ├── controllers/itemController.js
    ├── routes/itemRoutes.js
    └── middleware/errorHandler.js
```

## Prerequisites

- Node.js 20.19+ (built and tested on v24)
- MongoDB running locally

Start MongoDB if it isn't already running:

```bash
brew services start mongodb-community
```

## Setup

Install dependencies for the root, server, and client in one step:

```bash
npm run install:all
```

Then create your local server config:

```bash
cp server/.env.example server/.env
```

## Running

From the repo root, start both the API and the frontend together:

```bash
npm run dev
```

- Client: http://localhost:5174
- API: http://localhost:4000

To run just one side: `npm run server` or `npm run client`.

### A note on ports

This project uses **4000** (API) and **5174** (client) rather than the more common 5000/5173.
Port 5000 is claimed by AirPlay Receiver on macOS, and 5050/5173 are already in use by another
project on this machine. The Vite config sets `strictPort: true` so the client fails loudly
instead of silently drifting to a different port, and the server exits with a clear message if
its port is taken. To change them, edit `PORT` in `server/.env`, the proxy target and `port` in
`client/vite.config.js`, and `CLIENT_ORIGIN` in `server/.env` (used for CORS).

## Environment variables (`server/.env`)

| Variable        | Default                                | Purpose                          |
| --------------- | -------------------------------------- | -------------------------------- |
| `PORT`          | `4000`                                 | Port the Express server binds to |
| `MONGO_URI`     | `mongodb://127.0.0.1:27017/mern_app`   | MongoDB connection string        |
| `CLIENT_ORIGIN` | `http://localhost:5174`                | Allowed CORS origin              |

To use MongoDB Atlas instead of a local database, replace `MONGO_URI` with your cluster's
connection string.

## API

Base URL: `http://localhost:4000/api`

| Method   | Endpoint      | Description               | Success |
| -------- | ------------- | ------------------------- | ------- |
| `GET`    | `/health`     | Server status and uptime  | 200     |
| `GET`    | `/items`      | List all items, newest first | 200  |
| `GET`    | `/items/:id`  | Get one item              | 200     |
| `POST`   | `/items`      | Create an item            | 201     |
| `PUT`    | `/items/:id`  | Update an item            | 200     |
| `DELETE` | `/items/:id`  | Delete an item            | 200     |

Request body for `POST` / `PUT`:

```json
{ "title": "Read the docs", "description": "Optional details", "completed": false }
```

Errors return `{ "message": "..." }` with an appropriate status: `400` for validation
failures, `404` for a missing item, an unknown route, or a malformed id.

Example:

```bash
curl -X POST http://localhost:4000/api/items \
  -H 'Content-Type: application/json' \
  -d '{"title":"Read the docs"}'
```

## How the pieces connect

The browser only ever talks to one origin in development. Vite serves the React app on 5174
and proxies any request starting with `/api` to Express on 4000, so the frontend can call
`fetch('/api/items')` with no host and no CORS preflight. Express is also configured with
`cors` for `CLIENT_ORIGIN`, which matters if you ever call the API directly from the browser
instead of through the proxy.

The client currently makes no API calls — nothing in `src/` talks to the backend yet. To start
using it, `fetch('/api/items')` from a component and the proxy handles the rest.

On the server, `server.js` mounts JSON parsing, then the routes, then a 404 handler, then the
error handler — order matters, since Express runs middleware top to bottom. Controllers use
plain `async` functions and simply `throw` on failure: Express 5 forwards rejected promises to
the error middleware automatically, so no `try/catch` or `express-async-handler` wrapper is
needed. `middleware/errorHandler.js` translates Mongoose's `ValidationError` into a `400` and a
bad `ObjectId` (`CastError`) into a `404`, and hides stack traces when `NODE_ENV=production`.

## Building for production

```bash
npm run build
```

Outputs the optimized client to `client/dist/`.

## Tech stack

Express 5 · Mongoose 8 · React 19 · Vite 7
