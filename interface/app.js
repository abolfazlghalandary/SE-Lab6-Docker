const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({  extended: true }));

const fetch = require('node-fetch'); 


app.get('/:id', async function (req, res) {
    console.log("interface get called")
    const id = req.params.id;
    const response = await fetch(`http://backend:5000/${id}`);
    res.end(1);
})


app.post('/', async function (req, res) {
    console.log("interface post called")
    const user = req.body;
    const id = user.id;
    // const response = await fetch(`http://localhost:3000/users/${id}`);
    res.end(1);
})

app.delete('/:id', async function (req, res) {
    console.log("interface delete called")
    const id = req.params.id;
    // const response = await fetch(`http://localhost:3000/users/${id}`);
    res.end(1);
})

app.put("/:id", async function (req, res) {
    console.log("interface put called")
    const id = req.params.id;
    const user = req.body;
    // const response = await fetch(`http://localhost:3000/users/${id}`);
    res.end(JSON.stringify(1));
})
app.listen(3000, function () {
    console.log("Express App running at http://127.0.0.1:3000/");
});
