# 📋 TalentFlow – Candidate & Job Management Platform

A full-stack HR Management Dashboard built using MongoDB, Node.js, and Express for the backend, and React for the frontend. This application enables recruiters to manage candidates, job postings, analytics, and recruitment workflows efficiently with a modern UI and real-time data updates.

---

## 🚀 Features

### 🔐 Authentication & Protected Routing

* Secure login & registration system
* Protected dashboard routes using `ProtectedRoute`
* Unauthorized users are redirected to login

---

### 📊 Dashboard Analytics

* Interactive charts using Recharts
* KPI cards (Applied, Hired, Offered, etc.)
* Dynamic filtering on card click

---

### 👥 Candidate Management

* Add, edit, delete candidates
* Bulk delete functionality
* Status tracking (Active, Hired, Offered, etc.)
* Smart validation with confirmation modals

---

### 💼 Job Management

* Post new jobs
* Apply for jobs
* Manage job listings

---

### 📊 AG Grid Integration

* Advanced data tables
* Sorting, filtering, pagination
* Column resizing & pinning
* Export to Excel

---

### 📂 File Upload

* Resume upload using Multer
* Backend file handling

---

### 🎨 UI & Experience

* Ant Design components
* Light/Dark theme support
* Responsive layout
* Reusable UI components

---

## 🛠 Tech Stack

### Frontend

* ⚛️ React (Vite)
* 🎨 Ant Design + Bootstrap
* 📊 AG Grid
* 📈 Recharts

### Backend

* 🟢 Node.js
* 🚀 Express.js
* 🍃 MongoDB (Mongoose)
* 📂 Multer

---

## 📂 Project Structure

```bash
app/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── candidateController.js
│   │   └── jobController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Candidate.js
│   │   ├── Job.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── candidateRoutes.js
│   │   └── jobRoutes.js
│   │
│   ├── server.js
│   ├── seed.js
│   └── .env
│
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── candidates/
│   │   │   ├── CandidateForm.jsx
│   │   │   └── TableToolbar.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── DashboardCharts.jsx
│   │   │
│   │   ├── jobs/
│   │   │   ├── JobApplicationForm.jsx
│   │   │   └── PostJobForm.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │   │
│   │   └── ui/
│   │       ├── AgGridTable.jsx
│   │       ├── ConfirmModal.jsx
│   │       ├── LoadingSpinner.jsx
│   │       ├── StatCard.jsx
│   │       ├── StatCards.jsx
│   │       └── StatusBadge.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CandidateContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── pages/
│   │   ├── CandidatesPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── JobsPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── SettingsPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   └── services.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── App.css
│
├── public/
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Suresh100720/Multipages.git
cd Multipages
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=mongodb://127.0.0.1:27017/candidateDB
PORT=5000
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd ..
npm install
npm run dev
```

---

## 🌐 API Base URL

```
http://127.0.0.1:5000/api
```

---

## 📡 API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Candidates

* GET `/api/candidates`
* POST `/api/candidates`
* PUT `/api/candidates/:id`
* DELETE `/api/candidates/:id`

### Jobs

* GET `/api/jobs`
* POST `/api/jobs`

---

## 🔄 Application Flow

1. User logs in → AuthContext stores token
2. ProtectedRoute restricts dashboard access
3. CandidateContext fetches data from backend
4. Data displayed in AG Grid
5. Charts update dynamically based on data

---

## 🔥 Key Concepts Used

* React Router v6 (Nested + Protected Routes)
* Context API (Global State Management)
* AG Grid (Advanced Tables)
* Recharts (Data Visualization)
* Multer (File Upload)
* JWT Authentication
* REST API Architecture

---

## 🚀 Future Enhancements

* Role-based access (Admin/User)
* Cloud storage (AWS S3 / Cloudinary)
* Notifications system
* Advanced filtering & search
* Mobile responsiveness

---

## 📄 License

MIT License

---

## 👨‍💻 Author

* Suresh

