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
                case "Update emmployee roles":
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
        ])
        await connection.query (
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
}






  