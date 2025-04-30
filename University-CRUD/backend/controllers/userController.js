const db = require("../db");

// Get all users (Admin only)
exports.getAllUsers = (req, res) => {
    console.log("Fetching all users...");

    const query = "SELECT user_id, username, email, role FROM users";
    
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching users:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log("Retrieved users:", results);
        res.status(200).json(results);
    });
};

// Get user profile (Self or Admin)
exports.getUserProfile = (req, res) => {
    console.log("Fetching user profile...");
    console.log("User:", req.user);
    console.log("Params:", req.params);
    const userId = req.params.userId ;
    console.log("User ID:", userId);

    const query = "SELECT user_id, username, email, role FROM users WHERE user_id = ?";
    
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching user profile:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            console.log("User not found");
            return res.status(404).json({ error: "User not found" });
        }

        console.log("User profile retrieved:", results[0]);
        res.status(200).json(results[0]);
    });
};

// Update user profile (Self update)
exports.updateUserProfile = (req, res) => {
    console.log("Updating user profile...");
    console.log("User:", req.user);
    const userId = req.user.id;
    const { username, email } = req.body;

    console.log("Update data:", { userId, username, email });

    const query = "UPDATE users SET username = ?, email = ? WHERE user_id = ?";

    db.query(query, [username, email, userId], (err) => {
        if (err) {
            console.error("Error updating profile:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        console.log("Profile updated successfully");
        res.status(200).json({ message: "Profile updated successfully" });
    });
};

// Delete user (Admin only)
exports.deleteUser = (req, res) => {
    console.log("Deleting user...");
    console.log("User:", req.user);
    const userId = req.params.userId;
    console.log("User ID to delete:", userId);
    const query = "DELETE FROM users WHERE user_id = ?";

    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("User deleted successfully");
        res.status(200).json({ message: "User deleted successfully" });
    });
};
