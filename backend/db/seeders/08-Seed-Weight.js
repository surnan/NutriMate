'use strict';

// const {User, Sequelize} = require('../models');
const { Grub, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
let options = {};
// options.tableName = 'Users';
options.tableName = 'Weights';



if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        //   options.tableName = "Users";
        options.tableName = "Weights";
        return queryInterface.bulkInsert(options, [
            {
                metricSystem: true,
                start: 200,
                goal: 150,
                current: 180,
                day: new Date('2023-10-01'),
                userId: 1
            },
            {
                metricSystem: true,
                start: 200,
                goal: 150,
                current: 175,
                day: new Date('2023-11-01'),
                userId: 1
            },
            {
                metricSystem: true,
                start: 200,
                goal: 150,
                current: 170,
                day: new Date('2023-12-01'),
                userId: 1
            },
            {
                metricSystem: true,
                start: 222,
                goal: 190,
                current: 230,
                day: new Date('2022-10-10'),
                userId: 1
            },
            {
                metricSystem: true,
                start: 222,
                goal: 190,
                current: 225,
                day: new Date('2022-11-11'),
                userId: 1
            },
            {
                metricSystem: true,
                start: 222,
                goal: 190,
                current: 215,
                day: new Date('2022-12-12'),
                userId: 1
            },
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        //   options.tableName = "Users";
        options.tableName = "Weights";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            username: { [Op.in]: [] }
        })
    }
}
