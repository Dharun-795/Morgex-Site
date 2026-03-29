# Morgex Deployment Roadmap (Render.com)

This guide outlines the steps to deploy your Full-Stack MERN application to production.

## 1. Database Setup (MongoDB Atlas)
1.  Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a new Cluster and follow the "Database User" setup (save your password!).
3.  Go to **Network Access** and add IP address `0.0.0.0/0` (Allow Access from Anywhere).
4.  Get your **Connection String** (Should look like `mongodb+srv://<user>:<password>@cluster.mongodb.net/morgex`).

## 2. Backend Deployment (morgex-server)
1.  Push your code to **GitHub**.
2.  Login to [Render.com](https://render.com) and create a **New Web Service**.
3.  Connect your GitHub repository.
4.  Configure the service:
    - **Language:** Node
    - **Build Command:** `npm install`
    - **Start Command:** `node server.js`
5.  In the **Environment** tab, add the following variables:
    - `MONGO_URI`: (Your Atlas Connection String)
    - `JWT_SECRET`: (A random long string, e.g., `MORGEX_PROD_SECRET_2026`)
    - `PORT`: `5000` (Optional, Render assigns its own port too)

## 3. Frontend Deployment (morgex-client)
1.  In `morgex-client/src/pages/Home.jsx` (and other pages), ensure you update the `API_URL` to your new Render Backend URL (e.g., `https://morgex-api.onrender.com/api`).
2.  On Render, create a **New Static Site**.
3.  Connect your GitHub repository.
4.  Configure the site:
    - **Build Command:** `npm run build`
    - **Publish Directory:** `dist`
5.  Add a **Redirect Rule** (important for React Router):
    - **Source:** `/*`
    - **Destination:** `/index.html`
    - **Status:** `200`

## 4. Mobile Site Readiness
The application is already configured with:
- **Responsive Navbar:** Collapses to a hamburger menu on small screens.
- **Mobile Checkout:** The payment modal transforms into a bottom-anchored "Shelf" view for easier thumb interaction on phones.
- **Fluid Grids:** Course cards stack vertically to prevent horizontal scrolling.

> [!TIP]
> Always test your `API_URL` with a browser before linking the frontend to ensure the backend is live and "MongoDB connected successfully" is in the logs!
