export class Room {
    private readonly name: any;
    private readonly employees: {};

    constructor(name) {
        this.name = name
        this.employees = {}
    }

    toString() {
        return `\t\t${this.name}`
    }

    print(withEmployee = false) {
        let str = this.toString()
        console.log(str);

        if (withEmployee) {
            for (const [_, emp] of Object.entries(this.employees)) {
                str = str + '\n' + emp['print']()
            }
        }
        return str
    }


}