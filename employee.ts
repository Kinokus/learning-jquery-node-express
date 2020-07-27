export class Employee {
    private readonly id: any;
    private readonly firstName: any;
    private readonly lastName: any;

    constructor(id, firstName, lastName) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
    }

    toString() {
        return `\t\t\t${this.id}\t${this.firstName}\t${this.lastName}`
    }

    print() {
        console.log(this.toString());
        return this.toString()
    }

}