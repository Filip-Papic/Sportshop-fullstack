const { sequelize, Users, Products, Orders, Categories } = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true })); 


route.post('/admin/categories', (req, res) => {
    Categories.create({ name: req.body.name })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/admin/categories/:id', (req, res) => { //visak
    Categories.create({ name: req.body.name })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

module.exports = route;