const express = require('express');
const { sequelize, Users, Products, Orders, Categories, OrderProducts } = require('./models');
const cors = require('cors');
const port = 8100;
const users = require('./routes/userRoutes');
const products = require('./routes/productRoutes');
const orders = require('./routes/orderRoutes');
const categories = require('./routes/categoryRoutes');

const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    //credentials: true // !!!!!!!!!!!!!
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/admin', users);
app.use('/admin', products);
app.use('/admin', orders);
app.use('/admin', categories);


app.listen({ port: port }, async () => {
    await sequelize.authenticate();
    console.log(`Connection to REST API has been established successfully on port ${port}.`);
});