'use strict';
const {
    Model,
    Validator
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const DayLogGrub = sequelize.define('DayLogGrub', {
        dayLogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'DayLogs' }
        },
        grubId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Grubs' }
        }
    }, {
        timestamps: false // No createdAt/updatedAt needed
    });
    return DayLogGrub;
};
