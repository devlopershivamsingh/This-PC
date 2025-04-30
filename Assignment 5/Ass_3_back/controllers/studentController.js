const db = require("../db");

exports.viewProfile = (req, res) => {
    const userId = req.user.id;
    console.log("User ID:", userId);

    const query = "SELECT ID, name, dept_name, total_creds FROM student WHERE ID = ?";
    
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching profile:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json({ student: results[0] });
    });
};

exports.viewAvailableCourses = (req, res) => {
    const query = `
        SELECT c.course_id, c.title, s.sec_id, s.semester, s.year 
        FROM course c
        JOIN section s ON c.course_id = s.course_id`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching available courses:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.status(200).json(results);
    });
};

exports.enrollCourses = (req, res) => {
    const { id, courseId, sectionId } = req.body;
    const userId = id; // Ensure userId is properly assigned

    console.log("Enroll request:", userId, courseId, sectionId);

    const sectionQuery = "SELECT * FROM section WHERE course_id = ? AND sec_id = ?";
    
    db.query(sectionQuery, [courseId, sectionId], (err, sectionResults) => {
        if (err) {
            console.error("Error fetching section:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (sectionResults.length === 0) {
            return res.status(404).json({ error: "Section not found" });
        }

        const { semester, year } = sectionResults[0];

        const enrollmentQuery = "SELECT * FROM takes WHERE ID = ? AND course_id = ? AND sec_id = ?";
        
        db.query(enrollmentQuery, [userId, courseId, sectionId], (err, enrollmentResults) => {
            if (err) {
                console.error("Error checking enrollment:", err);
                return res.status(500).json({ error: "Database error" });
            }

            if (enrollmentResults.length > 0) {
                return res.status(400).json({ error: "Already enrolled in this course" });
            }

            const insertQuery = "INSERT INTO takes (ID, course_id, sec_id, semester, year) VALUES (?, ?, ?, ?, ?)";

            db.query(insertQuery, [userId, courseId, sectionId, semester, year], (err) => {
                if (err) {
                    console.error("Error enrolling in course:", err);
                    return res.status(500).json({ error: "Database error" });
                }

                res.status(200).json({ message: "Successfully enrolled in course" });
            });
        });
    });
};

exports.viewEnrolledCourses = (req, res) => {
    const userId = req.user.id;

    const query = `
        SELECT c.course_id, c.title, c.dept_name, c.credits, t.sec_id, t.semester, t.year
        FROM takes t
        JOIN course c ON t.course_id = c.course_id
        WHERE t.ID = ?`;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching enrolled courses:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.status(200).json(results);
    });
};

exports.viewGrades = (req, res) => {
    const userId = req.user.id;

    console.log("Fetching grades for user:", userId);

    const query = "SELECT c.title, t.grade FROM takes t JOIN course c ON t.course_id = c.course_id WHERE t.ID = ?";
    
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching grades:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "No grades found for this student" });
        }

        res.status(200).json(results);
    });
};
