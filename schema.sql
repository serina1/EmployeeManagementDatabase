DROP DATABASE IF EXISTS employee_database;
CREATE DATABASE employee_database;
USE employee_database;

DROP TABLE IF EXISTS department;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee_role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee(
	id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30),
	last_name VARCHAR(30),
	role_id INT (11),
	manager_id INT(11),
	 PRIMARY KEY (id),
		FOREIGN KEY(role_id) REFERENCES employee_role(id),
		FOREIGN KEY(manager_id) REFERENCES employee_role(id)
	  
);

