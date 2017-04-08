/**
 * Created by tim.cluff on 4/7/2017.
 */

var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('./config'),
    quoter  = require('./quoter');

var app = module.exports = express.Router();

var jwtCheck = jwt({
    secret: config.secret
});

app.use('/api/protected', jwtCheck);

// Endpoint: /protected/random-quote
app.get('/api/protected/random-quote', function(req, res) {
    res.status(200).send(quoter.getRandomOne());
});
