'use strict';

const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({

    host: "localhost",
    port: 3000,
    user: "root",
    password: "SoccerTime253!",
    database: "employeesDB"
});

connection.connect(function (err) {
    if (err) throw err;
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
        })

        .then(answer => {
            switch (answer.action) {

                case "View all employees":
                    employeeView();
                    break;
                case "View all departments":
                    departmentView();
                    break;
                case "View all roles":
                    roleView();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update emmployee roles":
                    updateEmployee();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
        
        function employeeView(){
        
        const query = 'SELECT * FROM employees ';

        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);

        })


    }
};





  // function artistSearch() {
  //   inquirer
  //     .prompt({
  //       name: "artist",
  //       type: "input",
  //       message: "What artist would you like to search for?"
  //     })
  //     .then(function(answer) {
  //       var query = "SELECT position, song, year FROM top5000 WHERE ?";
  //       connection.query(query, { artist: answer.artist }, function(err, res) {
  //         if (err) throw err;
  //         for (var i = 0; i < res.length; i++) {
  //           console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
  //         }
  //         runSearch();
  //       });
  //     });
  // }