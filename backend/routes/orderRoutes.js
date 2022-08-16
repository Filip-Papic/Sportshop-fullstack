const express = require('express');
const { sequelize, Users, Products, Orders, Categories, OrderProducts } = require('../models');
const jwt = require('jsonwebtoken');
const { orderValid, idValid, categoryValid } = require('../app_valid');
require('dotenv').config();

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

route.get('/orders', (req, res) => {
    Orders.findAll({ include: ['user']})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/orders/:id', (req, res) => {
    const valid = idValid.validate(req.params);
    if(!valid.error){
        Orders.findOne({ where: { id: req.params.id }, include: ['user', 'orderedProducts']})
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    } else {
        res.status(422).json({msg: 'Error: ' + valid.error.message });
    }
});

route.post('/orders', (req, res) => {
    const valid = orderValid.validate(req.body);
        if(!valid.error){
            Orders.create({ id: req.body.id,
                            userID: req.user.userID,
                            productID: req.body.productID,
                            quantityTotal: req.body.quantityTotal,
                            date: req.body.createdAt
                        })
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json({msg : 'ovde smo'}) );
        } else {
            res.status(422).json({msg: 'Error: ' + valid.error.message });
        }       
});

route.put('/orders/:id', authToken, (req, res) => {
    const valid = orderValid.validate(req.body);
    const validID = idValid.validate(req.params);
    if (valid.error){
        res.status(422).json({msg: 'Error: ' + valid.error.message });
    }else if (validID.error){
        res.status(422).json({msg: 'Error: ' + validID.error.message });
    } else {   
        Orders.findOne({ where: { id: req.params.id } })
            .then( order => {
                order.priceTotal = req.body.priceTotal; 
                order.quantityTotal = req.body.quantityTotal;
                order.details = req.body.details,
                order.date = req.body.date,
                order.userID = req.body.userID
                order.productID = req.body.productID

                order.save()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
        }
});

route.delete('/orders/:id', authToken, (req, res) => {   
    const valid = idValid.validate(req.params);
    if(!valid.error){
        Orders.findOne({ where: { id: req.params.id } })
            .then( order => {
                order.priceTotal = req.body.priceTotal; 
                order.quantityTotal = req.body.quantityTotal;
                order.details = req.body.details,
                order.date = req.body.date,
                order.userID = req.body.userID

                order.destroy()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
    } else {
        res.status(422).json({msg: 'Error: ' + valid.error.message });
    }
});

route.get('/orderproducts', (req, res) => {
    OrderProducts.findAll({ include: 'user'})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/orderproducts/:id', (req, res) => { 
    const valid = idValid.validate(req.params);
    if(!valid.error){
        OrderProducts.findOne({ where: { id: req.params.id }, include: 'user'})
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    } else {
        res.status(422).json({msg: 'Error: ' + valid.error.message });
    }
});

route.post('/orderproducts', (req, res) => {
        //const valid = orderProductsValid.validate(req.body); // radi bez validacije
        //if(!valid.error){
            OrderProducts.create({ id: req.body.id,
                            userID: req.user.userID,
                            userId: req.body.userId,
                            productID: req.body.productID,
                            orderID: req.body.orderId,
                            quantity: req.body.quantity 
                        })
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        /*} else {
            res.status(422).json({msg: 'Error: ' + valid.error.message });
        }*/
});

route.put('/orderproducts/:id', authToken, (req, res) => {   
    const valid = idValid.validate(req.params);
    if(!valid.error){
        OrderProducts.findOne({ where: { id: req.params.id } , include: 'user'})
            .then( ordp => {
                ordp.userID = req.user.userID,  //asd
                ordp.orderID = req.body.orderID;
                ordp.productID = req.body.productID;
                ordp.quantity = req.body.quantity;

                ordp.save()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
    } else {
        res.status(422).json({msg: 'Error: ' + valid.error.message });
    }
});

route.delete('/orderproducts/:id', authToken, (req, res) => {   
    const valid = idValid.validate(req.params);
    if(!valid.error){
        OrderProducts.findOne({ where: { id: req.params.id } })
            .then( ordp => {
                ordp.orderID = req.body.orderID;
                ordp.productID = req.body.productID;
                ordp.quantity = req.body.quantity;

                ordp.destroy()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            })
            .catch( err => res.status(500).json(err) );
    } else {
        res.status(422).json({msg: 'Error: ' + valid.error.message });
    }
});

module.exports = route;