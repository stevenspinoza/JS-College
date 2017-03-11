'use strict';

module.exports = (sequelize, DataTypes) => {
    var Contact = sequelize.define('contact', {
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            email: DataTypes.STRING,
            phone_number: DataTypes.STRING
    }, {
        timestamps: true,

        underscored: true,

        classMethods: {
            associate: (models) => {
                // associations can be defined here
            }
        }
    });

    return Contact;
};