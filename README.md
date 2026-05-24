# 📚 DSA Sheets

> **One platform. Multiple curated sheets. Your complete DSA journey.**

A full-stack web application that centralizes top curated DSA problem sheets — **Striver**, **Love Babbar**, and **ApnaCollege** — into a single searchable, topic-organized platform with progress tracking, bookmarking, and personalized study paths.

---

## 🌐 Live Demo

<!-- Add your deployed link here -->
[https://your-deployed-url.vercel.app](https://dsasheets2.vercel.app/)

---

## ✨ Features

| Feature | Description |
|---|---|
| 📋 **Sheet Aggregation** | Browse Striver, Love Babbar, and ApnaCollege sheets in one place |
| 🗂️ **Topic View** | Problems grouped by topic — Arrays, Graphs, DP, Trees, and more |
| 🔍 **Smart Search & Filter** | Filter by keyword, difficulty, company tag, or topic |
| 📄 **Problem Detail Page** | Full problem statement, tags, difficulty, example I/O, and references |
| ✅ **Solve Tracking** | Mark problems as Solved / Attempted / Skipped with persistent progress |
| 👤 **User Accounts** | Signup, login, secure password hashing, and user profiles |
| 📊 **Progress Analytics** | Track solved counts, topic completion %, streaks, and summary stats |
| 🔖 **Bookmarks & Notes** | Save problems and attach personal notes |
| 📦 **Import / Export** | JSON import/export of converted sheets for offline use |
| 📱 **Responsive UI** | Clean, animated UI that works on desktop and mobile |
| 🛠️ **Developer Tools** | Scripts for data conversion, password hashing, and API CRUD routes |

---

## 🖼️ Screenshots

<!-- Replace with actual screenshots -->
```
📸 Add screenshots here: Home Page | Topic View | Problem Detail | Progress Dashboard
```

---

## 🚀 Tech Stack

**Frontend**
- HTML / CSS / JavaScript (Vite)
- Responsive, animated UI

**Backend**
- Node.js + Express
- REST API with full CRUD support

**Database**
- MongoDB (Users, Problems, Sheets, Progress models)

**Auth & Security**
- JWT-based authentication
- bcrypt password hashing

**Deployment**
- Vercel (frontend) + Backend hosting ready

---

## 🗂️ Project Structure

```
DSA-Sheets/
├── frontend/
│   ├── src/
│   │   ├── pages/          # Home, Topics, Problem Detail, Progress
│   │   └── components/     # Reusable UI components
│   ├── convertedSheet/     # JSON conversion scripts for sheets
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   │   ├── users.js
│   │   ├── problems.js
│   │   ├── sheets.js
│   │   └── progress.js
│   ├── routes/             # API endpoints
│   ├── scripts/
│   │   └── hashExistingPasswords.js
│   └── server.js
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dsa-sheets.git
cd dsa-sheets
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will run at `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login and get JWT |
| `GET` | `/api/problems` | Get all problems (with filters) |
| `GET` | `/api/problems/:id` | Get a single problem |
| `POST` | `/api/progress` | Update solve status |
| `GET` | `/api/progress/:userId` | Get user's progress |
| `GET` | `/api/sheets` | Get all available sheets |

---

## 👥 Who Is This For?

<details>
<summary><b>🎓 New Learner</b> — Start practicing systematically</summary>

Sign up → Open Topics View → Pick a foundational topic (Arrays, Strings, Two Pointers) → Mark 10 problems as attempted per week → Review mistakes with bookmarks.

</details>

<details>
<summary><b>💼 Interview Aspirant</b> — Focused interview readiness</summary>

Use company tags + difficulty filters → Follow a 6-week schedule → Simulate interviews with medium-hard problems → Track readiness via the Progress Dashboard.

</details>

<details>
<summary><b>⚡ Competitive Coder</b> — Maximum problem throughput</summary>

Leverage sheet aggregation + search filters → Timed problem sessions → Rotate across topics → Export/import sheets for offline practice.

</details>

<details>
<summary><b>📋 Instructor / Mentor</b> — Assign problems and monitor learners</summary>

Use topic groupings and difficulty tags → Generate weekly assignments → Export problem sets as JSON for class distribution.

</details>

<details>
<summary><b>🔬 Data-Driven Learner</b> — Improve using analytics</summary>

Identify weak areas via per-topic completion stats → Spend 2x time on topics with <40% completion → Track improvement over 4 weeks.

</details>

---

## 📈 Key Metrics (For PMs / Stakeholders)

- **DAU** — Daily active users
- **Weekly Solved Problems per User**
- **Topic Completion Rate**
- **Signup Conversion Rate**
- **Streak Retention**

> Models available: `users`, `progress`, `sheets`, `problems`

---

## 🤝 Contributing

Contributions are welcome! To add a new DSA sheet:

1. Add the raw JSON data to `frontend/convertedSheet/`
2. Run the conversion script to normalize format
3. Add entries to the `sheets` model in the backend
4. Update the relevant API routes
5. Test locally — verify problems appear in Topic View and Search
6. Submit a Pull Request 🎉

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [Striver's A2Z DSA Sheet](https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/)
- [Love Babbar's DSA Sheet](https://www.geeksforgeeks.org/dsa-sheet-by-love-babbar/)
- [ApnaCollege DSA Sheet](https://www.apnacollege.in/)

---

<p align="center">
  Built with ❤️ for DSA learners everywhere
</p>

