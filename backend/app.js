const express = require('express');
const { sequelize, Users, Products, Orders, Categories, OrderProducts } = require('./models');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();
const port = 8000;
const history = require('connect-history-api-fallback');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        //transports: ['websocket', 'polling'],
        //allowedHeaders: ['Access-Control-Allow-Origin'],
        credentials: true
    },
    allowEI03: true
});

/* var corsOptions = {//ovo treba samo dok ne popravim socket io valjda
    origin: 'http://127.0.0.1:8080',
    optionsSuccessStatus: 200,
    credentials: true // !!!!!!!!!!!!!
}
//app.use(express.json());
app.use(cors(corsOptions)); */


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

    /* socket.on('comment', msg => {
        socket.on('comment', msg => {
            Messages.create({ body: msg.body, artId: msg.artId, userId: msg.user.userId })
                .then( rows => {
                    Messages.findOne({ where: { id: rows.id }, include: ['user'] })
                        .then( msg => io.emit('comment', JSON.stringify(msg)) ) 
                }).catch( err => res.status(500).json(err) );
        });
    }); */

    socket.on('error', err => socket.emit('error', err.message) );
});

/* app.get('/api_register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});

app.get('/api_login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/', authToken, (req, res) => {             
    res.sendFile('index.html', { root: './static' });
}); */

//app.use(express.static(path.join(__dirname, 'static')));

app.set('port', process.env.PORT || 8000);//!!!!!


const staticMdl = express.static(path.join(__dirname, 'dist'));

app.use(staticMdl);

app.use(history({ index: '/index.html' }));

app.use(staticMdl);


server.listen({ port: port }, async () => {
    await sequelize.authenticate();
    console.log(`Connection has been established successfully on port ${port}.`);
});
