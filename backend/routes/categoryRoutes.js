const express = require('express');
const { sequelize, Users, Products, Orders, Categories, OrderProducts } = require('../models');
const jwt = require('jsonwebtoken');
const { categoryValid, idValid } = require('../app_valid');
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

route.get('/categories', (req, res) => {
    Categories.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/categories/:id', (req, res) => {
    const valid = idValid.validate(req.params);
    if(!valid.error){
        Categories.findOne({ where: { id: req.params.id } })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
    } else {
        res.status(422).json({msg: 'Error: ' + valid.error.message });
    }
});

route.post('/categories', authToken, (req, res) => {
    Users.findOne({ where: { id: req.user.userID } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                const valid = categoryValid.validate(req.body);
                if(!valid.error){
                    Categories.create({ name: req.body.name })
                        .then( rows => res.json(rows) )
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

route.put('/categories/:id', authToken, (req, res) => {   
    Users.findOne({ where: { id: req.user.userID } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                const valid = categoryValid.validate(req.body);
                const validID = idValid.validate(req.params);
                if (valid.error){
                    res.status(422).json({msg: 'Error: ' + valid.error.message });
                }else if (validID.error){
                    res.status(422).json({msg: 'Error: ' + validID.error.message });
                } else {
                    Categories.findOne({ where: { id: req.params.id } })
                        .then( category => {
                            category.id = req.body.id;
                            category.name = req.body.name;

                            category.save()
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

route.delete('/categories/:id', authToken, (req, res) => { 
    Users.findOne({ where: { id: req.user.userID } })
        .then( usr => {
            if (usr.admin || usr.moderator) {
                const valid = idValid.validate(req.params);
                if(!valid.error){
                    Categories.findOne({ where: { id: req.params.id } })
                        .then( category => {

                            category.destroy()
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