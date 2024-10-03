'use strict';

// const {User, Sequelize} = require('../models');
const { grub, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
let options = {};
// options.tableName = 'Users';
options.tableName = 'DayLogs';



if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        //   options.tableName = "Users";
        options.tableName = "DayLogs";
        return queryInterface.bulkInsert(options, [
            {
                userId: 1,
                // grubId: 1,
                // workoutId: null,
                timestamp: new Date('2023-05-01T07:00:00Z'),
                calories: 300,
                units: 5,
                unitType: null
            },
            {
                userId: 2,
                // grubId: null,
                // workoutId: 1,
                timestamp: new Date('2023-05-01T09:00:00Z'),
                calories: 400,
                units: 120,
                unitType: 'minutes'
            },
            {
                userId: 1,
                // grubId: 3,
                // workoutId: null,
                timestamp: new Date('2023-05-01T08:00:00Z'),
                calories: 100,
                units: 2,
                unitType: null
            },
            {
                userId: 2,
                // grubId: null,
                // workoutId: 3,
                timestamp: new Date('2023-05-01T06:00:00Z'),
                calories: 500,
                units: 500,
                unitType: 'reps'
            },
            {
                userId: 1,
                // grubId: 4,
                // workoutId: null,
                timestamp: new Date('2023-05-01T03:00:00Z'),
                calories: 250,
                units: 10,
                unitType: null
            },
            {
                userId: 2,
                // grubId: 5,
                // workoutId: null,
                timestamp: new Date('2023-05-01T04:00:00Z'),
                calories: 350,
                units: 5,
                unitType: null
            },
            {
                userId: 2,
                // grubId: null,
                // workoutId: 2,
                timestamp: new Date('2023-05-01T02:00:00Z'),
                calories: 650,
                units: 5,
                unitType: 'hours'
            }
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        //   options.tableName = "Users";
        options.tableName = "DayLogs";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            username: { [Op.in]: [] }
        })
    }
}
