const inquirer = require("inquirer");
const figlet = require("figlet");
const consoleTable = require("console.table");
const mysql = require("mysql");


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_database"
});

connection.connect(function(err) {
 
  if (err) {
    throw err;
    
  }
});

function header() {
  figlet("Employee_Management", function(err, data) {
    if (err) {
      console.log("error");
      console.dir(err);
      return;
    }
    console.log(data);
  });
}


function employeeTracker() {

  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add a Department",
        "Add an Employee",
        "Add a Role",
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "View employees by Manager",
        "Update an Employee's Role",
        "Update an Employee's Manager",
        "Delete an Employee"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Add a Department":
          addDepartment();
          break;

        case "Add a Employee":
          addEmployee();
          break;
        case "Add a Role":
          addRole();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "View employees by Manager":
          viewEmployeesByManager();
          break;
        case "Update an Employee's Role":
          updateEmployees();
          break;
        case "Update an Employee's Manager":
          updateEmployeeManager();
          break;
        case "Delete an Employee":
          deleteEmployee();
          break;
      }
    });
}
function addDepartment() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "Please type a name for the department"
    })
    .then(function(answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name
        },
        function(err) {
          if (err) throw err;
          console.log("The department has now been created");
          employeeTracker();
        }
      );
    });
}
function addEmployee() {
  inquirer
    .prompt(
      {
        name: "first_name",
        type: "input",
        message: "Please type a name for the new Employee"
      },
      {
        name: "last_name",
        type: "input",
        message: "Please type a name for the new Employee"
      },
      {
        name: "role",
        type: "input",
        message: "Please type the role for the new Employee (role ID"
      }
    )
    .then(function(answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role
        },
        function(err) {
          if (err) throw err;
          console.log("Your new Employee has now been created");
          employeeTracker();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Please type a name for the new Role"
      },

      {
        name: "salary",
        type: "input",
        message: "Please type the annual salary for the new Role"
      },

      {
        name: "department",
        type: "input",
        message: "Please type the department the role belongs to (DepartmentID)"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employee_role SET ?",
        {
          title: answer.name,
          salary: answer.salary,
          department_id: answer.department
        },
        function(err) {
          if (err) throw err;
          console.log("A new Role has now been created");
          employeeTracker();
        }
      );
    });
}

function viewDepartments() {
  connection.query("select * from department", function(err, result) {
    if (err) throw err;
    console.table(result);
    employeeTracker();
  });
}

function viewRoles() {
  connection.query("select * from employee_role", function(err, result) {
    if (err) throw err;
    console.table(result);
    employeeTracker();
  });
}

function viewEmployees() {
  connection.query("select * from employee", function(err, result) {
    if (err) throw err;
    console.table(result);
    employeeTracker();
  });
}

function updateEmployees() {
  inquirer
    .prompt([
      {
        name: "employee",
        type: "input",
        message:
          "Which employee's role would you like to update? (Please enter the employee ID)"
      },
      {
        name: "employee_role",
        type: "input",
        message: "What is the employee's new role? (Please enter the role ID)"
      }
    ])
    .then(function(answer) {
      connection.query(
        "UPDATE employee SET ? where ?",
        [
          {
            role_id: answer.employee
          },
          {
            id: answer.employee_role
          }
        ],
        function(err) {
          if (err) throw err;
          console.log("The employee's role has been updated successfully!");
          employeeTracker();
        }
      );
    });
}
function updateEmployeeManager() {
  inquirer
    .prompt([
      {
        name: "employee",
        type: "input",
        message:
          "Which employee's manager would you like to update? (Please enter the employee ID)"
      },
      {
        name: "manager",
        type: "input",
        message: "What is the manager's employee ID?"
      }
    ])
    .then(function(answer) {
      connection.query(
        "UPDATE employee SET ? where ?",
        [
           {
            id: answer.employee
          },
          {
            manager_id: answer.manager
          }
         
        ],
        function(err) {
          if (err) throw err;
          console.log("The employee's manager has been updated successfully!");
          employeeTracker();
        }
      );
    });
}
function viewEmployeesByManager() {
  inquirer
    .prompt({
      name: "manager",
      type: "input",
      message:
        "Which manager's employees would you like to view? (Please enter the manager's employee ID)"
    })
    .then(function(answer) {
      connection.query(
        "select * from employee where ?",
        {
          manager_id: answer.manager
        },
        function(err, result) {
          if (err) throw err;
          console.table(result);
          employeeTracker();
        }
      );
    });
}

function deleteEmployee() {
  inquirer
    .prompt({
      name: "employee",
      type: "input",
      message:
        "Which employee would you like to delete? (Please enter the employee's ID)"
    })
    .then(function(answer) {
      connection.query(
        "DELETE from employee where ?",
        {
          id: answer.employee
        },
        function(err, result) {
          if (err) throw err;
          console.log("Employee has been deleted successfully!");
          employeeTracker();
        }
      );
    });
}

employeeTracker();


