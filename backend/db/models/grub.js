// backend/db/models/grub.js
'use strict';
const {Model, Validator} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Grub extends Model {
        static associate(models) {
            Grub.belongsTo(models.User, { foreignKey: 'userId' })
            Grub.hasMany(models.GrubImage, { foreignKey: 'grubId' })
            Grub.hasMany(models.DayLog, { foreignKey: 'grubId' })
        }
    }
    Grub.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        servingSize: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                isServingSizeValid(value) {
                    if (value < 0) {
                        throw new Error('servingSize must be greater than zero');
                    }
                }
            }
        },
        servingUnit: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30],
            }
        },
        calories: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isCaloriesValid(value) {
                    if (value < 0) {
                        throw new Error('Calories must be at least zero');
                    }
                }
            }
        },
        protein: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isProteinValid(value) {
                    if (value !== null && value < 0) {
                        throw new Error('if protein has value then it must be at least zero');
                    }
                }
            }
        },
        fats: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isFatsValid(value) {
                    if (value !== null && value < 0) {
                        throw new Error('if fats has value then it must be at least zero if provided');
                    }
                }
            }
        },
        carbs: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isCarbsValid(value) {
                    if (value !== null && value < 0) {
                        throw new Error('carbs must be at least zero if provided');
                    }
                }
            }
        },
        sugar: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isSugarValid(value) {
                    if (value !== null && value < 0) {
                        throw new Error('sugar must be at least zero if provided');
                    }
                }
            }
        },
        company: {
            type: DataTypes.STRING(30),
            allowNull: true,
            validate: {
                len: [0, 30],
                isLessThan30(value) {
                    if (value.length > 30) {
                        throw new Error('Company Name can not exceed 30');
                    }
                }
            }
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: true,
            validate: {
                len: [0, 500],
                isDescriptionLengthValid(value) {
                    if (value.length > 500) {
                        throw new Error('The description length can not exceed 500');
                    }
                }
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Users' },
            onDelete: "CASCADE"
        },
    }, {
        sequelize,
        modelName: 'Grub',
        defaultScope: {
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        }
    });
    return Grub;
};
