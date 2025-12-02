# **NextAUV — AUV Discussion Forum**
A centralized discussion platform built for AUV (Autonomous Underwater Vehicle) teams, researchers, and enthusiasts.
NextAUV solves the challenge of fragmented communication across universities by offering a structured, searchable, and collaborative forum built with modern web technologies.
This platform aims to enhance learning, accelerate debugging, and strengthen community-driven development.
Features:
* Post questions
* Share solutions
* Collaborate on AUV-specific challenges
* Easily search structured knowledge
---

## **2. System Architecture**

### **Architecture Flow**

```
Frontend (Next.js App Router)
      ↓
Backend API (Next.js API Routes / Node.js Express)
      ↓
PostgreSQL Database (NeonDB via Prisma)
```

## **3. Tech Stack Overview**

| Layer              | Technologies                              |
| ------------------ | ----------------------------------------- |
| **Frontend**       | Next.js, React, TailwindCSS               |
| **Backend**        | Node.js, Express.js or Next.js API Routes |
| **Database**       | PostgreSQL (NeonDB)                       |
| **ORM**            | Prisma                                    |
| **Authentication** | NextAuth.js or JWT                        |
| **Hosting**        | Vercel, NeonDB                            |

---

## **5. API Overview**

### **Authentication**

| Endpoint           | Method | Description       | Access |
| ------------------ | ------ | ----------------- | ------ |
| `/api/auth/signup` | POST   | Register new user | Public |
| `/api/auth/login`  | POST   | Authenticate user | Public |

### **Posts**

| Endpoint         | Method | Description                                | Access             |
| ---------------- | ------ | ------------------------------------------ | ------------------ |
| `/api/posts`     | GET    | Get all posts (pagination, search, filter) | Authenticated      |
| `/api/posts`     | POST   | Create a new forum post                    | Authenticated      |
| `/api/posts/:id` | GET    | Get a single post with comments            | Authenticated      |
| `/api/posts/:id` | PUT    | Edit post                                  | Author / Moderator |
| `/api/posts/:id` | DELETE | Delete post                                | Moderator / Admin  |

### **Comments**

| Endpoint        | Method | Description             | Access        |
| --------------- | ------ | ----------------------- | ------------- |
| `/api/comments` | POST   | Add a comment to a post | Authenticated |

## **7. Getting Started**

### **Prerequisites**

* Node.js 18+
* PostgreSQL (NeonDB recommended)
* Yarn or npm

### **Installation**

```bash
git clone https://github.com/<your-username>/nextAUV.git
cd nextAUV
```

### **Environment Setup**

Create `.env` files for frontend and backend with the following:

```
DATABASE_URL=
JWT_SECRET=
NEXT_PUBLIC_API_URL=
```

### **Run Development Server**

```bash
cd nextauv
npm install
npm run dev
```

Backend:
go to for backend installations: https://github.com/mittalayushh/nextauvserver
---

## **8. Deployment**

### Frontend

* Deploy to **Vercel**
* Auto-builds from GitHub

### Backend

* Deploy backend to Render

### Database

* NeonDB → connect via DATABASE_URL

---

## **9. License**

MIT License

---

## **10. Contributing**

Pull requests are welcome.
For major changes, open an issue first to discuss what you would like to modify.

---
