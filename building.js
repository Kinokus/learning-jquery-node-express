"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Building = /** @class */ (function () {
    function Building(name) {
        this.name = name;
        this.floors = {};
    }
    Building.prototype.toString = function () {
        return "" + this.name;
    };
    Building.prototype.print = function (withFloors, withRooms, withEmployees) {
        if (withFloors === void 0) { withFloors = false; }
        if (withRooms === void 0) { withRooms = false; }
        if (withEmployees === void 0) { withEmployees = false; }
        var str = this.toString();
        console.log(str);
        if (withFloors) {
            for (var _i = 0, _a = Object.entries(this.floors); _i < _a.length; _i++) {
                var _b = _a[_i], _ = _b[0], floor = _b[1];
                str = str + '\n' + floor['print'](withRooms, withEmployees);
            }
        }
        str = str + '\n';
        return str;
    };
    return Building;
}());
exports.Building = Building;
