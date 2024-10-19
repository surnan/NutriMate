'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const DayLogWorkout = sequelize.define('DayLogWorkout', {
        dayLogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'DayLogs' }
        },
        workoutId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Workouts' }
        }
    }, {
        timestamps: false // No createdAt/updatedAt needed
    });
    return DayLogWorkout;
};
