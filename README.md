# 🎓 Project Nexus – Campus Super-App

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.3-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Team](https://img.shields.io/badge/Team-AVAKAYA-orange?style=for-the-badge)

**A Centralized Digital Ecosystem for Student Life Management**

[Features](#-features) • [Quick Start](#-quick-start) • [Demo Credentials](#-demo-credentials) • [Team](#-team)

</div>

---

## 🌟 Features

### Core Capabilities
- ✅ **Daily Pulse** - Real-time mess menu & Mail Summarizer
- 🤖 **Smart Integration** - Intelligent tools to simplify student life
- 📊 **Academic Cockpit** - Live timetable, attendance tracking & CGPA analysis
- 🤝 **Student Exchange** - Lost & found community board with status tracking
- 🗺️ **Explorer Guide** - Curated campus hangouts & study spots
- 📱 **Mobile First** - Fully responsive design for on-the-go access
- 🔒 **Secure Auth** - Role-based access control with NextAuth.js
- ⚡ **Zero Latency** - Optimistic UI updates & local database

### Advanced Features
- **Mail Summarizer** - Condenses lengthy emails into actionable bullet points
- **Live Timetable** - Real-time "Up Next" class predictions & animations
- **Performance Analytics** - Term-by-term CGPA visualization & trend analysis
- **Nexus Assistant** - Conversational interface for app navigation
- **Subject Analysis** - Detailed attendance breakdown per faculty

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/project-nexus.git
cd project-nexus

# 2. Install dependencies
npm install

# 3. Initialize Database
npx prisma db push
npx prisma db seed

# 4. Run the application
npm run dev

# 5. Open in browser
# Navigate to: http://localhost:3000
```

---

## 📸 Demo Credentials

| User | Role | Username (UID) | Password |
|------|------|----------------|----------|
| **Rahul Sharma** | Student (CS-A) | `u123456` | `password123` |
| **Priya Patel** | Student (CS-B) | `u123457` | `password123` |
| **Arjun Singh** | Student (ME-A) | `u123458` | `password123` |

---

## 📖 Documentation

### Project Structure
```
project-nexus/
├── prisma/                    # Database schema & seeds
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router pages
│   ├── components/            # Reusable UI components
│   ├── lib/                   # Utilities (Prisma, Auth)
│   └── types/                 # TypeScript definitions
├── .env                       # Environment variables
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

### Key Modules

#### `Daily Pulse`
Handles daily essentials:
- **Mess Menu**: Fetches daily food schedule from database
- **Mail Summarizer**: Uses keyword extraction to summarize text

#### `Academic Cockpit`
Productivity central:
- **Timetable**: Real-time schedule tracking
- **CGPA Chart**: Visualizes academic progress using SVG graphs
- **Attendance**: Tracks subject-wise attendance stats

#### `Student Exchange`
Community marketplace:
- **Lost & Found**: Post and track items
- **Status Workflow**: Open -> Resolved state management

---

## 👥 Team

<div align="center">
<h3>Team AVAKAYA MADE THIS</h3>
<p>Crafted with passion for the Hackathon</p>
</div>

---

## 🤝 Contribution

We welcome contributions! Please follow these steps:

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

---

<div align="center">
Made with ❤️ by Team AVAKAYA
</div>
