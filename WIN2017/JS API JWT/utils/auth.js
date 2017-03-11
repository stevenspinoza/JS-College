/** Auth.js **/
'use strict';

const q = require('q');
const jwt = require('jsonwebtoken');
const models = require('../models');
const config = require(__dirname + '/../config/config.json');

/**
 * Middleware to validate the JWT sent in the request
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Object} next - This callback allows use to continue on to the main
 *   function of our endpoint
 */
const jwtAuth = (req, res, next) => {
    const token = req.headers.authorization;

    // Run our validate JWT function
    validateJwt(token).then((data) => {
        // If all went well, store the user in the request object for later use
        req.decoded = data;
        next();
    }, function (err) {
        console.log(new Date());
        console.log(err);

        let responseData = {};
        responseData.error_type = 'authentication_error';
        responseData.status_code = 401;
        responseData.message = 'You must provide valid credentials';

        res.status(responseData.status_code).json(responseData);
    });
};

/**
 * Validates our JWT, if it is valid it will return whatever is decoded, in our
 * case it should be a user object, we'll then take that user object and query
 * the database to ensure that a user with that data actually exists
 */
const validateJwt = (token) => {
    const deferred = q.defer();

    // Make sure a token was supplied
    if (token) {
        // Verify our JWT using our JWT secret
        jwt.verify(token, config.development.jwt_secret, (err, decoded) => {
            // Handle any errors
            if (err) {
                deferred.reject(err);
            }

            // Check the user in the JWT against the user in the database
            getUserById(decoded).then((data) => {
                deferred.resolve(data);
            }, (err) => {
                deferred.reject(err);
            });
        });
    } else {
        deferred.reject(new Error('No token provided'));
    }

    return deferred.promise;
};

/**
 * This will take a user object and query for it in the database to make sure it
 * is a existing user
 * @param {Object} decoded - The user object stored in the JWT
 */
const getFruitById = (decoded) => {
    const deferred = q.defer();

    if (!decoded || !decoded.id) {
        deferred.reject(new Error('No ID provided'));
    } else {
        models.fruit.findById(decoded.id).then((data) => {
            // Make sure user exists
            if (!data) {
                deferred.reject(new Error('No user found'));
            }

            // Validate the user properties from the database user against the
            // user in the token. If the properties don't match it means the
            // user has since changed, and our token should no longer be
            // considered valid
            if (data.name !== data.name) {
                deferred.reject(new Error('Token invalid'));
            }

            if (data.color !== decoded.color) {
                deferred.reject(new Error('Token invalid'));
            }

            // If everything checks out, resolve our promise and return our user
            deferred.resolve(data.get({plain: true}));
        }).catch((err) => {
            deferred.reject(err);
        });
    }

    return deferred.promise;
};

// We'll only expore the jwtAuth function for now, but any code functions we
// want to expose could be added to this object
module.exports = {
    jwtAuth
};