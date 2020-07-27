"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Floor = /** @class */ (function () {
    function Floor(name) {
        this.name = name;
        this.rooms = {};
    }
    Floor.prototype.toString = function () {
        return "\t" + this.name;
    };
    Floor.prototype.print = function (withRooms, withEmployees) {
        if (withRooms === void 0) { withRooms = false; }
        if (withEmployees === void 0) { withEmployees = false; }
        var str = this.toString();
        console.log(str);
        if (withRooms) {
            for (var _i = 0, _a = Object.entries(this.rooms); _i < _a.length; _i++) {
                var _b = _a[_i], _ = _b[0], room = _b[1];
                str = str + '\n' + room['print'](withEmployees);
            }
        }
        return str;
    };
    return Floor;
}());
exports.Floor = Floor;
