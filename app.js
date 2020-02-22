'use strict';

const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const util = require('util');

const connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "SoccerTime253!",
    database: "employeesdb"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("I am connected")
    connection.query = util.promisify(connection.query);
    runAction();
});

function runAction() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all departments",
                "View all roles",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update employee roles",
                "exit"
            ]
        }).then(async answer => {
            switch (answer.action) {

                case "View all employees":
                    await employeeView();
                    break;
                case "View all departments":
                    await departmentView();
                    break;
                case "View all roles":
                    await roleView();
                    break;
                case "Add a department":
                    await addDepartment();
                    break;
                case "Add a role":
                    await addRole();
                    break;
                case "Add an employee":
                    await addEmployee();
                    break;
                case "Update employee roles":
                    await updateEmployee();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        }).catch(console.log)

};
async function employeeView() {

    try {
        const query = 'SELECT * FROM employee ';

        const res = await connection.query(query)
        console.table(res);
        runAction()
    } catch (err) {
        console.log(err);
    }
};

async function departmentView() {

    try {
        const query = 'SELECT * FROM departments';
        const res = await connection.query(query)
        console.table(res);
        runAction()
    } catch (err) {
        console.log(err);
    }

};
async function roleView() {

    try {
        const query = 'SELECT * FROM roles';
        const res = await connection.query(query)
        console.table(res);
        runAction()

    } catch (err) {
        console.log(err);
    }
};

async function addEmployee() {
    try {
        const res = await connection.query('SELECT * FROM departments');

        const deptValue = res.map(deptValue => ({
            name: deptValue.name,
            value: deptValue.id
        }));
        const manager = await connection.query('SELECT * FROM employee WHERE manager_id IS NULL');

        const managerValue = manager.map(managerValue => ({
            name: `${managerValue.first_name} ${managerValue.last_name}`,
            value: managerValue.id
        }));
        const answer = await inquirer.prompt([
            {
                name: "firstname",
                type: "input",
                message: "what is the employee's first name?"
            },
            {
                name: "lastname",
                type: "input",
                message: "what is the employee's last name?"
            },
            {
                name: "roleid",
                type: "list",
                choices: deptValue
            },

            {
                name: "managerid",
                type: "list",
                message: "Who is the employee's manager?",
                choices: managerValue

            }
        ]);
        await connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: answer.roleid,
                manager_id: answer.managerid
            }
        )
        runAction()
    } catch (err) {
        console.log(err);
    }
};
async function addRole() {
    try {
        const res = await connection.query('SELECT * FROM departments')

        const departmentValue = res.map(departmentValue => ({
            name: departmentValue.name,
            value: departmentValue.id
        }));
        const answer = await inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "what is the title of the role you would like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of this role?"
            },
            {
                name: "departmentid",
                type: "list",
                message: "Which department are you adding this role to?",
                choices: departmentValue
            }

        ])
        await connection.query(
            'INSERT INTO roles SET ?',
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.departmentid
            }
        )
        runAction()
    } catch (err) {
        console.log(err)

    }
};
async function addDepartment() {
    try {
        const res = await connection.query('SELECT * FROM departments');

        const departmentValue = res.map(departmentValue => ({
            name: departmentValue.name,
            value: departmentValue.id
        }));

        const answer = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Which department would you like to add?"

            }
        ]);
        await connection.query( 
            'INSERT INTO departments SET ?',
        {
            name: "name"
        }
        )
        runAction()
    } catch (err) {
        console.log(err);
    }
};
async function updateEmployee(){
    try {
        const res = await connection.query('SELECT * FROM employee');

        const roleValue = res.map(roleValue => ({
            name: roleValue.name,
            value: roleValue.id
        }));
        const answer = await inquirer.prompt([
            {
                name: "firstname",
                type: "input",
                message: "What is the employee's first name you would you like to update a role for?"
            },
            {
                name: "lastname",
                type: "input",
                message: "What is the employee's last name whose role you would like to update?"
            },
            {
                name: "dpeartmentid",
                type: "list",
                message: "Which role would you like to update this employee to?",
                choices: roleValue
            }
        ]);
        await connection.query(
            'INSERT INTO departments SET ?',

            {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: answer.departmentid
            }
        )
        runAction()
    }catch (err) {
        console.log(err)
    }
};



