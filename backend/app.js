const express = require('express');
const { sequelize, Users, Products, Orders, Categories, OrderProducts } = require('./models');
const users = require('./routes/userRoutes');
const products = require('./routes/productRoutes');
const orders = require('./routes/orderRoutes');
const categories = require('./routes/categoryRoutes');
const path = require('path');
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:8080',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEI03: true
});

app.use('/admin', users);
app.use('/admin', products);
app.use('/admin', orders);
app.use('/admin', categories);

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}

function authSocket(msg, next) {
    if(msg[1].token == null) {
        next(new Error('Not Authenticated'));
    } else {
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error(err));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
}

io.on('connection', socket => {
    socket.use(authSocket);

    // socket.on('comment', msg => {
    //     socket.on('comment', msg => {
    //         Messages.create({ body: msg.body, artId: msg.artId, userId: msg.user.userId })
    //             .then( rows => {
    //                 Messages.findOne({ where: { id: rows.id }, include: ['user'] })
    //                     .then( msg => io.emit('comment', JSON.stringify(msg)) ) 
    //             }).catch( err => res.status(500).json(err) );
    //     });
    // });

    socket.on('error', err => socket.emit('error', err.message) );
});

app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/', authToken, (req, res) => {             
    res.sendFile('index.html', { root: './static' });
});

app.use(express.static(path.join(__dirname, 'static')));

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});