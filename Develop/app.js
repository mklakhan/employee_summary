const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
const employeeArray = [];
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the team member?",
                name: "name"
            },
            {
                type: "input",
                message: "What is the team member's ID?",
                name: "id"
            },
            {
                type: "input",
                message: "What is the team member's email?",
                name: "email"
            },
            {
                type: "list",
                message: "What is the team member's role?",
                name: "role",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern"
                ]
            },
            {
                type: "input",
                message: "What is your GitHub username?",
                name: "github",
                when: function(answers) {
                    if (answers.role == 'Engineer') {
                        return true;
                    } else {return false;}
                }
            },
            {
                type: "input",
                message: "What is the name of your school?",
                name: "school",
                when: function (answers) {
                    if (answers.role == 'Intern') {
                        return true;
                    } else { return false; }
                }
            },
            {
                type: "input",
                message: "What is your office number?",
                name: "officeNumber",
                when: function (answers) {
                    if (answers.role == 'Manager') {
                        return true;
                    } else { return false; }
                }
            }
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
            switch (answers.role) {
                case 'Manager':
                    console.log("in the Manager switch statement")
                    console.log(answers.officeNumber)
                    let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                    employeeArray.push(manager);
                   // console.log(manager);
                    restart();
                    break;
                case 'Engineer':
                    console.log("in the Engineer switch statement")
                    let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                    employeeArray.push(engineer);
                   // console.log(engineer);
                    restart();
                    break;
                case 'Intern':
                    console.log("in the Intern switch statement")
                    let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                    employeeArray.push(intern);
                   // console.log(intern);
                    restart();
                    break;
                default:
                    const employee = new Employee(answer.name, answers.email, answers.id)
                   // masterArray.push(employee)
                    restart();
            }
            // restart()
           // console.log(answers)
           // console.log(__dirname)
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
    }

    
function restart() {
    inquirer.prompt([{
        type: 'confirm',
        name: 'addMember',
        message: 'Would you like to add another team member?'
    }])
        .then(function (response) {
            if (response.addMember == true) {
              addEmployee()
            }
            else {
                 console.log("Finished!!")
               //  console.log(employeeArray);
                 let team = render(employeeArray)
                // console.log(team);
                createTeamHtml(team)
            }
        })
} 

function createTeamHtml(content) {
    // create dir if it doesn't exist
    console.log(__dirname)
    try {
        // first check if directory already exists
        if (!fs.existsSync(path.resolve(__dirname, "./output"))) {
            fs.mkdirSync(path.resolve(__dirname, "./output"));
            console.log("Directory is created.");
        } else {
            console.log("Directory already exists.");
        }
    } catch (err) {
        console.log(err);
    }

    fs.writeFile(path.resolve(__dirname, "./output/team.html"), content, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

addEmployee()
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
