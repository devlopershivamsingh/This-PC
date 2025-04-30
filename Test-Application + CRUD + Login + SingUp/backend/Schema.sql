use employees;
drop table employees;
	CREATE TABLE employees (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(50) NOT NULL,
		position VARCHAR(50),
		salary DECIMAL(10,2)
	);
	CREATE TABLE departments (
		dept_id INT AUTO_INCREMENT PRIMARY KEY,
		dept_name VARCHAR(50) NOT NULL
	);

INSERT INTO departments (dept_name) VALUES
('Human Resources'),
('Engineering'),
('Design');
select * from departments;
select * from employees;
INSERT INTO employees (name, position, salary) VALUES
('Alice', 'Manager', 60000.00),
('Bob', 'Developer', 50000.00),
('Charlie', 'Designer', 45000.00);


