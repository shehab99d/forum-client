# 🗣️ Forumify - A Modern MERN Stack Forum Platform

Forumify is a full-stack forum web application built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to share knowledge, post questions, upvote/downvote content, comment, and interact with the community.

Admin features allow user management, comment moderation, and banning misbehaving users.

---

## 🚀 Live Site

🔗 [Visit Forumify Live](https://your-deployment-link.vercel.app)

---

## 🧠 Features

### 👤 Authentication & Authorization

- Firebase Authentication
- Email/password + Google login
- Role-based access (Admin, Member, Guest)
- JWT token-based protected routes

### 🏠 Home Page

- Banner with animation
- Recent posts
- Tags-based search
- Featured sections

### 📝 Forum Posts

- Create, edit, and delete posts (authenticated users)
- Rich post structure: title, tag, description
- Each post includes upvote/downvote system
- View all posts or filter by tags

### 💬 Comments

- Comment on posts
- View comments with modal support
- Admin can manage and delete reported comments

### 📢 Reporting System

- Users can report offensive comments with reasons
- Admin panel to review, ignore, or delete reported comments

### 📊 Dashboard

- Personalized dashboard for each user
- Track total posts, upvotes, membership status
- Manage personal posts and profile

### 👑 Membership System

- Bronze & Gold badges
- Gold membership unlocked through demo payment form (no real transaction)

### 🎭 Admin Panel

- View & delete users
- Ban/unban users
- Manage reported content

### 🎥 Intro Animation

- Entry animation displayed for 2-3 seconds before routing begins

---

## 🛠️ Tech Stack

### Frontend:

- React.js
- React Router
- Firebase Auth
- Tailwind CSS + DaisyUI
- Axios + TanStack Query
- Framer Motion (animation)
- SweetAlert2 (confirmation modals)
- react-responsive-modal
- react-icons

### Backend:

- Express.js
- MongoDB (with collections: users, posts, comments, reports)
- JWT for secure route access
- CORS + dotenv

---

## 🔐 Environment Variables

Create a `.env` file in the root of both `/client` and `/server` directories with the following:

### Client (.env):

