const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Ensure this is correctly configured

exports.register = async (req, res) => {
    try {
        console.log("API Called - Starting registration process", req.body);
        const { username, email, password, role } = req.body;

        if (!['admin', 'student', 'instructor'].includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        }

        console.log("Checking for existing user...");
        db.query(
            "SELECT * FROM users WHERE username = ? OR email = ?", 
            [username, email], 
            async (err, existingUsers) => {
                if (err) {
                    console.error("Database query error:", err);
                    return res.status(500).json({ error: "Database error" });
                }

                if (existingUsers.length > 0) {
                    console.log("Username or email already exists");
                    return res.status(400).json({ error: "Username or email already exists" });
                }

                console.log("Hashing password...");
                const hashedPassword = await bcrypt.hash(password, 10);

                console.log("Inserting new user into database...");
                db.query(
                    "INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)",
                    [username, email, hashedPassword, role],
                    (err, result) => {
                        if (err) {
                            console.error("User insertion failed:", err);
                            return res.status(500).json({ error: "User registration failed" });
                        }

                        console.log(`User registered with ID: ${result.insertId}`);
                        res.status(201).json({ message: "User registered successfully", userId: result.insertId });
                    }
                );
            }
        );
    } catch (err) {
        console.error("Error in register function:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.login = async (req, res) => {
    try {
        console.log("Login process started", req.body);
        const { username, password } = req.body;

        console.log("Querying database for user...");
        db.query(
            "SELECT * FROM users WHERE username = ?", 
            [username], 
            async (err, users) => {
                if (err) {
                    console.error("Database query error:", err);
                    return res.status(500).json({ error: "Database error" });
                }

                if (users.length === 0) {
                    console.log("No user found");
                    return res.status(401).json({ error: "Invalid credentials" });
                }

                const user = users[0];

                console.log("Comparing passwords...");
                const match = await bcrypt.compare(password, user.password_hash);
                if (!match) {
                    return res.status(401).json({ error: "Invalid credentials" });
                }

                console.log("Generating JWT token...");
                const token = jwt.sign(
                    { id: user.user_id, role: user.role },
                    process.env.SECRET_KEY,
                    { expiresIn: '24h' }
                );

                console.log("Login successful");
                res.status(200).json({
                    message: "Login successful",
                    token: token,
                    user_id: user.user_id,
                    role: user.role,
                });
            }
        );
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Error logging in user" });
    }
};

exports.profile = (req, res) => {
    console.log("Profile route accessed");

    try {
        console.log("Decoded JWT Payload:", req.user);
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ error: "User ID is missing in token" });
        }

        console.log("Querying database for user profile...");
        db.query(
            "SELECT user_id, username, email, role FROM users WHERE user_id = ?", 
            [userId], 
            (err, users) => {
                if (err) {
                    console.error("Database query error:", err);
                    return res.status(500).json({ error: "Error fetching profile" });
                }

                if (users.length === 0) {
                    console.log("User not found");
                    return res.status(404).json({ error: "User not found" });
                }

                console.log("Profile retrieved successfully");
                res.status(200).json(users[0]);
            }
        );
    } catch (err) {
        console.error("Profile fetch error:", err);
        res.status(500).json({ error: "Error fetching profile" });
    }
};
