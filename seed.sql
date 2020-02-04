USE employee_database;

INSERT INTO department
    (id, name)
VALUES
    (NULL, "Human Resources"),
    (NULL, "Operations"),
    (NULL, "Finance"),
    (NULL, "Marketing"),
    (NULL, "Sales"),
    (NULL, "Information Technology");

INSERT INTO employee_role
    (id, department_id, title, salary)
VALUES
    (NULL, 1, "HR Lead", 60000),
    (NULL, 1, "HR Advisor", 2000),
    (NULL, 2, "Operations Consulant", 70000),
    (NULL, 2, "Finance Analyst", 34000),
    (NULL, 3, "Internal Auditor", 70000),
    (NULL, 3, "Accountant", 56000),
    (NULL, 4, "Events Officer", 70000),
    (NULL, 4, "Marketing Lead", 40000),
    (NULL, 5, "Solution Architect", 80000),
    (NULL, 5, "Sales Advisor", 40000),
    (NULL, 6, "Junior Developer", 25000),
   

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (NULL, "Seaira", "Dar", 6, NULL),
    (NULL, "Stacey", "Gunn", 7, 1),
    (NULL, "Mike", "Carter", 2, 10),
    (NULL, "Jack ", "Stand", 3, NULL),
    (NULL, "Owen", "Hampton", 8, 2),
    (NULL, "Jo", "King", 3, 5),
    (NULL, "Matt", "Tress", 7, NULL),
    (NULL, "Sonny", "Day", 2, NULL),
    (NULL, "Adam", "Zapar", 9, 3),
    (NULL, "Jack", "Pott", 1, NULL),
    (NULL, "Charity", "Case", 4, NULL)


