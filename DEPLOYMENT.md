# Deployment & Hosting Guide: SystemCraft Pro

**SystemCraft Pro** is built with Next.js 16 (React 19, TypeScript), featuring a unified frontend and backend REST API. It is designed to be hosted for free or in production with zero configuration.

---

## Option 1: 1-Click Free Hosting on Vercel (Recommended)

Vercel is the creator of Next.js and provides the easiest, fastest free hosting for this full-stack application.

### Steps:
1. Push this project to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of SystemCraft Pro platform"
   git remote add origin https://github.com/YOUR_USERNAME/system-design-platform.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [https://vercel.com/new](https://vercel.com/new).
3. Connect your GitHub account and select your `system-design-platform` repository.
4. Framework Preset will automatically detect **Next.js**.
5. Click **Deploy**.
6. In **~60 seconds**, your application will be live with:
   - Free SSL/HTTPS certificate (`https://your-app.vercel.app`)
   - Global CDN edge caching
   - Serverless API routes (`/api/concepts`, `/api/simulator/evaluate`, `/api/quiz`, etc.)
   - Automatic preview deployments for pull requests

---

## Option 2: Free Hosting on Render

Render provides free hosting for web services and Docker containers.

### Steps:
1. Go to [https://dashboard.render.com](https://dashboard.render.com).
2. Click **New +** $\rightarrow$ **Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration:
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
   - **Plan:** Free
5. Click **Create Web Service**.

---

## Option 3: Free Hosting on Railway

1. Go to [https://railway.app](https://railway.app).
2. Click **New Project** $\rightarrow$ **Deploy from GitHub repo**.
3. Select this repository.
4. Railway will automatically detect Next.js, run the build, and generate a live URL.

---

## Option 4: Production Self-Hosted Docker

This repository includes a multi-stage `Dockerfile` and `docker-compose.yml`.

### Run with Docker Compose:
```bash
docker compose up -d --build
```

### Or Build & Run Directly:
```bash
# Build lightweight production image
docker build -t systemcraft .

# Run container on port 3000
docker run -d -p 3000:3000 --name systemcraft systemcraft
```
The application will be accessible at `http://localhost:3000`.

---

## Environment Variables (Optional)

| Variable | Description | Default |
|---|---|---|
| `PORT` | Listening server port | `3000` |
| `NODE_ENV` | Environment mode | `production` |
