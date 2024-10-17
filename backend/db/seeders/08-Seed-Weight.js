'use strict';

const { Grub, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
let options = {};
options.tableName = 'Weights';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "Weights";
        return queryInterface.bulkInsert(options, [
            {
                metricSystem: true,
                start: 200,
                goal: 150,
                current: 200,
                day: new Date('2023-10-01'),
                userId: 2
            },
            {
                metricSystem: true,
                start: 200,
                goal: 150,
                current: 185,
                day: new Date('2023-11-01'),
                userId: 2
            },
            {
                metricSystem: true,
                start: 200,
                goal: 150,
                current: 180,
                day: new Date('2023-12-01'),
                userId: 2
            },
            {
                metricSystem: true,
                start: 222,
                goal: 150,
                current: 180,
                day: new Date('2024-01-10'),
                userId: 2
            },
            {
                metricSystem: true,
                start: 222,
                goal: 150,
                current: 175,
                day: new Date('2024-02-11'),
                userId: 2
            },
            {
                metricSystem: true,
                start: 222,
                goal: 150,
                current: 170,
                day: new Date('2024-10-11'),
                userId: 3
            },
            {
                metricSystem: true,
                start: 200,
                goal: 150,
                current: 168,
                day: new Date('2024-09-01'),
                userId: 3
            },
            {
                metricSystem: true,
                start: 200,
                goal: 150,
                current: 170,
                day: new Date('2024-08-01'),
                userId: 3
            },
            {
                metricSystem: true,
                start: 200,
                goal: 150,
                current: 165,
                day: new Date('2024-07-01'),
                userId: 3
            },
            {
                metricSystem: true,
                start: 222,
                goal: 150,
                current: 162,
                day: new Date('2024-06-10'),
                userId: 3
            },
            {
                metricSystem: true,
                start: 222,
                goal: 190,
                current: 225,
                day: new Date('2024-05-11'),
                userId: 3
            },
            {
                metricSystem: true,
                start: 250,
                goal: 160,
                current: 250,
                day: new Date('2024-04-12'),
                userId: 3
            },
            {
                metricSystem: true,
                start: 200,
                goal: 150,
                current: 180,
                day: new Date('2024-03-01'),
                userId: 3
            },
            {
                metricSystem: true,
                start: 200,
                goal: 150,
                current: 175,
                day: new Date('2024-02-01'),
                userId: 3
            },
            {
                metricSystem: true,
                start: 200,
                goal: 150,
                current: 170,
                day: new Date('2024-01-01'),
                userId: 3
            },
            {
                metricSystem: true,
                start: 222,
                goal: 190,
                current: 230,
                day: new Date('2023-10-10'),
                userId: 3
            },
            {
                metricSystem: true,
                start: 222,
                goal: 190,
                current: 225,
                day: new Date('2023-11-11'),
                userId: 3
            },
            {
                metricSystem: true,
                start: 222,
                goal: 190,
                current: 215,
                day: new Date('2023-12-12'),
                userId: 3
            },
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = "Weights";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            username: { [Op.in]: [] }
        })
    }
}
