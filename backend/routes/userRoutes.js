const express = require('express');
const { sequelize, Users, Products, Orders, Categories, OrderProducts} = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {idValid, registerValid} = require('../app_valid.js');
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

route.get('/users', (req, res) => {      
    Users.findOne({ where: { id: req.user.userID } })
        .then( usr => {
            //if (usr.admin) {
                Users.findAll()//({include: 'orders'})
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            //} else {
            //    res.status(403).json({ msg: "Not admin"});
            //}
        })
        .catch( err => res.status(500).json(err) );
});

route.get('/users/:id', (req, res) => {
    Users.findOne({ where: { id: req.user.userID } })
        .then( usr => {
            //if (usr.admin) {
                const valid = idValid.validate(req.params);
                if(!valid.error){
                    Users.findOne({ where: { id: req.params.id }})//, include:['orderedProducts'] })
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json(err) );
                } else {
                    res.status(422).json({msg: 'Error: ' + valid.error.message });
                }
            //} else {
            //    res.status(403).json({ msg: "Not admin"});
            //}
        })
        .catch( err => res.status(500).json(err) );
});

route.put('/users/:id', (req, res) => {    
    /* Users.findOne({ where: { id: req.user.userID } })
        .then( usr => {
            if (usr.admin) {
                const valid = registerValid.validate(req.body);
                const validID = idValid.validate(req.params);
                if (valid.error){
                    res.status(422).json({msg: 'Error: ' + valid.error.message });
                } else if (validID.error){ 
                    res.status(422).json({msg: 'Error: ' + validID.error.message });
                } else { */
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
                    /*} 
            } else {
                res.status(403).json({ msg: "Not admin"});
            }
        })
        .catch( err => res.status(500).json(err) ); */
});

route.delete('/users/:id', (req, res) => { 
    Users.findOne({ where: { id: req.user.userID } })
        .then( usr => {
            //if (usr.admin) {
                const valid = idValid.validate(req.params);
                if(!valid.error){
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
                } else {
                    res.status(422).json({msg: 'Error: ' + valid.error.message });
                }
            //} else {
                res.status(403).json({ msg: "Not admin"});
            //}
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;