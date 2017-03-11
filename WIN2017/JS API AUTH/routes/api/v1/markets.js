'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const models = require('../../../models');

/**
 * Get all the markets
 * GET /api/v1/markets/
 */
router.get('/', (req, res) => {
    let responseData = {};

    models.market.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then((data) => {
        responseData.status = 200;
        responseData.message = 'Markets retrieved successfully!';
        responseData.markets = data;

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error getting Markets.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

/**
 * Get a market
 * GET /api/v1/markets/:marketId/
 */
router.get('/:marketId/', (req, res) => {
    let responseData = {};

    models.market.findById(req.params.marketId).then((data) => {
        responseData.status = 200;
        responseData.message = 'Market retrieved successfully!';
        responseData.market = data;

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error getting Market.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

/**
 * Create a market
 * POST /api/v1/markets/
 */
router.post('/', (req, res) => {
    let responseData = {};

    models.market.create(req.body).then((data) => {
        responseData.status = 201,
        responseData.message = 'Market created successfully!' + req.body.name;
        responseData.market = data;

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error creating Market.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

/**
 * Update a market
 * PUT /api/v1/markets/:marketId/
 */
router.put('/:marketId/', (req, res) => {
    let responseData = {};
    let market;

    async.series([
        // Get the market
        (callback) => {
            models.market.findById(req.params.marketId).then((data) => {
                market = data;

                return callback();
            }).catch((err) => {
                responseData.status = 500,
                responseData.message = 'Error getting Market.';

                return callback(err);
            });
        },

        // Update and save the market
        (callback) => {
            market.name = req.body.name;
            market.phone = req.body.phone;
 
            market.save().then((data) => {
                responseData.market = data;

				return callback();
			}).catch((err) => {
                responseData.status = 500,
                responseData.message = 'Error updating Market.';

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
            responseData.message = 'Market updated successfully!';

            res.status(responseData.status);
            res.json(responseData);
        }
    });
});

/**
 * Delete a market
 * DELETE /api/v1/markets/:marketId/
 */
router.delete('/:marketId/', (req, res) => {
    let responseData = {};

    models.market.destroy({
        where: {
            id: req.params.marketId
        }
    }).then(() => {
        responseData.status = 200,
        responseData.message = 'Market deleted successfully!';

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error deleting Market.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

module.exports = router;