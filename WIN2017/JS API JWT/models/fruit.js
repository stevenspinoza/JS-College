'use strict';

const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
    var Fruit = sequelize.define('fruit', {
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            color: DataTypes.STRING,
            quantity: DataTypes.INTEGER,
			password: {
                 type: DataTypes.STRING,
                 validate: {
                     notEmpty: true
                 }
            }
    }, {
        timestamps: true,

        underscored: true,

        classMethods: {
            associate: (models) => {
                // associations can be defined here
				Fruit.hasMany(models.market, {
                    onDelete: 'CASCADE'
                });
            }
        },
		
		
		instanceMethods: {
            /**
             * Hashes a plaintext password
             * @param {String} password - The plaintext password to hash
             */
            hashPassword: (password) => {
                return bcrypt.hashSync(password, saltRounds);
            },

            /**
             * Verifys a plaintext password against that hash stored in the model
             * @param {String} password - The plaintext password to verify
             * @param {String} hash - The hashed password to verify against
             */
            verifyPassword: (password, hash) => {
                return bcrypt.compareSync(password, hash);
            }
        },

        hooks: {
            beforeCreate: (instance) => {
                instance.password = bcrypt.hashSync(instance.password, saltRounds);
            }
        }
		
		
    });

    return Fruit;
};