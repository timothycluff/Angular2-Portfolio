/**
 * Created by tim.cluff on 4/7/2017.
 */
var express = require('express'),
    _       = require('lodash'),
    config  = require('./config'),
    jwt     = require('jsonwebtoken');

var app = module.exports = express.Router();

// XXX: This should be a database of users :).
var users = [{
    id: 1,
    username: 'gonto',
    password: 'gonto'
}];

function createToken(user) {
    return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*5 });
}

// Endpoint - Post: /users
app.post('/users', function(req, res) {
    // Error message: Fill required fields
    // Status: 400
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("You must send the username and the password");
    }
    if (_.find(users, {username: req.body.username})) {
        return res.status(400).send("A user with that username already exists");
    }

    // Create Profile
    var profile = _.pick(req.body, 'username', 'password', 'extra');
    profile.id = _.max(users, 'id').id + 1;

    // Push new user to users object
    users.push(profile);

    // Create token and send
    res.status(201).send({
        id_token: createToken(profile)
    });
});

// Endpoint - Post: /sessions/create
app.post('/sessions/create', function(req, res) {
    // Error message: Fill required fields
    // Status: 400
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("You must send the username and the password");
    }

    // var user
    // Error message: The username and password don't match
    // Status: 401
    var user = _.find(users, {username: req.body.username});
    if (!user) {
        return res.status(401).send("The username and password don't match");
    }
    if (!(user.password === req.body.password)) {
        return res.status(401).send("The username and password don't match");
    }

    // Success
    res.status(201).send({
        id_token: createToken(user)
    });
});
