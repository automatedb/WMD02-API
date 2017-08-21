const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const version = '/v1';

const users = [
    {
        firstname: 'john',
        lastname: 'doe',
        email: 'john.doe@domain.tld',
    }
];

app.get('/', (req, res) => {
    res.send('Hello');
});

// Récupération de tous les users
app.get(`${version}/users`, (req, res) => {
    res.json(users);
});
// Récupération d'un user
app.get(`${version}/users/:id`, (req, res) => {
    const id = parseInt(req.params.id);

    res.json(users[id - 1]);
});
// Ajout d'un user
app.post(`${version}/users`, (req, res) => {
    users.push(req.body);
    res.json(users);
});
// Mise à jour d'un user
app.put(`${version}/users/:id`, (req, res) => {
    const id = parseInt(req.params.id);

    users[id - 1] = req.body;

    res.json(users);
});
// Suppression d'un user
app.delete(`${version}/users/:id`, (req, res) => {
    const id = parseInt(req.params.id);

    users.splice(id - 1, 1);

    console.log(users);

    res.status(204).end();
});

app.listen(3000, () => console.log('Started on 3000.'));