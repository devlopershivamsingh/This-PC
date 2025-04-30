require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const scoreRoute = require("./routes/scoreRoute");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/score", scoreRoute);

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "22510108",
  database: "employees",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    process.exit(1);
  }
  console.log("Connected to MySQL");
});

// Employee Routes
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post("/employees", (req, res) => {
  const { name, position, salary } = req.body;
  db.query(
    "INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)",
    [name, position, salary],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "Employee added", id: result.insertId });
    }
  );
});

app.put("/employees/:id", (req, res) => {
  const { id } = req.params;
  const { name, position, salary } = req.body;
  db.query(
    "UPDATE employees SET name = ?, position = ?, salary = ? WHERE id = ?",
    [name, position, salary, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Employee updated" });
    }
  );
});

app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM employees WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Employee deleted" });
  });
});

// Department Routes
app.get("/departments", (req, res) => {
  db.query("SELECT * FROM departments", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.get("/departments/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM departments WHERE dept_id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

app.post("/departments", (req, res) => {
  const { dept_name } = req.body;
  db.query("INSERT INTO departments (dept_name) VALUES (?)", [dept_name], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ dept_id: result.insertId, dept_name });
  });
});

app.put("/departments/:id", (req, res) => {
  const { id } = req.params;
  const { dept_name } = req.body;
  db.query("UPDATE departments SET dept_name = ? WHERE dept_id = ?", [dept_name, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ dept_id: id, dept_name });
  });
});

app.delete("/departments/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM departments WHERE dept_id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(204).send();
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
