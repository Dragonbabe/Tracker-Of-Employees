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
VALUES ("Feed"), ("Training"), ("Sales"), ("Breeding"), ("Industrial Psychology");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Farm Hand", 605000.00, 1),
("Supplier", 65000.00, 1),
 ("Rider", 60000.02, 2), ("Groom", 43000.88, 2),
 ("Accountant", 32000.00, 3), ("Sales Consultant", 62999.99, 3),
 ("Veterinarian", 200999.00, 4), ("Bloodlines Expert", 400000.99, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carla", "Jenkins", 1, null), ("Dionne", "Anderson", 1, null), ("Larry", "Jones", 1, 1), ("Michal", "Hughes", 2, 1), ("Henrietta", "Mill", 2, 1), 
("Jane", "Jones", 3, 1), ("Alameda", "Pederson", 3, 1), ("Gretchen", "Green", 4, 1), ("Rolf", "Carle", 4, 1);

SELECT * FROM employeesDB.departments