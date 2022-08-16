const express = require('express');
const { sequelize, Users, Products, Orders, Categories, OrderProducts } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const { registerValid, loginValid } = require('./app_valid.js');

const app = express();

var corsOptions = {
    origin: 'http://127.0.0.1:8080',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.post('/register', (req, res) => {
    const valid = registerValid.validate(req.body);

    if(!valid.error){
        const obj = {
            name: req.body.name,
            email: req.body.email,
            admin: req.body.admin,
            moderator: req.body.moderator,
            password: bcrypt.hashSync(req.body.password, 10),
            adress: req.body.adress,
            postalCode: req.body.postalCode,
            city: req.body.city,
            country: req.body.country
        };

        Users.create(obj).then( rows => {
            
            const usr = {
                userID: rows.id,
                user: rows.name
            };

            const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
            
            res.json({ token: token });
            console.log(token);

        }).catch( err => res.status(500).json(err) );
    } else {
        res.status(422).json({ msg: 'Error: ' + valid.error.message});
    }
});

app.post('/login', (req, res) => {
    const valid = loginValid.validate(req.body);

    if(!valid.error){
        Users.findOne({ where: { name: req.body.name } })
            .then( usr => {

                if (bcrypt.compareSync(req.body.password, usr.password)) {
                    const obj = {
                        userID: usr.id,
                        user: usr.name
                    };
            
                    const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                    console.log(token);
                    res.json({ token: token });
                } else {
                    res.status(400).json({ msg: "Invalid credentials" });
                }
            })
            .catch( err => res.status(500).json({ msg: "Invalid credentials" }) );
    } else {
        res.status(422).json({ msg: 'Error: ' + valid.error.message});
    }
});

app.listen({ port: 9000 }, async () => {
    await sequelize.authenticate();
});