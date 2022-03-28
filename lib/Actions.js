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
                this.addDepartment();
                break;
            case 'Add a role':
                this.addRole();
                break;
            case 'Add an employee':
                this.addEmployee();
                break;
            case 'Update an employee role':
                console.log(response.action);
                break;
        }
    }).catch(err => {
        console.log(err);
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
            name: 'dptName',
            message: 'What is the name of the department?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the department name.');
                    return false;
                }
            }
        }
    ]).then(response => {
        const sql = `INSERT INTO department (name)
                    VALUES (?)`;
        
        const params = response.dptName;

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(`Added department: ${params}`);
        })
    }).catch(err => {
        console.log(err);
    });
};

Actions.prototype.addRole = function() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('Please provide the role title.');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary for this role?',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log('Please provide a salary.');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'dptID',
            message: 'What is the department ID for this role?',
            validate: dptIDInput => {
                if (dptIDInput) {
                    return true;
                } else {
                    console.log('Please provide the department ID.');
                    return false;
                }
            }
        }
    ]).then(response => {
        const sql = `INSERT INTO role (title, salary, department_id)
                    VALUES (?,?,?)`

        const params = [response.title, response.salary, response.dptID];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(`Added role: ${response.title} with salary, ${response.salary} for department ID ${response.dptID}`);
        });
    }).catch(err => {
        console.log(err);
    });
};

Actions.prototype.addEmployee = function() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please provide the employee's first name.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please provide the employee's last name.");
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'roleID',
            message: "What is the employee's role ID?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please provide the employee's last name.");
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'managerID',
            message: "What is the employee's manager's ID? Press enter if none: ",
        }
    ]).then(response => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES(?,?,?,?)`;
        
        if (response.managerID === '') {
            response.managerID = NULL;
            console.log(response.managerID);
        }

        const params = [response.firstName, response.lastName, response.roleID, response.managerID];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(`Added employee: ${response.firstName} ${response.lastName} with role ID ${response.roleID} and manager ID ${response.managerID}`);
        })
    }).catch(err => {
        console.log(err);
    });
}

module.exports = Actions;