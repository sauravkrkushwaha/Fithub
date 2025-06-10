# 🏋️‍♂️ Fithub - Fitness Platform

**Fithub** is a full-stack fitness platform that connects users with coaches, provides workout information, and helps find nearby gyms. The application is built using **React (frontend)** and **Node.js + MongoDB (backend)**.

---

## 📁 3. Source Code

### 🔗 GitHub Repository
Clone or download the full source code from the repository:

```bash
git clone https://github.com/yourusername/Fithub.git
```

The project is structured into two main directories:

```
Fithub/
├── frontend/     # React-based UI with routing and components
└── backend/      # Node.js + Express API with MongoDB integration
```

### 📚 Libraries Used

#### Frontend

- React 19
- React Router DOM v7
- Bootstrap 5 & React Bootstrap
- MUI (Material UI) Icons and Components
- Font Awesome
- Axios
- Google Maps JS API Loader
- Socket.IO

#### Backend

- Express.js
- MongoDB with Mongoose
- dotenv
- cors
- bcryptjs
- jsonwebtoken
- multer (file uploads)
- node-cron (automated scraping tasks)

---

## 🚀 4. Program: How to Run the Project

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB Atlas** or local instance
- **Python** (for scraper script)
- **npm** or **yarn**

---

### ⚙️ Step-by-Step Setup

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Fithub.git
cd Fithub
```

#### 2. Set Up Backend

```bash
cd backend
npm install
```

- Create a `.env` file and configure:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

- Start the backend:

```bash
node index.js
```

> You will see:
> `🚀 Server running on port 5000`
> `MongoDB Connected: ...`

---

#### 3. Set Up Frontend

```bash
cd ../frontend
npm install
npm run dev
```

> Your app will be live at:
> `http://localhost:5173/`

---

## 🔧 5. Support: Required Tools & Environments

| Tool | Purpose |
|------|---------|
| Node.js | JavaScript runtime |
| MongoDB Atlas | Cloud NoSQL database |
| Python | For running `scrapper.py` cron job |
| Vite | React dev server |
| VS Code | Recommended IDE |

Optional:
- Postman (API testing)
- GitHub Actions (CI/CD automation)

---

## 📘 6. Help: User Manual

### ✨ Features Overview

- 🧑‍🏫 **Coach Signup/Login/Profile**
- 🧍‍♂️ **User Signup/Login/Profile**
- 🧾 **Chat Interface**
- 🏋️ **Body Exercises by Body Part**
- 📍 **Nearby Gyms with Google Maps API**
- 📋 **Admin Coach Form (Add/Edit)**
- 📄 **Static Pages: About, Privacy Policy, Contact**

---

### 🖥️ Usage Instructions

#### ✅ Sign Up / Login

- Choose **User** or **Coach** from SignupChoice
- Fill in your details and register
- Login to your dashboard

#### 🧑‍💼 Coach Area

- List your profile and skills
- Manage users via chat
- Fill in **Coach Form**

#### 🏃 User Area

- Browse coaches by category
- Access **Body Exercise** suggestions
- Use **Nearby Gyms** map

#### 💬 Chat Feature

- Initiate chat with coaches from the list
- Real-time updates via `socket.io`

---

## 📅 Cron Job: Exercise Data Scraper

The backend includes a cron job that runs `scrapper.py` every 15 days at 2 AM to update exercise data.

You can manually test it with:

```bash
cd backend/exerciseJson
python scrapper.py
```

Make sure Python is installed and configured in PATH.

---

## 📞 Support

For bugs, issues, or contributions:
- Create an issue on GitHub
- Contact: [your-email@example.com]

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
