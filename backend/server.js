/**
 * Created by tim.cluff on 4/7/2017.
 */


// server.js

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Authentication middleware. When used, the
// access token must exist and be verified against
// the Auth0 JSON Web Key Set
const authenticate = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://timcluff24.auth0.com/.well-known/jwks.json'
    }),

    // Validate the audience and the issuer.
    audience: '{API_ID}',
    issuer: 'https://timcluff24.auth0.com/',
    algorithms: ['RS256']
});

// Endpoint: private
app.get('/api/private', authenticate, function (req, res) {
    res.json({
        message: "Hello from a private endpoint! You DO need to be authenticated to see this."
    });
});

// access_token
const authorize = jwtAuthz([ 'read:messages' ]);

// Endpoint: private/admin
app.get('/api/private/admin', authenticate, authorize, function (req, res) {
    res.json({
        message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
    });
});