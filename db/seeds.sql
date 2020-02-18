DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
 PRIMARY KEY(id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(12, 2) NOT NULL,
  department_id INT NOT NULL,
 PRIMARY KEY(id),
 INDEX (department_id),
 FOREIGN KEY (department_id)
    REFERENCES departments(id)

);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,

 PRIMARY KEY(id),
 INDEX (role_id),
 INDEX (manager_id),
 FOREIGN KEY (role_id)
   REFERENCES roles(id),
FOREIGN KEY (manager_id)
   REFERENCES roles(id)
);



INSERT INTO departments (name)
VALUES ("sales");

INSERT INTO roles (title, salary, department_id)
VALUES ("sales consultant", 65000.00, 1), ("product management", 105000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Larry", "Jones", 1, 2), ("Carla", "Jenkins",2, null);

SELECT * FROM employeesDB.departments