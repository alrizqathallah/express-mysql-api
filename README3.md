# ExpressJS + MySQL REST API

Sebuah template aplikasi backend API yang dibangun dengan **ExpressJS**, **MySQL2**, dan perangkat pengembangan serta linting modern.

---

## Daftar Fitur

- API endpoints.
- `express` sebagai server machine.
- Integrasi database _MySQL_ dengan `mysql2`.
- Manajemen environment variable dengan `dotenv`.
- Log request dengan `morgan` dan `winston`.
- Ditambah dengan `nodemon`, `eslint`, `prettier` dan `husky` sebagai alat penunjang pengembangan.

---

## Susunan Teknologi

| Kategori      | Teknologi                                            |
| ------------- | ------------------------------------------------------- |
| **Runtime**   | Node.js, ExpressJS                                      |
| **Database**  | MySQL (dengan `mysql2` driver)                           |
| **Logging**   | `morgan` (HTTP), `winston` (manajemen log)                   |
| **Dev Tools** | `nodemon`, `ESLint`, `Prettier`, `lint-staged`, `husky` |
| **Config**    | `dotenv`                                                |

---

## **Prasyarat**

- Node.js (direkomendasikan v18+)
- MySQL (direkomendasikan v8+)
- Git

---

## **Struktur Proyek**

```
.
|- src/
|   |- app/
|   |  |-- app.js
|   |  |-- configs/
|   |- server.js
|- package.json
```

---

## Instalasi

1. **Inisialisasi Git:**

   ```bash
   git init
   ```

   Membuat repositoru

---

## 📥 **Installation**

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Rename `.env.example` to `.env` (or create a new `.env` file).
   - Add your MySQL credentials and other required variables:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=yourdbname
     PORT=3000
     NODE_ENV=development
     ```

4. **Set up the database:**
   - Create a MySQL database and update the `.env` file with your credentials.
   - Run any initial schema or seed scripts (if applicable).

---

## 🏃 **Running the Project**

| Command            | Description                         |
| ------------------ | ----------------------------------- |
| `npm run dev`      | Start the server with `nodemon`     |
| `npm start`        | Start the server in production mode |
| `npm run lint`     | Run ESLint                          |
| `npm run lint:fix` | Fix ESLint issues                   |
| `npm run format`   | Format code with Prettier           |

---

## 📂 **Project Structure**

```
.
├── src/
│   ├── config/         # Database and app config
│   ├── controllers/    # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middlewares/    # Custom middlewares
│   ├── utils/          # Utility functions
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── .env.example        # Environment variables template
├── .eslintrc.js        # ESLint config
├── .prettierrc         # Prettier config
├── package.json
└── README.md

|-- src/
|   |--config/

```

---

## 🔌 **API Endpoints**

| Method | Endpoint      | Description           |
| ------ | ------------- | --------------------- |
| GET    | `/api/health` | Health check endpoint |
| POST   | `/api/users`  | Create a new user     |
| GET    | `/api/users`  | Get all users         |

_(Add your actual endpoints here as you develop them.)_

---

## 🤝 **Contributing**

Contributions are welcome! Please fork the repository and submit a pull request.

---

## 📜 **License**

This project is licensed under the **MIT License**.

## </canvaentity

---

### **Next Steps**

- Replace placeholders (e.g., `<your-repo-url>`, database credentials) with your actual values.
- Add your API endpoints as you develop them.
- Customize the project structure if needed.

Would you like me to add a **Postman collection example** or **Docker setup** section as well?
