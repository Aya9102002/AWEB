
# AWEB

## Project Status

This repository contains a React frontend and a partially developed backend. The backend integration with the frontend is **not complete**.

## Team

- Aya Tammam
- Aseel Abdo
  
## Branches

- **`main`** — The complete frontend, built with React.
- **`api`** — Backend work-in-progress. Built primarily with **GraphQL** (Apollo Server, in `schema/` and `resolvers/`). It also contains an earlier REST-style attempt (`controller/`, `model/`) that is no longer used by the running server (`app.js` only starts the Apollo/GraphQL server) and is kept here for reference.
- **`restwith`** / **`withrest`** — Earlier frontend iterations from initial experimentation with connecting a backend.

## Tech Stack

- **Frontend:** React
- **Backend (in progress):** Node.js, Apollo Server (GraphQL), MySQL

## Notes

- The backend (`api` branch) is not yet connected to the frontend (`main` branch).
- The backend mixes an earlier REST-style structure with the current GraphQL implementation; only the GraphQL server is actually running.
