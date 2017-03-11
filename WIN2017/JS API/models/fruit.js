'use strict';

module.exports = (sequelize, DataTypes) => {
    var Fruit = sequelize.define('fruit', {
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            color: DataTypes.STRING,
            quantity: DataTypes.INTEGER
    }, {
        timestamps: true,

        underscored: true,

        classMethods: {
            associate: (models) => {
                // associations can be defined here
            }
        }
    });

    return Fruit;
};