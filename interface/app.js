const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({  extended: true }));

const fetch = require('node-fetch'); 


app.get('/:id', function (req, res) {
    console.log("interface get called")
    const id = req.params.id;
    const response = await fetch(`http://localhost:3000/users/${id}`);
    res.end( JSON.stringify(user));
})


app.post('/', function (req, res) {
    console.log("interface post called")
    const user = req.body;
    const id = user.id;
    const response = await fetch(`http://localhost:3000/users/${id}`);
    res.end( JSON.stringify(users));
})

app.delete('/:id', function (req, res) {
    console.log("interface delete called")
    const id = req.params.id;
    const response = await fetch(`http://localhost:3000/users/${id}`);
    res.end( JSON.stringify(data));
})

app.put("/:id", function(req, res) {
    console.log("interface put called")
    const id = req.params.id;
    const user = req.body;
    const response = await fetch(`http://localhost:3000/users/${id}`);
    res.end( JSON.stringify(users));
})
app.listen(3000, function () {
    console.log("Express App running at http://127.0.0.1:3000/");
});
