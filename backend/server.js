const { createUser, getUserById, updateUser, deleteUser } = require('./crud');

var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({  extended: true }));


app.get('/:id', async function (req, res) {
    const user = await getUserById(req.params.id);
    res.end(JSON.stringify(user));
})


app.post('/', async function (req, res) {
    const user = req.body;
    await createUser(user.name, user.email, user.age);
    res.end(JSON.stringify(users));
})

app.delete('/:id', async function (req, res) {
    var id = "user" + req.params.id;
    await deleteUser(id)
    res.end(JSON.stringify(data));
})

app.put("/:id", async function (req, res) {
    var id = req.params.id;
    const user = req.body;
    await updateUser(id, user.name, user.email, user.age);
    res.end(JSON.stringify(users));
})

var server = app.listen(3000, function () {
    console.log("Express App running at http://127.0.0.1:5000/");
})
