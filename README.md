# Proyecto - Sistemas Web I

This repository is dedicated to the 'Sistemas Web I' course project.

**Group members**: Khalid Belkassmi E.H., Enrique Collado Muñoz, Jesús Marín Sánchez, Pablo Garay Pérez

## About this project 🤔

<div align="center">
  <img src="https://github.com/user-attachments/assets/ea40fdb5-06b4-44ce-abe2-2a7187e7894d" style="width: 30%">
</div>

**Project Title**: SneakeRate

**The goal**: Create a **full-stack** web app using JS/TS, HTML, CSS or frameworks based on them, along with Node.js for the backend. The app must have various roles used limiting some permissions and access to certain pages. See the **[docs](/docs)** for more information.

**What we built**: A web application that allows sneaker enthusiasts to explore and evaluate a variety of sneakers. The platform enables users to **rate and review sneakers**, as well as **view ratings** from others, offering insights into popular choices. Rather than functioning as a marketplace, SneakeRate serves as **a resource for gathering authentic opinions and information about different sneakers**.

**The Chosen Stack**: React with NextJS (uses NodeJS), MongoDB as the database, with Typescript as the language and Tailwind as the CSS framework.

## Usage 🕹

### Requirements

To launch the project, you need to have the following installed locally:
- **NodeJS** (tested with versions 18 and 20)
- **MongoDB**


### Setup and Running

1. Rename the `.env.example` to `.env` in both the `frontend/` and `server/` directories.

    > Note: Ensure MongoDB is running before starting the server.

2. In both the `frontend/` and `server/` directories, follow these steps:

    First, **install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

    Then **run (dev mode)** - Start the development server.

    ```bash
      npm run dev
      # or
      yarn dev
      # or
      pnpm dev
      # or
      bun dev
    ```

    This will launch the app on port 3000 (```http://localhost:3000/```)

### Production build

To **compile** the application for **production** deployment:


```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun run build
```

## License 📃

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.
