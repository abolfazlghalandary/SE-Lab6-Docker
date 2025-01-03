import express from 'express'
const app = express();
import bodyParser from 'body-parser'
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({  extended: true }));
import fetch from 'node-fetch';

const url = 'http://backend:3000/'

app.get('/:id', async function (req, res) {
    console.log("interface get called")
    const id = req.params.id;
    const response = await fetch(`${url}${id}`);
    const data = await response.json();
    res.end(JSON.stringify(data));
})


app.post('/', async function (req, res) {
    console.log("interface post called");
    const user = req.body;

    try {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error during fetch:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.delete('/:id', async function (req, res) {
    console.log("interface delete called")
    const id = req.params.id;
    const response = await fetch(`${url}${id}`, {method: 'DELETE'});
    const data = await response.json();
    res.json(data);
})

app.put("/:id", async function (req, res) {
    console.log("interface put called")
    const id = req.params.id;
    const user = req.body;
    try {
        const response = await fetch(`${url}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error during fetch:', error);
        res.status(500).send('Internal Server Error');
    }
})
app.listen(3000, function () {
    console.log("Express App running at http://127.0.0.1:3000/");
});
