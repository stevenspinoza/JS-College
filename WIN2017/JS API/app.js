'use strict';

const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const models = require('./models');

// Prints out requests
app.use(morgan('dev'));
// Parses incoming requests

// app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true	
}));

// Require Routes
const v1Contacts = require('./routes/api/v1/contacts');
const v1Fruits = require('./routes/api/v1/fruits');

// Define Routes
app.use('/api/v1/contacts', v1Contacts);
app.use('/api/v1/fruits', v1Fruits);

app.use((req, res) => {
    res.status(404);
    res.json({
        statusCode: 404,
        message: 'Route not found'
    });
});

models.sequelize.sync({ force: true }).then(() => {
    server.listen(3001, () => {
        var address = server.address();

        console.log(`Server listening on port ${ address.port }. Go to http://localhost:${ address.port }/`);
    });

    server.on('error', (err) => {
        console.log(err);
    });
});
