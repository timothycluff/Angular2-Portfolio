/**
 * Created by tim.cluff on 4/7/2017.
 */

var express = require('express'),
    quoter = require('./quoter');

var app = module.exports = express.Router();

// Endpoint: /randow-quote
app.get('/api/random-quote', function (req, res) {
    res.status(200).send(quoter.getRandowOne());
});