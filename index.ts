import {Landscape} from "./landscape";
const landscape = new Landscape()
const port = 3000
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/', express.static('public'))

app.post('/addBuilding', (req, res) => {
    landscape.addBuilding({buildingName: req.body.buildingName, saveFlag: true})
    res.send(landscape.printWholeStructure())
})

app.delete('/removeBuilding', (req, res) => {
    landscape.removeBuilding({buildingName: req.body.buildingName, saveFlag: true})
    res.send(landscape.printWholeStructure())
})

app.delete('/removeRoom', (req, res) => {
    landscape.removeRoom(req.body)
    res.send(landscape.printWholeStructure())
})

app.delete('/removeFloor', (req, res) => {
    landscape.removeFloor(req.body)
    res.send(landscape.printWholeStructure())
})

app.delete('/removeEmployee', (req, res) => {
    landscape.removeEmployee(req.body)
    res.send(landscape.printWholeStructure())
})

app.post('/addFloor', (req, res) => {
    landscape.addFloor({buildingName: req.body.buildingName, floorName: req.body.floorName})
    res.send(landscape.printWholeStructure())
})

app.post('/addRoom', (req, res) => {
    landscape.addRoom({
        buildingName: req.body.buildingName,
        floorName: req.body.floorName,
        roomName: req.body.roomName
        , saveFlag: true
    })
    res.send(landscape.printWholeStructure())
})

app.post('/addEmployee', (req, res) => {
    landscape.addEmployee({
        buildingName: req.body.buildingName,
        floorName: req.body.floorName,
        roomName: req.body.roomName,
        employeeId: req.body.employeeId,
        employeeFirstName: req.body.employeeFirstName,
        employeeLastName: req.body.employeeLastName,
        saveFlag: true
    })
    res.send(landscape.printWholeStructure())
})

app.get('/landscape', (req, res) => {
    res.send(landscape.printWholeStructure())
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
