export class Building {
    private readonly name: any;
    private readonly floors: {};

    constructor(name) {
        this.name = name
        this.floors = {}
    }

    toString() {
        return `${this.name}`
    }

    print(withFloors = false, withRooms = false, withEmployees = false) {
        let str = this.toString()
        console.log(str);
        if (withFloors) {
            for (const [_, floor] of Object.entries(this.floors)) {
                str = str + '\n' + floor['print'](withRooms, withEmployees)
            }
        }
        str = str + '\n'
        return str
    }


}