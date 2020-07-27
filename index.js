"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var landscape_1 = require("./landscape");
var landscape = new landscape_1.Landscape();
var port = 3000;
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/', express.static('public'));
app.post('/addBuilding', function (req, res) {
    landscape.addBuilding({ buildingName: req.body.buildingName, saveFlag: true });
    res.send(landscape.printWholeStructure());
});
app.delete('/removeBuilding', function (req, res) {
    landscape.removeBuilding({ buildingName: req.body.buildingName, saveFlag: true });
    res.send(landscape.printWholeStructure());
});
app.delete('/removeRoom', function (req, res) {
    landscape.removeRoom(req.body);
    res.send(landscape.printWholeStructure());
});
app.delete('/removeFloor', function (req, res) {
    landscape.removeFloor(req.body);
    res.send(landscape.printWholeStructure());
});
app.delete('/removeEmployee', function (req, res) {
    landscape.removeEmployee(req.body);
    res.send(landscape.printWholeStructure());
});
app.post('/addFloor', function (req, res) {
    landscape.addFloor({ buildingName: req.body.buildingName, floorName: req.body.floorName });
    res.send(landscape.printWholeStructure());
});
app.post('/addRoom', function (req, res) {
    landscape.addRoom({
        buildingName: req.body.buildingName,
        floorName: req.body.floorName,
        roomName: req.body.roomName,
        saveFlag: true
    });
    res.send(landscape.printWholeStructure());
});
app.post('/addEmployee', function (req, res) {
    landscape.addEmployee({
        buildingName: req.body.buildingName,
        floorName: req.body.floorName,
        roomName: req.body.roomName,
        employeeId: req.body.employeeId,
        employeeFirstName: req.body.employeeFirstName,
        employeeLastName: req.body.employeeLastName,
        saveFlag: true
    });
    res.send(landscape.printWholeStructure());
});
app.get('/landscape', function (req, res) {
    res.send(landscape.printWholeStructure());
});
app.listen(port, function () { return console.log("Example app listening at http://localhost:" + port); });
