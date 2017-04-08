'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db/db');

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'jade');
app.use(express.static('public'));

app.use('/users', require('./routes/routes'));

//error handling middleware
app.use((err, req ,res, next) => {
    // res.status(err.status);
    res.send({error: err.message});
    console.log(err.message);
});

module.exports = app;
