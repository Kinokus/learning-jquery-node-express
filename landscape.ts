import {Building} from "./building";
import {Floor} from "./floor";
import {Room} from "./room";
import {Employee} from "./employee";
import * as fs from "fs";

export class Landscape {
    private readonly structure: {};
    private readonly indexByFirstName: {};

    constructor() {
        this.structure = {}
        this.indexByFirstName = {}
        this.loadDataFromJson()
    }

    saveDataToJson() {
        fs.writeFileSync('landscape.json', JSON.stringify(this.structure))
    }

    loadDataFromJson() {
        const rawLandScapeData = fs.readFileSync('landscape.json')
        const parsedLandScapeData = JSON.parse(rawLandScapeData.toString())
        for (const [keyBuilding, building] of Object.entries(parsedLandScapeData)) {
            this.addBuilding({buildingName: keyBuilding, saveFlag: false})
            for (const [keyFloor, floor] of Object.entries(building['floors'])) {
                this.addFloor({buildingName: keyBuilding, floorName: keyFloor, saveFlag: false})
                for (const [keyRoom, room] of Object.entries(floor['rooms'])) {
                    this.addRoom({
                            buildingName: keyBuilding,
                            floorName: keyFloor,
                            roomName: keyRoom,
                            saveFlag: false
                        }
                    )
                    for (const [keyEmployee, employee] of Object.entries(room['employees'])) {
                        this.addEmployee({
                            buildingName: keyBuilding,
                            floorName: keyFloor,
                            roomName: keyRoom,
                            employeeId: keyEmployee,
                            employeeFirstName: employee['firstName'],
                            employeeLastName: employee['lastName'],
                            saveFlag: false
                        })

                    }
                }
            }
        }
        this.printWholeStructure()
    }

    addBuilding(options) {
        this.structure[options.buildingName] = this.structure[options.buildingName] || new Building(options.buildingName)
        options.saveFlag ? this.saveDataToJson() : null
        return this.structure[options.buildingName]
    }

    removeBuilding(options: { buildingName: any; saveFlag: boolean }) {
        delete this.structure[options.buildingName]
    }

    addFloor(options) {
        const building = this.addBuilding({buildingName: options.buildingName, saveFlag: true})
        const floor = this.structure[options.buildingName].floors[options.floorName] || new Floor(options.floorName)
        building.floors[options.floorName] = floor
        this.structure[options.buildingName] = building
        options.saveFlag ? this.saveDataToJson() : null
        return floor

    }

    removeFloor(options) {
        if (
            !!this.structure[options.buildingName] &&
            !!this.structure[options.buildingName].floors[options.floorName]
        ) {
            delete this.structure[options.buildingName].floors[options.floorName]
        } else {
            console.warn("nothing to remove");
        }
        this.saveDataToJson()

    }

    addRoom(options) {
        const floor = this.addFloor(options)
        const room = this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName] || new Room(options.roomName)
        floor.rooms[options.roomName] = room
        options.saveFlag ? this.saveDataToJson() : null
        return room
    }

    removeRoom(options) {
        if (
            !!this.structure[options.buildingName] &&
            !!this.structure[options.buildingName].floors[options.floorName] &&
            !!this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName]
        ) {
            delete this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName]
            console.log("removed successfully");
        } else {
            console.warn("nothing to remove");
        }
        this.saveDataToJson()

    }

    addEmployee(options) {
        const room = this.addRoom({
            buildingName: options.buildingName,
            floorName: options.floorName,
            roomName: options.roomName
        })
        const employee =
            this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName][options.employeeId] ||
            new Employee(options.employeeId, options.employeeFirstName, options.employeeLastName)

        room.employees[options.employeeId] = employee


        // todo: move to func
        this.indexByFirstName[options.employeeFirstName] = this.indexByFirstName[options.employeeFirstName] || {}
        this.indexByFirstName[options.employeeFirstName][options.employeeId] = employee
        this.indexByFirstName[options.employeeFirstName][options.employeeId].buildingName = options.buildingName
        this.indexByFirstName[options.employeeFirstName][options.employeeId].floorName = options.floorName
        this.indexByFirstName[options.employeeFirstName][options.employeeId].roomName = options.roomName
        options.saveFlag ? this.saveDataToJson() : null
        return employee
    }

    removeEmployee(options) {
        let employee
        if (
            !!this.structure[options.buildingName] &&
            !!this.structure[options.buildingName].floors[options.floorName] &&
            !!this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName] &&
            !!this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName].employees[options.employeeId]
        ) {
            employee = this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName].employees[options.employeeId]
            delete this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName].employees[options.employeeId]
            delete this.indexByFirstName[employee.firstName][options.employeeId]
        } else {
            console.warn("nothing to remove");
        }
        this.saveDataToJson()
        return employee
    }

    printWholeStructure() {
        let str = ""
        console.log(str);
        for (const [_, building] of Object.entries(this.structure)) {
            str = str + building['print'](true, true, true)
        }
        return str
    }

    printUnit(buildingName, floorName, roomName, empId) {
        // todo: this is quick and dirty solution !!!
        try {
            buildingName && this.structure[buildingName].print();
            floorName && this.structure[buildingName].floors[floorName].print();
            roomName && this.structure[buildingName].floors[floorName].rooms[roomName].print();
            empId && this.structure[buildingName].floors[floorName].rooms[roomName].employees[empId].print();
        } catch (e) {
            console.log('object not found');
        }
    }

    printEmployeesByFirstName(firstName) {
        let str = ""
        console.log(str);
        for (const [_, employee] of Object.entries(this.indexByFirstName[firstName])) {
            str = str + '\n' + this.printUnit(employee['buildingName'], employee['floorName'], employee['roomName'], employee['id'])
        }
        return str
    }

}