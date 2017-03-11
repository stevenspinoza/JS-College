'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const models = require('../../../models');

const jwt = require('jsonwebtoken');
const config = require(__dirname + '/../../../config/config.json');

/**
 * Get all the fruits
 * GET /api/v1/fruits/
 */
router.get('/', (req, res) => {
    let responseData = {};

    models.fruit.findAll({
        attributes: {
            exclude: ['password']
        },
		order: [
            ['id', 'ASC']
        ]
    }).then((data) => {
        responseData.status = 200;
        responseData.message = 'Fruits retrieved successfully!';
        responseData.fruits = data;

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error getting Fruits.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

/**
 * Get a fruit markets
 * GET /api/v1/fruits/:fruitId/markets
 */
router.get('/:fruitId/markets', (req, res) => {
    let responseData = {};

    models.fruit.findById(req.params.fruitId,{
		//Exclude password
		attributes: {
            exclude: ['password']
        },
		//Include models
		include: [{
            model: models.market
        }]
		
	}).then((data) => {
        responseData.status = 200;
        responseData.message = 'Fruit retrieved successfully!';
        responseData.fruit = data;

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error getting Fruit.';

        res.status(responseData.status);
        res.json(responseData);
    });
});
 

/**
 * Create a fruit
 * POST /api/v1/fruits/
 */
router.post('/', (req, res) => {
    let responseData = {};

    models.fruit.create(req.body.fruit).then((data) => {
        responseData.status = 201,
        responseData.message = 'Fruit created successfully!' + req.body.name;
        responseData.fruit = data;

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error creating Fruit.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

/**
 * Login a fruit
 * POSt /api/v1/fruits/login/
 */
 
router.post('/login/', (req, res) => {
    let responseData = {};
    let fruit;

    async.series([
        // Get the fruit
        (callback) => {
            models.fruit.findOne({
                where: {
                    name: req.body.fruit.name
                }
            }).then((data) => {
                if (!data) {
                    responseData.status = 404;
                    responseData.message = 'Fruit not found';

                    return callback(new Error(responseData.message));
                }

                // We'll use our verifyPassword instance method to make sure the
                // password supplied in the request matches the hashed password
                // stored in our database
                if (!data.verifyPassword(req.body.fruit.password, data.password)) {
                    responseData.status = 400;
                    responseData.message = 'Invalid credentials';

                    return callback(new Error(responseData.message));
                }
                
                // This will return our fruit object as a plain JS object, no
                // sequelize features added
                fruit = data.get({ plain: true });
                // Since we don't want to store the hash in our JWT, we'll first
                // delete it
                delete fruit.password;

                return callback();
            }).catch((err) => {
                console.log(new Date());
                console.log(err);

                responseData.status = 500,
                responseData.message = 'Error logging in Fruit.';

                res.status(responseData.status);
                res.json(responseData);
            });
        },

        // Create the JWT
        (callback) => {
            // This create a token with the fruit object as the payload
            // it uses the secret in our config to encrypt
            // and it sets the token to expire in 24hrs
            const token = jwt.sign(fruit, config.development.jwt_secret, {
                expiresIn: 86400 // 24 hours
            });

            // We'll save the created token in our responseData to be sent back
            // to the client
            responseData.token = token;

            return callback();
        }
    ], (err) => {
        if (err) {
            console.log(new Date());
            console.log(err);

            res.status(responseData.status);
            res.json(responseData);
        } else {
            responseData.status = 200;
            responseData.message = 'Login successful!';

            res.status(responseData.status);
            res.json(responseData);
        }
    });
}); 



/**
 * Update a fruit
 * PUT /api/v1/fruits/:fruitId/
 */
router.put('/:fruitId/', (req, res) => {
    let responseData = {};
    let fruit;

    async.series([
        // Get the fruit
        (callback) => {
            models.fruit.findById(req.params.fruitId).then((data) => {
                if (data) {
                    fruit = data;
                    return callback();
                } else {
                    responseData.status = 404,
                    responseData.message = 'Fruit not found.';
                    return callback(new Error(responseData.message));
                }
            }).catch((err) => {
                responseData.status = 500,
                responseData.message = 'Error getting Fruit.';

                return callback(err);
            });
        },

        // Update and save the fruit
        (callback) => {
            fruit.name = req.body.fruit.name;
            fruit.color = req.body.fruit.color;
            fruit.quantity = req.body.fruit.quantity;
            if (req.body.fruit.password) {
                fruit.password = fruit.hashPassword(req.body.fruit.password);
            }

            fruit.save().then((data) => {
                responseData.fruit = data;

				return callback();
			}).catch((err) => {
                responseData.status = 500,
                responseData.message = 'Error updating Fruit.';

                return callback(err);
			});
        }
    ], (err) => {
        if (err) {
            console.log(new Date());
            console.log(err);

            res.status(responseData.status);
            res.json(responseData);
        } else {
            responseData.status = 200;
            responseData.message = 'Fruit updated successfully!';

            res.status(responseData.status);
            res.json(responseData);
        }
    });
});

/**
 * Delete a fruit
 * DELETE /api/v1/fruits/:fruitId/
 */
router.delete('/:fruitId/', (req, res) => {
    let responseData = {};

    models.fruit.destroy({
        where: {
            id: req.params.fruitId
        }
    }).then(() => {
        responseData.status = 200,
        responseData.message = 'Fruit deleted successfully!';

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error deleting Fruit.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

module.exports = router;