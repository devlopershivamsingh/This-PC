require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: "22510039",
  port: process.env.PORT,
  password: process.env.PASS,
  database: process.env.DB,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("MySQL Connected Successfully...");
  }
});

module.exports = db;
