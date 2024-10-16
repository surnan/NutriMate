'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DayLog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            DayLog.belongsToMany(models.Grub, {
                through: 'DayLogGrub', // Junction table
                foreignKey: 'dayLogId',
                otherKey: 'grubId'
            });

            DayLog.belongsToMany(models.Workout, {
                through: 'DayLogWorkout', // Junction table
                foreignKey: 'dayLogId',
                otherKey: 'workoutId'
            });

            DayLog.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }
    DayLog.init({
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30],
                isNameLengthValid(value) {
                    const strValue = String(value)
                    if (strValue.length > 30) {
                        throw new Error(`Name too long. ==> ${strValue} has length ${strValue.length}`);
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
        unit: {
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
        unitType: {
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Users' }
        }
    }, {
        sequelize,
        modelName: 'DayLog',
        defaultScope: {
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        },
        validate: {
            grubOrWorkoutRequired() {
                if (this.grubId === null && this.workoutId === null) {
                    throw new Error('Either grubId or workoutId must be provided.');
                }
                if (this.grubId !== null && this.workoutId !== null) {
                    throw new Error('Only one of grubId or workoutId can be provided, not both.');
                }
            }
        }
    });
    return DayLog;
};
