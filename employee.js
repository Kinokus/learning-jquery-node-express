"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Employee = /** @class */ (function () {
    function Employee(id, firstName, lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Employee.prototype.toString = function () {
        return "\t\t\t" + this.id + "\t" + this.firstName + "\t" + this.lastName;
    };
    Employee.prototype.print = function () {
        console.log(this.toString());
        return this.toString();
    };
    return Employee;
}());
exports.Employee = Employee;
