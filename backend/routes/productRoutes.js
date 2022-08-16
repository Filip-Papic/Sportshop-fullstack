const express = require('express');
const { sequelize, Users, Products, Orders, Categories, OrderProducts } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {idValid, productValid} = require('../app_valid.js');
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true })); 

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null)
        return res.status(401).json({ msg: err });
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err){ 
            return res.status(403).json({ msg: err });
        }
        req.user = user;
    
        next();
    });
}

//route.use(authToken);


route.get('/products', (req, res) => {
    Products.findAll({include: ['category']}) 
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/products/:id', (req, res) => {
    const valid = idValid.validate(req.params);
    if(!valid.error){
        Products.findOne({ where: { id: req.params.id }})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );  
    } else {
        res.status(422).json({msg: 'Error: ' + valid.error.message });
    }
});

route.post('/products', authToken, (req, res) => {
    Users.findOne({ where: { id: req.user.userID } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                const valid = productValid.validate(req.body);
                if(!valid.error){
                    Products.create({ id: req.body.id,
                        name: req.body.name,
                        categoryID: req.body.categoryID,
                        orderID: req.body.orderID,
                        manufacturer: req.body.manufacturer,
                        price: req.body.price,
                        description: req.body.description,
                        size: req.body.size,
                        quantityStock: req.body.quantityStock
                    })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json({msg: 'Enter all fields'}) );
                } else {
                    res.status(422).json({msg: 'Error: ' + valid.error.message });
                }
            } else {
                res.status(403).json({ msg: "Not admin or moderator"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.put('/products/:id', authToken, (req, res) => {   
    Users.findOne({ where: { id: req.user.userID } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                const valid = productValid.validate(req.body);
                const validID = idValid.validate(req.params);
                if (valid.error){
                    res.status(422).json({msg: 'Error: ' + valid.error.message });
                }else if (validID.error){
                    res.status(422).json({msg: 'Error: ' + validID.error.message });
                } else {
                    Products.findOne({ where: { id: req.params.id } })
                        .then( product => {
                            product.name = req.body.name;
                            product.categoryID = req.body.categoryID;
                            product.manufacturer = req.body.manufacturer;
                            product.price = req.body.price;
                            product.description = req.body.description;
                            product.size = req.body.size;
                            product.quantityStock = req.body.quantityStock;

                            product.save()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                        })
                        .catch( err => res.status(500).json(err) );
                    }
            } else {
                res.status(403).json({ msg: "Not admin or moderator"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.delete('/products/:id', authToken, (req, res) => { 
    Users.findOne({ where: { id: req.user.userID } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                const valid = idValid.validate(req.params);
                if(!valid.error){
                    Products.findOne({ where: { id: req.params.id } })
                        .then( product => {

                            product.destroy()
                                .then( rows => res.json(rows) )
                                .catch( err => res.status(500).json(err) );
                        })
                        .catch( err => res.status(500).json(err) );
                } else {
                    res.status(422).json({msg: 'Error: ' + valid.error.message });
                }
            } else {
                res.status(403).json({ msg: "Not admin or moderator"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;