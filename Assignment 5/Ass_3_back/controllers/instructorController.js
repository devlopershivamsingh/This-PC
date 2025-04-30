const db = require("../db");

exports.assignedCourses = (req, res) => {
    const instructorId = req.user.id;
    console.log("Instructor ID:", instructorId);

    const query = `
        SELECT t.course_id, t.sec_id, t.semester, t.year 
        FROM teaches t 
        JOIN course c ON t.course_id = c.course_id 
        WHERE t.ID = ?`;

    db.query(query, [instructorId], (err, courses) => {
        if (err) {
            console.error("Error fetching assigned courses:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(courses);
    });
};

exports.courseStudents = (req, res) => {
    const { courseId, secId, semester, year } = req.body;

    const query = `
        SELECT s.ID, s.name, t.grade 
        FROM takes t 
        JOIN student s ON t.ID = s.ID 
        WHERE t.course_id = ? AND t.sec_id = ? AND t.semester = ? AND t.year = ?`;

    db.query(query, [courseId, secId, semester, year], (err, students) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(students);
    });
};

exports.submitGrades = (req, res) => {
    const { studentId, courseId, secId, grade } = req.body;

    const query = `
        UPDATE takes 
        SET grade = ? 
        WHERE ID = ? AND course_id = ? AND sec_id = ?`;

    db.query(query, [grade, studentId, courseId, secId], (err, result) => {
        if (err) {
            console.error("Error submitting grade:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Grade submitted successfully!" });
    });
};

exports.getAdvisors = (req, res) => {
    const instructorId = req.user.id;

    const query = `
        SELECT s.ID, s.name, s.dept_name 
        FROM advisor a 
        JOIN student s ON a.s_ID = s.ID 
        WHERE a.i_ID = ?`;

    db.query(query, [instructorId], (err, advisors) => {
        if (err) {
            console.error("Error fetching advisors:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(advisors);
    });
};
