'use strict';

const express = require('express');
const router = express.Router();
const async = require('async');
const models = require('../../../models');

/**
 * Get all the contacts
 * GET /api/v1/contacts/
 */
router.get('/', (req, res) => {
    let responseData = {};

    models.contact.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then((data) => {
        responseData.status = 200;
        responseData.message = 'Contacts retrieved successfully!';
        responseData.contacts = data;

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error getting Contacts.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

/**
 * Get a contact
 * GET /api/v1/contacts/:contactId/
 */
router.get('/:contactId/', (req, res) => {
    let responseData = {};

    models.contact.findById(req.params.contactId).then((data) => {
        responseData.status = 200;
        responseData.message = 'Contact retrieved successfully!';
        responseData.contact = data;

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error getting Contact.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

/**
 * Create a contact
 * POST /api/v1/contacts/
 */
router.post('/', (req, res) => {
    let responseData = {};

    models.contact.create(req.body.contact).then((data) => {
        responseData.status = 201,
        responseData.message = 'Contact created successfully!';
        responseData.contact = data;

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error creating Contact.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

/**
 * Update a contact
 * PUT /api/v1/contacts/:contactId/
 */
router.put('/:contactId/', (req, res) => {
    let responseData = {};
    let contact;

    async.series([
        // Get the contact
        (callback) => {
            models.contact.findById(req.params.contactId).then((data) => {
                contact = data;

                return callback();
            }).catch((err) => {
                responseData.status = 500,
                responseData.message = 'Error getting Contact.';

                return callback(err);
            });
        },

        // Update and save the contact
        (callback) => {
            contact.name = req.body.contact.name;
            contact.email = req.body.contact.email;
            contact.phone_number = req.body.contact.phone_number;

            contact.save().then((data) => {
                responseData.contact = data;

				return callback();
			}).catch((err) => {
                responseData.status = 500,
                responseData.message = 'Error updating Contact.';

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
            responseData.message = 'Contact updated successfully!';

            res.status(responseData.status);
            res.json(responseData);
        }
    });
});

/**
 * Delete a contact
 * DELETE /api/v1/contacts/:contactId/
 */
router.delete('/:contactId/', (req, res) => {
    let responseData = {};

    models.contact.destroy({
        where: {
            id: req.params.contactId
        }
    }).then(() => {
        responseData.status = 200,
        responseData.message = 'Contact deleted successfully!';

        res.status(responseData.status);
        res.json(responseData);
    }).catch((err) => {
        console.log(new Date());
        console.log(err);

        responseData.status = 500,
        responseData.message = 'Error deleting Contact.';

        res.status(responseData.status);
        res.json(responseData);
    });
});

module.exports = router;