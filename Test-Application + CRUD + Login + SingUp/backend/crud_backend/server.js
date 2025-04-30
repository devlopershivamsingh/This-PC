const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '22510108',
    database: 'employees'  // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL');
});

// Fetch all employees
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.json(results);
        }
    });
});

app.get('/department', (req, res) => {
    db.query('SELECT * FROM departments', (err, results) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.json(results);
        }
    });
});

// Add a new employee
app.post('/employees', (req, res) => {
    const { name, position, salary } = req.body;
    const query = `INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)`;
    db.query(query, [name, position, salary], (err, result) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.json({ message: 'Employee added successfully', id: result.insertId });
        }
    });
});

// Update employee
app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { name, position, salary } = req.body;
    const query = `UPDATE employees SET name = ?, position = ?, salary = ? WHERE id = ?`;
    db.query(query, [name, position, salary, id], (err, result) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.json({ message: 'Employee updated successfully' });
        }
    });
});

// Delete employee
app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM employees WHERE id = ?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.json({ message: 'Employee deleted successfully' });
        }
    });
});

app.get('/departments', (req, res) => {
    db.query('SELECT * FROM departments', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // Get a specific department by ID
  app.get('/departments/:id', (req, res) => {
    const deptId = req.params.id;
    db.query('SELECT * FROM departments WHERE dept_id = ?', [deptId], (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    });
  });

  // Create a new department
  app.post('/departments', (req, res) => {
    const { dept_name } = req.body;
    const query = 'INSERT INTO departments (dept_name) VALUES (?)';
    db.query(query, [dept_name], (err, results) => {
      if (err) throw err;
      res.status(201).json({ dept_id: results.insertId, dept_name });
    });
  });

  // Update an existing department
  app.put('/departments/:id', (req, res) => {
    const deptId = req.params.id;
    const { dept_name } = req.body;
    const query = 'UPDATE departments SET dept_name = ? WHERE dept_id = ?';
    db.query(query, [dept_name, deptId], (err, results) => {
      if (err) throw err;
      res.json({ dept_id: deptId, dept_name });
    });
  });

  // Delete a department
  app.delete('/departments/:id', (req, res) => {
    const deptId = req.params.id;
    db.query('DELETE FROM departments WHERE dept_id = ?', [deptId], (err, results) => {
      if (err) throw err;
      res.status(204).send();
    });
  });


// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
