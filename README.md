# ☕ Velvet Roast 

A premium, highly interactive 3D coffee shop experience built as a **Full MERN Stack** application.

![Velvet Roast Preview](https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80)

## Overview
Velvet Roast began as an immersive frontend-only project utilizing vanilla HTML, CSS Custom Properties, and ES6 JavaScript to create stunning 3D CSS animations and scroll interactions.

It has now evolved into a full-stack ordering application using **Node.js, Express, and MongoDB** to handle secure user authentication and order management.

## ✨ Features

### Frontend (Vanilla JS + CSS3)
- **3D Animations**: Immersive CSS `rotateX`, `rotateY`, and `perspective` integrations (Rotating coffee cups, tilt-tracking menu cards, flipping about section).
- **Custom Aesthetic**: A highly curated color palette (Deep Mocha, Warm Gold, Cream) to simulate a luxury coffee experience.
- **Micro-interactions**: Custom mouse cursors, scroll revealing elements, and animated counters.
- **Swiper.js** integrated user testimonial carousel.

### Backend (Node.js + Express + MongoDB)
- **Robust REST API**: Modular routes handling users, authentication, and coffee orders.
- **Secure Auth**: Passwords hashed securely using `bcryptjs` and session persistence managed via strictly signed **JSON Web Tokens (JWT)**.
- **Mongoose ORM**: Structured schemas mapping relational logic between Users and their Order histories.

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine.
- A local or remote instance of MongoDB.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aryan07175/velvet-roast.git
   cd velvet-roast
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Environment Setup:**
   Ensure you have a `.env` file in the `/server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/velvet-roast
   JWT_SECRET=your_super_secret_key
   ```

4. **Start the API Server:**
   ```bash
   # From the /server directory
   node server.js
   ```

5. **View the Site:**
   Open your browser and navigate to exactly:
   [http://localhost:5000](http://localhost:5000)

## 📁 Project Structure

```text
velvet-roast/
├── client/              # The Frontend application
│   ├── css/style.css    # 3D animations and responsive layout
│   ├── js/              # Vanilla ES6 logic (main, auth, dashboard)
│   ├── index.html       # Landing page
│   ├── login.html       # Secure Auth portal
│   └── dashboard.html   # Ordering interface
└── server/              # Node.js API
    ├── models/          # Mongoose DB Schemas
    ├── routes/          # API Controllers
    ├── middleware/      # JWT Validation
    └── server.js        # Express application entry
```

---
*Brewed with passion. Experience perfection in every cup.*
