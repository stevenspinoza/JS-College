'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const models = require('../../../models');
const authUtils = require('../../../utils/auth');

/**
 * Get all the markets
 * GET /api/v1/markets/
 */
router.get('/', authUtils.jwtAuth, (req, res) => {
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
router.get('/:marketId/', authUtils.jwtAuth, (req, res) => {
    let responseData = {};
	let market;

    async.series([
        // Get the market, and store it in the market variable
        (callback) => {
            models.market.findById(req.params.marketId).then((data) => {
                if (!data) {
                    responseData.status = 404;
                    responseData.message = 'Market not found';

                    return callback(new Error(responseData.message));
                }

                market = data.get({ plain: true });
                return callback();
            }).catch((err) => {
                responseData.status = 500,
                responseData.message = 'Error getting Market.';

                return callback(err);
            });
        },

        // Verify that the ID of the fruit in req.decoded, and the fruit_id in the
        // market match
        (callback) => {
            // Compare the IDs, if they're not equal return with an error
            if (req.decoded.id !== market.fruit_id) {
                responseData.status = 403;
                responseData.message = 'You have insufficient permissions to access the Market.';

                return callback(new Error(responseData.message));
            }

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
            responseData.message = 'Market retrieved successfully!';
            responseData.market = market;

            res.status(responseData.status);
            res.json(responseData);
        }
    });
});

/**
 * Create a market
 * POST /api/v1/markets/
 */
router.post('/', authUtils.jwtAuth, (req, res) => {
    let responseData = {};

    async.series([
        // Verify that the ID of the fruit in req.decoded, and the fruit_id in the
        // request body match
        (callback) => {
            if (req.decoded.id !== req.body.market.fruit_id) {
                responseData.status = 403;
                responseData.message = 'You have insufficient permissions to access the Market.';

                return callback(new Error(responseData.message));
            }

            return callback();
        },

        // Create the Market
        (callback) => {
            models.market.create(req.body.market).then((data) => {
                responseData.market = data;

                return callback();
            }).catch((err) => {
                responseData.status = 500,
                responseData.message = 'Error creating Market.';

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
            responseData.status = 201;
            responseData.message = 'Market created successfully!';

            res.status(responseData.status);
            res.json(responseData);
        }
    });
});

/**
 * Update a market
 * PUT /api/v1/markets/:marketId/
 */
router.put('/:marketId/', authUtils.jwtAuth, (req, res) => {
    let responseData = {};
    let market;

    async.series([
		// Get the market
		(callback) => {
			models.market.findById(req.params.marketId).then((data) => {
				if (data) {
					market = data;
					return callback();
				} else {
					responseData.status = 404,
					responseData.message = 'Market not found.';
					return callback(new Error(responseData.message));
				}
			}).catch((err) => {
				responseData.status = 500,
				responseData.message = 'Error getting Market.';

				return callback(err);
			});
		},

		// Verify that the ID of the fruit in req.decoded, and the fruit_id in the
		// market match
		(callback) => {
			// Compare the IDs, if they're not equal return with an error
			if (req.decoded.id !== market.fruit_id) {
				responseData.status = 403;
				responseData.message = 'You have insufficient permissions to access the Market.';

				return callback(new Error(responseData.message));
			}

			return callback();
		},

		// Update and save the market
		(callback) => {
			market.name = req.body.market.name;			
			market.phone = req.body.market.phone;

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
router.delete('/:marketId/', authUtils.jwtAuth, (req, res) => {
    let responseData = {};
	let market;

    async.series([
		// Get the market
		(callback) => {
			models.market.findById(req.params.marketId).then((data) => {
				if (data) {
					market = data;
					return callback();
				} else {
					responseData.status = 404,
					responseData.message = 'Market not found.';
					return callback(new Error(responseData.message));
				}
			}).catch((err) => {
				responseData.status = 500,
				responseData.message = 'Error getting Market.';

				return callback(err);
			});
		},

		// Verify that the ID of the fruit in req.decoded, and the fruit_id in the
		// market match
		(callback) => {
			// Compare the IDs, if they're not equal return with an error
			if (req.decoded.id !== market.fruit_id) {
				responseData.status = 403;
				responseData.message = 'You have insufficient permissions to access the Market.';

				return callback(new Error(responseData.message));
			}

			return callback();
		},

		// Delete the market
		(callback) => {
			models.market.destroy({
				where: {
					id: req.params.marketId
				}
			}).then(() => {
				return callback();
			}).catch((err) => {
				responseData.status = 500,
				responseData.message = 'Error deleting Market.';

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
			responseData.message = 'Market deleted successfully!';

			res.status(responseData.status);
			res.json(responseData);
		}
	});
});

module.exports = router;