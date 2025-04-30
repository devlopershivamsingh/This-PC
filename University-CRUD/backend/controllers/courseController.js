const db = require("../db");

exports.createCourse = (req, res) => {
    console.log("Creating course...");
    console.log("Body:", req.body);
    const { courseId, title, deptName, credits } = req.body;

    console.log("Creating course:", courseId, title, deptName, credits);

    db.query("SELECT * FROM course WHERE course_id = ?", [courseId], (err, existingCourse) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (existingCourse.length > 0) {
            return res.status(400).json({ error: "Course already exists." });
        }

        db.query(
            "INSERT INTO course (course_id, title, dept_name, credits) VALUES (?, ?, ?, ?)",
            [courseId, title, deptName, credits],
            (err) => {
                if (err) return res.status(500).json({ error: "Course creation failed" });
                res.status(201).json({ message: "Course created successfully", courseId });
            }
        );
    });
};

exports.getCourses = (req, res) => {
    db.query("SELECT * FROM course", (err, courses) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(200).json(courses);
    });
};

exports.getCourseById = (req, res) => {
    const { courseId } = req.params;

    db.query("SELECT * FROM course WHERE course_id = ?", [courseId], (err, course) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (course.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json(course[0]);
    });
};

exports.updateCourse = (req, res) => {
    const { courseId } = req.params;
    const { title, credits } = req.body;

    db.query("SELECT * FROM course WHERE course_id = ?", [courseId], (err, course) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (course.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        db.query(
            "UPDATE course SET title = ?, credits = ? WHERE course_id = ?",
            [title, credits, courseId],
            (err) => {
                if (err) return res.status(500).json({ error: "Update failed" });
                res.status(200).json({ message: "Course updated successfully" });
            }
        );
    });
};

exports.deleteCourse = (req, res) => {
    const { courseId } = req.params;

    db.query("SELECT * FROM course WHERE course_id = ?", [courseId], (err, course) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (course.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        db.query("DELETE FROM course WHERE course_id = ?", [courseId], (err) => {
            if (err) return res.status(500).json({ error: "Deletion failed" });
            res.status(200).json({ message: "Course deleted successfully" });
        });
    });
};

exports.getSectionsByCourse = (req, res) => {
    const { courseId } = req.params;

    db.query("SELECT * FROM section WHERE course_id = ?", [courseId], (err, sections) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(200).json(sections);
    });
};

exports.getStudentsInSection = (req, res) => {
    const { courseId, secId } = req.params;

    db.query(
        "SELECT s.ID, s.name FROM student s INNER JOIN takes t ON s.ID = t.ID WHERE t.course_id = ? AND t.sec_id = ?",
        [courseId, secId],
        (err, students) => {
            if (err) return res.status(500).json({ error: "Database error" });
            res.status(200).json(students);
        }
    );
};

exports.createSection = (req, res) => {
    const { courseId, secId, semester, year, building, roomNumber, timeSlotId } = req.body;

    db.query(
        "SELECT * FROM section WHERE course_id = ? AND sec_id = ? AND semester = ? AND year = ?",
        [courseId, secId, semester, year],
        (err, existingSection) => {
            if (err) return res.status(500).json({ error: "Database error" });

            if (existingSection.length > 0) {
                return res.status(400).json({ error: "Section already exists" });
            }

            db.query(
                "INSERT INTO section (course_id, sec_id, semester, year, building, room_number, time_slot_id) VALUES (?,?,?,?,?,?,?)",
                [courseId, secId, semester, year, building, roomNumber, timeSlotId],
                (err) => {
                    if (err) return res.status(500).json({ error: "Section creation failed" });
                    res.status(201).json({ message: "Section created successfully", sectionId: secId });
                }
            );
        }
    );
};
