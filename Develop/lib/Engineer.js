// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require ('./Employee')

class Engineer extends Employee {
    constructor (name, id, email, role, gitHub){
        super(name, id, email, role);
        this.name = name; 
        this.id = id; 
        this.email = email;
        this.role = role;
        this.gitHub = gitHub;
    }

    getGithub (){
        return this.gitHub;
    }
}

module.exports = Engineer