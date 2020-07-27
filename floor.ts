export class Floor {
    private readonly name: any;
    private readonly rooms: {};

    constructor(name) {
        this.name = name
        this.rooms = {}
    }

    toString() {
        return `\t${this.name}`
    }

    print(withRooms = false, withEmployees = false) {
        let str = this.toString()
        console.log(str);
        if (withRooms) {
            for (const [_, room] of Object.entries(this.rooms)) {
                str = str + '\n' + room['print'](withEmployees)
            }
        }
        return str
    }
}