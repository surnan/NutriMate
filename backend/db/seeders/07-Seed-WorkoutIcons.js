'use strict';

// const {User, Sequelize} = require('../models');
const { Grub, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
let options = {};
// options.tableName = 'Users';
options.tableName = 'WorkoutIcons';



if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        //   options.tableName = "Users";
        options.tableName = "WorkoutIcons";
        return queryInterface.bulkInsert(options, [
            {
                url: 'https://www.home-mega.com/wp-content/uploads/2021/08/4416-Monticello-Ave-28-1-scaled.jpg',
                workoutId: 1,
                userId: 1,
            },
            {
                url: 'https://photos.zillowstatic.com/fp/828db8b15f2e8c98075e9448e6912b38-p_e.jpg',
                workoutId: 2,
                userId: 2,
            },
            {
                url: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/87b3605e6bd9499e38ec39ad6236f455-full.jpg',
                workoutId: 3,
                userId: 1,
            },
            {
                url: 'https://d1ja9tyo8nbkbc.cloudfront.net/45929683_S0440/S0440/S0440-R0100/ONEH6297093/ONEH6297093-2.jpg',
                workoutId: 4,
                userId: 2,
            },
            {
                url: 'https://d1ja9tyo8nbkbc.cloudfront.net/45929683_S0440/S0440/S0440-R0100/ONE3561922/ONE3561922-2.jpg',
                workoutId: 5,
                userId: 1,
            }
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        //   options.tableName = "Users";
        options.tableName = "WorkoutIcons";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            username: { [Op.in]: [] }
        })
    }
}
