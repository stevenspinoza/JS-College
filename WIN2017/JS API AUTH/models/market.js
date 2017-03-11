'use strict';

module.exports = (sequelize, DataTypes) => {
    var Market = sequelize.define('market', {
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            phone: DataTypes.STRING
            
    }, {
        timestamps: true,

        underscored: true,

        classMethods: {
            associate: (models) => {
                // associations can be defined here
				 Market.belongsTo(models.fruit, {
                    onDelete: 'CASCADE'
                });
            }
        }
    });

    return Market;
};