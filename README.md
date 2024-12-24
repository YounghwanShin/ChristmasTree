# Christmas Tree Project

A two-part web application (Server + Client) that allows users to decorate a Christmas tree with ornaments and leave personalized messages. The server is built with **Node.js / Express** for data persistence using a simple `db.json` (or any DB of your choice), and the client is built with **React** to provide a rich, responsive user interface. A special “owner” view is available for reviewing messages behind a password-protected route.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Project Structure](#project-structure)  
- [Installation](#installation)  
  - [Server Setup](#server-setup)  
  - [Client Setup](#client-setup)  
- [Development](#development)  
- [Deployment](#deployment)  
  - [Deploying the Server](#deploying-the-server)  
  - [Deploying the Client (GitHub Pages)](#deploying-the-client-github-pages)  
- [Future Improvements](#future-improvements)  
- [Contributing](#contributing)  
- [License](#license)

---

## Overview

This project consists of two main parts:

1. **Server**: A Node.js + Express application that stores ornament and message data.  
2. **Client**: A React frontend that displays the Christmas tree, allows users to place ornaments and leave messages, and provides an owner-only view for managing messages.

When running locally, the server typically runs on port `4000`, and the client on port `3000`. In production, you can deploy the server to a hosting service (e.g. Render, Railway, etc.) and the client to GitHub Pages or similar static hosting.

---

## Features

- **Tree Decoration**: Users can choose an ornament and attach a personal message, instantly visible on the Christmas tree.  
- **Owner Authentication**: The owner can log in with a password to view all messages in detail.  
- **Responsive UI**: Fully responsive design, supporting mobile and desktop form factors.  
- **Pagination** (optional): The client can page through ornaments if there are many on the tree.

---

## Project Structure

```
ChrismasTree/
├── server/
│   ├── public/
│   │   └── db.json            # Simple data storage (or could use DB)
│   ├── server.js              # Express server entry
│   ├── package.json           # Server dependencies & scripts
│   └── ...
│
├── client/
│   ├── public/
│   │   ├── index.html         # Main HTML for React
│   │   └── favicon.ico        # ...
│   ├── src/
│   │   ├── assets/            # Images (tree, ornaments, etc.)
│   │   ├── components/        # React components
│   │   ├── pages/             # React pages (Home, OwnerView, etc.)
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json           # Client dependencies & scripts
│   └── ...
│
├── README.md                  # This file
└── ... (any additional files)
```

---

## Installation

### Server Setup

1. **Go to the server directory**:
   ```bash
   cd server
   ```
2. **Install server dependencies**:
   ```bash
   npm install
   ```
3. **Edit `db.json`** (optional):
   - If you want some initial decorations or messages, you can pre-populate `public/db.json` with:
     ```json
     {
       "decorations": [],
       "letters": []
     }
     ```
4. **Start the server**:
   ```bash
   npm start
   ```
   - By default, it will run on `http://localhost:4000` (or a port set by `PORT` in environment variables).

### Client Setup

1. **Go to the client directory**:
   ```bash
   cd ../client
   ```
2. **Install client dependencies**:
   ```bash
   npm install
   ```
3. **Configure API endpoints** (optional):
   - If you want a local dev environment, you may set:
     ```js
     // For example, in client/src/config.js or similar
     const API_BASE_URL = process.env.NODE_ENV === 'production'
       ? 'https://your-production-server.onrender.com'
       : 'http://localhost:4000';
     export default API_BASE_URL;
     ```
   - Then in your code, reference `API_BASE_URL` for fetching from the server.
4. **Start the client**:
   ```bash
   npm start
   ```
   - The React app will run on `http://localhost:3000` by default.

---

## Development

To run both **server** and **client** locally at the same time, open two terminals:

```bash
# Terminal 1
cd server
npm start

# Terminal 2
cd client
npm start
```

- **Server**: [http://localhost:4000](http://localhost:4000)  
- **Client**: [http://localhost:3000](http://localhost:3000)

The client code calls `http://localhost:4000/api/...` to retrieve or save data (ornaments, messages, etc.).

---

## Deployment

### Deploying the Server

You can deploy the Node.js server (in `server/`) to a hosting service like **Render**, **Railway**, **Fly.io**, or any place that supports Node.js. For example, on Render:

1. **Push your code to GitHub**.  
2. **Create a new Web Service** on Render, choosing your repository and specifying `server/` as the base directory.  
3. Build command: `npm install`, start command: `npm start`.  
4. Once deployed, you’ll get a URL like `https://your-christmas-server.onrender.com`.

### Deploying the Client (GitHub Pages)

1. **In `client/package.json`**, add or update the `homepage` field:
   ```json
   "homepage": "https://<your-github-username>.github.io/<your-repo-name>"
   ```
2. **Install `gh-pages`** if not already present:
   ```bash
   npm install --save-dev gh-pages
   ```
3. **Add deploy scripts** (if not already):
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build",
       ...
     }
   }
   ```
4. **Deploy**:
   ```bash
   npm run deploy
   ```
5. After a short wait, your app should be accessible at:
   ```
   https://<your-github-username>.github.io/<your-repo-name>/
   ```
6. **Important**: In production, be sure your React app is pointing to your deployed server’s URL (e.g., `https://your-christmas-server.onrender.com/api/...`).

---

## Future Improvements

- **Stronger Owner Authentication**: Replace simple password with a token-based or session-based system.  
- **Database Integration**: Migrate from `db.json` to a real database (SQLite, MongoDB, etc.) for scalability.  
- **Custom Ornaments**: Let users upload their own images.  
- **Ornament Animations**: Add hover effects or twinkling animations for holiday cheer.

---

## Contributing

1. Fork this repository  
2. Create a new feature branch (`git checkout -b feature/my-new-feature`)  
3. Commit your changes (`git commit -m "Add a new feature"`)  
4. Push to your feature branch (`git push origin feature/my-new-feature`)  
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).  
Feel free to use, modify, and distribute as needed.

---

**Merry Christmas and happy decorating!**
