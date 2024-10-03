'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Grub extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Grub.hasMany(models.GrubIcon, { foreignKey: 'grubId' })
            Grub.hasMany(models.GrubImage, { foreignKey: 'grubId' })
            Grub.belongsTo(models.User, { foreignKey: 'userId' })
        }
    }
    Grub.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30],
                isNameLengthValid(value) {
                    if (value > 30) {
                        throw new Error('Name too long.');
                    }
                }
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
                isNotEmptyAndNoLeadingWhitespace(value) {
                    if (value.length > 1 && /^\s/.test(value)) {
                        throw new Error('The first character cannot be a space or any whitespace.');
                    }
                },
                isNameLengthValid(value) {
                    if (value > 30) {
                        throw new Error('Name too long.');
                    }
                }
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
                    if (value !== null && value <= 0) {
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
                    if (value !== null && value <= 0) {
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
                    if (value !== null && value <= 0) {
                        throw new Error('sugar must be at least zero if provided');
                    }
                }
            }
        },
        company: {
            type: DataTypes.STRING(30),
            allowNull: true,
            validate: {
                len: [1, 30],
                isNotEmptyAndNoLeadingWhitespace(value) {
                    if (value.length > 1 && /^\s/.test(value)) {
                        throw new Error('The first character cannot be a space or any whitespace.');
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
            references: { model: 'Users' }
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
