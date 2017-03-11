'use strict';

module.exports = (sequelize, DataTypes) => {
    var Shape = sequelize.define('shape', {
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            sides: DataTypes.STRING,
			api_key: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {					
										
					notEmpty: {
						msg: 'Api_key is a required field'
					}
                }	
				
			}
    }, {
        timestamps: true,

        underscored: true,

        classMethods: {
            associate: (models) => {
                // associations can be defined here				
            }
        }
    });

    return Shape;
};