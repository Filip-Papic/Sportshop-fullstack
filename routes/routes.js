const express = require('express');
const { sequelize, Users, Products, Orders, Categories, OrderProducts } = require('../models');
const jwt = require('jsonwebtoken');
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

route.use(authToken);

route.get('/users', (req, res) => {      //read all
    Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/users/:id', (req, res) => {
    Users.findOne({ where: { id: req.params.id }})//, include:['orderedProducts'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.put('/admin/users/:id', (req, res) => {    //update
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
                Users.findOne({ where: { id: req.params.id } })
                    .then( user => {
                        user.id = req.body.id; 
                        user.name = req.body.name;
                        user.email = req.body.email;
                        user.password = req.body.password;
                        user.adress = req.body.adress;
                        user.postalCode = req.body.postalCode;
                        user.city = req.body.city;
                        user.country = req.body.country;

                        user.save()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    })
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Not admin"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.delete('/admin/users/:id', (req, res) => { //delete
    Users.findOne({ where: { id: req.params.id } })
        .then( user => {
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;

            user.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

route.get('/products', (req, res) => {
    Products.findAll({include: ['category', 'orderedProducts']}) 
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/products/:id', (req, res) => {
    Products.findOne({ where: { id: req.params.id }, include:['category', 'orderedProducts'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/orders', (req, res) => {
    Orders.findAll({include: ['user','orderedProducts']})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/orders/:id', (req, res) => {
    Orders.findOne({ where: { id: req.params.id }, include: ['user', 'orderedProducts']})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/orders', (req, res) => {
        Orders.create({ priceTotal: req.body.priceTotal,
                        quantityTotal: req.body.quantityTotal,
                        details: req.body.details,
                        date: req.body.date,
                        userId: req.user.userID, 
                        productID: req.body.productID
                    })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
});

route.put('/orders/:id', (req, res) => {   
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
});

route.delete('/orders/:id', (req, res) => {   
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
});

route.get('/orders/:id/cancel', (req, res) => {//delete sa get
    Orders.findOne({ where: { id: req.params.id } })
        .then( order => {
            order.name = req.body.name;

            order.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

route.get('/categories', (req, res) => {
    Categories.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/categories/:id', (req, res) => {
    Categories.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/admin/categories', (req, res) => {
    Categories.create({ name: req.body.name })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.put('/admin/categories/:id', (req, res) => {   
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
                Categories.findOne({ where: { id: req.params.id } })
                    .then( category => {
                        category.id = req.body.id;
                        category.name = req.body.name;

                        category.save()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    })
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Not admin"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.delete('/admin/categories/:id', (req, res) => { 
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
                Categories.findOne({ where: { id: req.params.id } })
                    .then( category => {

                        category.destroy()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    })
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Not admin"});
            }
        })
        .catch( err => res.status(500).json(err) );
});
route.post('/admin/products', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
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
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Not admin"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.put('/admin/products/:id', (req, res) => {   
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
                Products.findOne({ where: { id: req.params.id } })
                    .then( product => {
                        product.id = req.body.id; 
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
            } else {
                res.status(403).json({ msg: "Not admin"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.delete('/admin/products/:id', (req, res) => { 
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
                Products.findOne({ where: { id: req.params.id } })
                    .then( product => {

                        product.destroy()
                            .then( rows => res.json(rows) )
                            .catch( err => res.status(500).json(err) );
                    })
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Not admin"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.get('/orderproducts', (req, res) => {
    OrderProducts.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/orderproducts/:id', (req, res) => { 
    OrderProducts.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/orderproducts', (req, res) => {
    OrderProducts.create({ id: req.body.id,
                    orderID: req.body.orderID,
                    productID: req.body.productID,
                    quantity: req.body.quantity
                })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.put('/orderproducts/:id', (req, res) => {   
    OrderProducts.findOne({ where: { id: req.params.id } })
        .then( ordp => {
            ordp.orderID = req.body.orderID;
            ordp.productID = req.body.productID;
            ordp.quantity = req.body.quantity;

            product.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

route.delete('/orderproducts/:id', (req, res) => {   
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
});

module.exports = route;