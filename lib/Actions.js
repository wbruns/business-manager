const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('../db/connection');

function Actions() {

}

Actions.prototype.chooseAction = function() {
    inquirer.prompt([
        {
            // prompt user for an action
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        }
    ]).then(response => {
        switch (response.action) {
            case 'View all departments':
                this.viewDepartment();
                console.log('--------------------------------------------------');
                break;
            case 'View all roles':
                this.viewRole();
                console.log('--------------------------------------------------');
                break;
            case 'View all employees':
                this.viewEmployee();
                console.log('--------------------------------------------------');
                break;
            case 'Add a department':
                console.log(response.action);
                break;
            case 'Add a role':
                console.log(response.action);
                break;
            case 'Add an employee':
                console.log(response.action);
                break;
            case 'Update an employee role':
                console.log(response.action);
                break;
        }
    });
};

Actions.prototype.viewDepartment = function() {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
    });
};

Actions.prototype.viewRole = function() {
    const sql = `SELECT role.id, role.title, role.salary, department.name
                AS department_name
                FROM role
                LEFT JOIN department
                ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
    });
};

Actions.prototype.viewEmployee = function() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name,
                role.title AS role_title, role.salary AS salary, 
                employee.manager_id AS manager_name
                FROM employee
                INNER JOIN role ON role.id = employee.role_id
                `;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
    });
};

Actions.prototype.addDepartment = function() {
    inquirer.prompt([
        {
            type: 'input',
            dptName: 'dptName',
            message: 'What is the name of the department?',
            validate: dptNameInput => {
                if (dptNameInput) {
                    return true;
                } else {
                    console.log('Please enter the department name.');
                    return false;
                }
            }
        }
    ]).then(response => {
        console.log(response);
    })
}

module.exports = Actions;