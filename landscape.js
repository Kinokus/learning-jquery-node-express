"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var building_1 = require("./building");
var floor_1 = require("./floor");
var room_1 = require("./room");
var employee_1 = require("./employee");
var fs = require("fs");
var Landscape = /** @class */ (function () {
    function Landscape() {
        this.structure = {};
        this.indexByFirstName = {};
        this.loadDataFromJson();
    }
    Landscape.prototype.saveDataToJson = function () {
        fs.writeFileSync('landscape.json', JSON.stringify(this.structure));
    };
    Landscape.prototype.loadDataFromJson = function () {
        var rawLandScapeData = fs.readFileSync('landscape.json');
        var parsedLandScapeData = JSON.parse(rawLandScapeData.toString());
        for (var _i = 0, _a = Object.entries(parsedLandScapeData); _i < _a.length; _i++) {
            var _b = _a[_i], keyBuilding = _b[0], building = _b[1];
            this.addBuilding({ buildingName: keyBuilding, saveFlag: false });
            for (var _c = 0, _d = Object.entries(building['floors']); _c < _d.length; _c++) {
                var _e = _d[_c], keyFloor = _e[0], floor = _e[1];
                this.addFloor({ buildingName: keyBuilding, floorName: keyFloor, saveFlag: false });
                for (var _f = 0, _g = Object.entries(floor['rooms']); _f < _g.length; _f++) {
                    var _h = _g[_f], keyRoom = _h[0], room = _h[1];
                    this.addRoom({
                        buildingName: keyBuilding,
                        floorName: keyFloor,
                        roomName: keyRoom,
                        saveFlag: false
                    });
                    for (var _j = 0, _k = Object.entries(room['employees']); _j < _k.length; _j++) {
                        var _l = _k[_j], keyEmployee = _l[0], employee = _l[1];
                        this.addEmployee({
                            buildingName: keyBuilding,
                            floorName: keyFloor,
                            roomName: keyRoom,
                            employeeId: keyEmployee,
                            employeeFirstName: employee['firstName'],
                            employeeLastName: employee['lastName'],
                            saveFlag: false
                        });
                    }
                }
            }
        }
        this.printWholeStructure();
    };
    Landscape.prototype.addBuilding = function (options) {
        this.structure[options.buildingName] = this.structure[options.buildingName] || new building_1.Building(options.buildingName);
        options.saveFlag ? this.saveDataToJson() : null;
        return this.structure[options.buildingName];
    };
    Landscape.prototype.removeBuilding = function (options) {
        delete this.structure[options.buildingName];
    };
    Landscape.prototype.addFloor = function (options) {
        var building = this.addBuilding({ buildingName: options.buildingName, saveFlag: true });
        var floor = this.structure[options.buildingName].floors[options.floorName] || new floor_1.Floor(options.floorName);
        building.floors[options.floorName] = floor;
        this.structure[options.buildingName] = building;
        options.saveFlag ? this.saveDataToJson() : null;
        return floor;
    };
    Landscape.prototype.removeFloor = function (options) {
        if (!!this.structure[options.buildingName] &&
            !!this.structure[options.buildingName].floors[options.floorName]) {
            delete this.structure[options.buildingName].floors[options.floorName];
        }
        else {
            console.warn("nothing to remove");
        }
        this.saveDataToJson();
    };
    Landscape.prototype.addRoom = function (options) {
        var floor = this.addFloor(options);
        var room = this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName] || new room_1.Room(options.roomName);
        floor.rooms[options.roomName] = room;
        options.saveFlag ? this.saveDataToJson() : null;
        return room;
    };
    Landscape.prototype.removeRoom = function (options) {
        if (!!this.structure[options.buildingName] &&
            !!this.structure[options.buildingName].floors[options.floorName] &&
            !!this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName]) {
            delete this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName];
            console.log("removed successfully");
        }
        else {
            console.warn("nothing to remove");
        }
        this.saveDataToJson();
    };
    Landscape.prototype.addEmployee = function (options) {
        var room = this.addRoom({
            buildingName: options.buildingName,
            floorName: options.floorName,
            roomName: options.roomName
        });
        var employee = this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName][options.employeeId] ||
            new employee_1.Employee(options.employeeId, options.employeeFirstName, options.employeeLastName);
        room.employees[options.employeeId] = employee;
        // todo: move to func
        this.indexByFirstName[options.employeeFirstName] = this.indexByFirstName[options.employeeFirstName] || {};
        this.indexByFirstName[options.employeeFirstName][options.employeeId] = employee;
        this.indexByFirstName[options.employeeFirstName][options.employeeId].buildingName = options.buildingName;
        this.indexByFirstName[options.employeeFirstName][options.employeeId].floorName = options.floorName;
        this.indexByFirstName[options.employeeFirstName][options.employeeId].roomName = options.roomName;
        options.saveFlag ? this.saveDataToJson() : null;
        return employee;
    };
    Landscape.prototype.removeEmployee = function (options) {
        var employee;
        if (!!this.structure[options.buildingName] &&
            !!this.structure[options.buildingName].floors[options.floorName] &&
            !!this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName] &&
            !!this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName].employees[options.employeeId]) {
            employee = this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName].employees[options.employeeId];
            delete this.structure[options.buildingName].floors[options.floorName].rooms[options.roomName].employees[options.employeeId];
            delete this.indexByFirstName[employee.firstName][options.employeeId];
        }
        else {
            console.warn("nothing to remove");
        }
        this.saveDataToJson();
        return employee;
    };
    Landscape.prototype.printWholeStructure = function () {
        var str = "";
        console.log(str);
        for (var _i = 0, _a = Object.entries(this.structure); _i < _a.length; _i++) {
            var _b = _a[_i], _ = _b[0], building = _b[1];
            str = str + building['print'](true, true, true);
        }
        return str;
    };
    Landscape.prototype.printUnit = function (buildingName, floorName, roomName, empId) {
        // todo: this is quick and dirty solution !!!
        try {
            buildingName && this.structure[buildingName].print();
            floorName && this.structure[buildingName].floors[floorName].print();
            roomName && this.structure[buildingName].floors[floorName].rooms[roomName].print();
            empId && this.structure[buildingName].floors[floorName].rooms[roomName].employees[empId].print();
        }
        catch (e) {
            console.log('object not found');
        }
    };
    Landscape.prototype.printEmployeesByFirstName = function (firstName) {
        var str = "";
        console.log(str);
        for (var _i = 0, _a = Object.entries(this.indexByFirstName[firstName]); _i < _a.length; _i++) {
            var _b = _a[_i], _ = _b[0], employee = _b[1];
            str = str + '\n' + this.printUnit(employee['buildingName'], employee['floorName'], employee['roomName'], employee['id']);
        }
        return str;
    };
    return Landscape;
}());
exports.Landscape = Landscape;
