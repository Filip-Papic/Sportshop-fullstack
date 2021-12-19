const express = require('express');
const { sequelize } = require('./models');
const msgs = require('./routes/routes');
const path = require('path');

const app = express();

app.use('/api', msgs);

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen({ port: 8000 }, async () => {
    await sequelize.authenticate();
});