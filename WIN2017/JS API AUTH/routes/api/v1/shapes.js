'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const models = require('../../../models');

/**
 * Get all the shapes
 * GET /api/v1/shapes/
 */
router.get('/', (req, res) => {
    let responseData = {};

    models.shape.findAll({
        attributes: {
            exclude: ['password']
        },
		order: [
            ['id', 'ASC']
        ]
    }).then((data) => {
        responseData.status = 200;
        responseData.message = 'Shapes retrieved successfully! '+ typeof(data);
		
		let noKeys = []
		//Excluding the api_key from get req
		for (var i in data) {
			noKeys.push({id : data[i].id, name:data[i].name, sides:data[i].sides});
		}
		
        responseData.shapes = noKeys

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error getting Shapes.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

/**
 * Get a single shape
 * GET /api/v1/shapes/:shapeId/
 */
router.get('/:shapeId', (req, res) => {
    let responseData = {};

	var auth = req.headers.authorization;

		
    models.shape.findById(req.params.shapeId,{
		//Exclude password
		attributes: {
            exclude: ['password']
        },
		//Include models
		// include: [{
            // model: models.market
        // }]
		
	}).then((data) => {
		
		if(auth == data.api_key){
			responseData.status = 200;
			responseData.message = 'Shape retrieved successfully!';
			responseData.shape = { id: data.id,
		name:data.name, sides: data.sides}
					
			res.status(responseData.status);
			res.json(responseData);
		} else {
			responseData.status = 401;
			responseData.message = 'You are not authorized to this content!';
			res.status(responseData.status);
			res.json(responseData);
		}
		
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error getting Shape.';

        res.status(responseData.status);
        res.json(responseData);
    });
});
 

/**
 * Create a shape
 * POST /api/v1/shapes/
 */
router.post('/', (req, res) => {
    let responseData = {};

    models.shape.create(req.body).then((data) => {
        
		//if (req.body.api_key != null){
			responseData.status = 201,
			responseData.message = 'Shape created successfully!' + req.body.name;
			responseData.shape = data;

			res.status(responseData.status);
			res.json(responseData);
		// } else {
			// responseData.message = 'Shape api_key needs a value'
			// res.json(responseData);
		// }
		
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error creating Shape.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

/**
 * Update a shape
 * PUT /api/v1/shapes/:shapeId/
 */
router.put('/:shapeId/', (req, res) => {
    let responseData = {};
    let shape;

    async.series([
        // Get the shape
        (callback) => {
            models.shape.findById(req.params.shapeId).then((data) => {
                shape = data;

                return callback();
            }).catch((err) => {
                responseData.status = 500,
                responseData.message = 'Error getting Shape.';

                return callback(err);
            });
        },

        // Update and save the shape
        (callback) => {
            shape.name = req.body.name;
            shape.sides = req.body.sides;
            shape.api_key = req.body.api_key;

            shape.save().then((data) => {
                responseData.shape = data;

				return callback();
			}).catch((err) => {
                responseData.status = 500,
                responseData.message = 'Error updating Shape.';

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
            responseData.message = 'Shape updated successfully!';

            res.status(responseData.status);
            res.json(responseData);
        }
    });
});

/**
 * Delete a shape
 * DELETE /api/v1/shapes/:shapeId/
 */
router.delete('/:shapeId/', (req, res) => {
    let responseData = {};

    models.shape.destroy({
        where: {
            id: req.params.shapeId
        }
    }).then(() => {
        responseData.status = 200,
        responseData.message = 'Shape deleted successfully!';

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error deleting Shape.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

module.exports = router;