const { createUser, getUserById, updateUser, deleteUser } = require('./crud');

var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({  extended: true }));


app.get('/:id', async function (req, res) {
    const user = await getUserById(req.params.id);
    res.end(JSON.stringify(user));
})


app.post('/', async function (req, res) {
    let user = req.body;
    user = await createUser(user.name, user.email, user.age);
    res.end(JSON.stringify(user));
})

app.delete('/:id', async function (req, res) {
    var id = req.params.id;
    const user = await deleteUser(id)
    res.end(JSON.stringify(user));
})

app.put("/:id", async function (req, res) {
    var id = req.params.id;
    let user = req.body;
    user = await updateUser(id, user.name, user.email, user.age);
    res.end(JSON.stringify(user));
})
app.listen(3000, function () {
    console.log("Express App running at http://127.0.0.1:5000/");
});
