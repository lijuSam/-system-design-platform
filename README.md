# SystemCraft Pro 🚀

> **The Modern, Interactive System Design & Architecture Platform for Tech Professionals**

SystemCraft Pro is a production-grade full-stack web application designed for senior software engineers, tech leads, and distributed system architects preparing for staff-level interviews and architecting high-scale web platforms.

---

## ✨ Key Features

- 🎮 **Interactive Architecture Simulator (`/simulator`)**:
  - Live canvas to model distributed systems under load.
  - Test presets: *Flash Sale E-Commerce*, *Global Video Streaming (Netflix)*, *Distributed URL Shortener (TinyURL)*.
  - Simulated Load slider from **1,000 to 180,000+ QPS**.
  - Dynamic replica fleet scaling (`+` / `-`) per node.
  - Automated detection of **Single Points of Failure (SPOFs)** and **Capacity Bottlenecks**.
  - Monthly infrastructure cloud cost & weighted end-to-end latency calculations.
- 🏢 **Real-World Case Studies (`/case-studies`)**:
  - Deep architectural breakdowns for **Netflix**, **Uber**, **WhatsApp**, **Stripe**, and **TinyURL**.
  - Capacity estimation equations (bandwidth, read/write QPS, storage footprint).
  - **Interactive 4-Step End-to-End Request Flow Pipeline** with step-by-step visual highlights.
  - Failure mode scenarios, network partitions, and chaos engineering mitigations.
- 📚 **System Design Concepts Library (`/concepts`)**:
  - In-depth mechanics for **Consistent Hashing & Virtual Nodes**, **Database Sharding**, **Cache Invalidation Patterns**, **CAP Theorem & PACELC**, **High-Throughput Rate Limiters**, and **Kafka vs RabbitMQ**.
  - Pros & Cons architectural trade-off matrices.
  - Production code snippets (Lua scripts, SQL sharding, Murmur3 hashing).
- ✍️ **Staff Engineering Technical Blogs (`/blogs`)**:
  - High-fidelity publications on zero-downtime database migrations, Redis Lua atomicity, and cache stampede prevention.
  - Interactive **Claps / Like Counter** and **Live Engineering Discussion / Comments** section.
- ⚡ **Latency Visualizer & Cheat Sheet (`/cheat-sheet`)**:
  - Interactive logarithmic scale comparing computer operations from CPU L1 cache (0.5ns) to transatlantic network fiber (150ms) with human-scaled analogies.
  - High Availability **SLA Downtime Table (99% to 99.999%)**.
  - **Database Selection Decision Matrix** (RDBMS vs Key-Value vs Wide-Column vs Document vs Search).
- 🎯 **System Design Interview Self-Assessment Quiz (`/quiz`)**:
  - Scenario-based interview questions evaluating real-world incident handling.
  - Instant scoring with **Staff System Architect (L6+)** level assessment.
- 🎨 **Modern Clean UI (Stripe / GitHub Docs Aesthetic)**:
  - Custom CSS tokens, glassmorphism cards, glowing status badges, and refined typography.
  - **One-Click Theme Toggle**: High-contrast Light Mode and Dark Slate Mode with persistent state.
  - **Spotlight Command Search (`Ctrl+K`)**: Instant modal search across all concepts, case studies, and blogs.

---

## 🛠️ Technology Stack

- **Frontend & Fullstack Framework:** Next.js 16 (React 19, TypeScript)
- **Styling:** Custom Vanilla CSS Design System with responsive variables
- **Icons:** Lucide React
- **Backend API Routes:**
  - `GET /api/concepts` - Filter by domain, difficulty, and query.
  - `GET /api/case-studies` - Query real-world architectures.
  - `GET /api/blogs` - Fetch articles by tag and category.
  - `GET / POST /api/blogs/[slug]/comments` - Live discussion comments.
  - `POST /api/simulator/evaluate` - Calculates latency, bottlenecks, and SPOFs.
  - `GET / POST /api/quiz` - Evaluates interview answers and generates rank.
  - `POST /api/newsletter` - Email subscription for weekly architecture breakdowns.

---

## 🚀 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/system-design-platform.git
cd system-design-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Free One-Click Deployment & Hosting

Check out [DEPLOYMENT.md](DEPLOYMENT.md) for full instructions:
- **Vercel (Recommended):** Connect your GitHub repository to [Vercel](https://vercel.com/new) for instant free hosting with global CDN and SSL.
- **Render:** Deploy as a Node Web Service or Docker container.
- **Railway:** Instant deployment from GitHub.
- **Docker Compose:** Run `docker compose up -d --build`.

---

## 📄 License

MIT License. Designed with ❤️ for tech professionals and distributed systems engineers worldwide.
