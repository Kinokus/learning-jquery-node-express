"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Room = /** @class */ (function () {
    function Room(name) {
        this.name = name;
        this.employees = {};
    }
    Room.prototype.toString = function () {
        return "\t\t" + this.name;
    };
    Room.prototype.print = function (withEmployee) {
        if (withEmployee === void 0) { withEmployee = false; }
        var str = this.toString();
        console.log(str);
        if (withEmployee) {
            for (var _i = 0, _a = Object.entries(this.employees); _i < _a.length; _i++) {
                var _b = _a[_i], _ = _b[0], emp = _b[1];
                str = str + '\n' + emp['print']();
            }
        }
        return str;
    };
    return Room;
}());
exports.Room = Room;
