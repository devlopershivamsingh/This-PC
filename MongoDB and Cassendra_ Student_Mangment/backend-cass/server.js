const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cassandra = require('cassandra-driver');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
const PORT = process.env.PORT || 5000;

// const authProvider = new cassandra.auth.PlainTextAuthProvider(
//   'rZFkioWXIsZFZUviZfZqRmbG', 
//   'mk1v7jNepp.+a1dt,6lUkMNssU2Gjx9lfvW6HBJ90LP5HkQ9thiQDL7l9i,pac9KoTZxDS-InqAyHTkjDZN8IUceZU3MBRgtFbawdv2P1XGQXuHJZTZ1uonB6s80e9I9' 
// );

// const client = new cassandra.Client({
//   cloud: { secureConnectBundle: './secure-connect-22510039.zip' }, 
//   keyspace: 'ads',
//   authProvider
// });

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'], 
  localDataCenter: 'datacenter1',
  keyspace: 'ads' 
});

// Connect to Cassandra
client.connect()
  .then(() => {
    console.log('Connected to Cassandra');
    return client.execute('SELECT * FROM users');
  })
  .then(result => {
    console.log('Data from users table:', result.rows);
  })
  .catch(err => console.error('Error connecting to Cassandra', err));

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    "_id" uuid PRIMARY KEY,
    name text,
    email text,
    prn text,
    phone text,
    role text
  )
`;

client.execute(createTableQuery)
  .then(() => console.log('Table created (if not exists)'))
  .catch(err => console.error('Error creating table:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoints
app.post("/api/users", async (req, res) => {
  try {
    const _id = uuidv4();
    const { name, email, prn, phone, role } = req.body;

    const query = 'INSERT INTO users ("_id", name, email, prn, phone, role) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [_id, name, email, prn, phone, role];

    await client.execute(query, params, { prepare: true });
    res.status(201).json({ message: "User added successfully!" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user", details: error.message });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const result = await client.execute(query);
    const users = result.rows;
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users", details: error.message });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, prn, phone, role } = req.body;

    // First check if user exists
    const checkQuery = 'SELECT * FROM users WHERE "_id" = ?';
    const checkResult = await client.execute(checkQuery, [id], { prepare: true });

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const query = 'UPDATE users SET name = ?, email = ?, prn = ?, phone = ?, role = ? WHERE "_id" = ?';
    const params = [name, email, prn, phone, role, id];

    await client.execute(query, params, { prepare: true });

    // Fetch updated user
    const updatedUser = (await client.execute(checkQuery, [id], { prepare: true })).rows[0];
    res.status(200).json({ message: "User updated successfully!", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user", details: error.message });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // First check if user exists
    const checkQuery = 'SELECT * FROM users WHERE "_id" = ?';
    const checkResult = await client.execute(checkQuery, [id], { prepare: true });

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const query = 'DELETE FROM users WHERE "_id" = ?';
    await client.execute(query, [id], { prepare: true });

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user", details: error.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown
process.on('SIGINT', async () => {
  await client.shutdown();
  process.exit(0);
});
