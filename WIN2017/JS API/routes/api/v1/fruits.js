'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const models = require('../../../models');

/**
 * Get all the fruits
 * GET /api/v1/fruits/
 */
router.get('/', (req, res) => {
    let responseData = {};

    models.fruit.findAll({
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
 * Get a fruit
 * GET /api/v1/fruits/:fruitId/
 */
router.get('/:fruitId/', (req, res) => {
    let responseData = {};

    models.fruit.findById(req.params.fruitId).then((data) => {
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

    models.fruit.create(req.body).then((data) => {
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
                fruit = data;

                return callback();
            }).catch((err) => {
                responseData.status = 500,
                responseData.message = 'Error getting Fruit.';

                return callback(err);
            });
        },

        // Update and save the fruit
        (callback) => {
            fruit.name = req.body.name;
            fruit.color = req.body.color;
            fruit.quantity = req.body.quantity;

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