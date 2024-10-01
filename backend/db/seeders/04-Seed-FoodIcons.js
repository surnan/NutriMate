'use strict';

// const {User, Sequelize} = require('../models');
const { Food, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
let options = {};
// options.tableName = 'Users';
options.tableName = 'FoodIcons';



if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        //   options.tableName = "Users";
        options.tableName = "FoodIcons";
        return queryInterface.bulkInsert(options, [
            {
                url: 'https://www.home-mega.com/wp-content/uploads/2021/08/4416-Monticello-Ave-28-1-scaled.jpg',
                foodId: 1,
                userId: 1,
            },
            {
                url: 'https://photos.zillowstatic.com/fp/828db8b15f2e8c98075e9448e6912b38-p_e.jpg',
                foodId: 2,
                userId: 2,
            },
            {
                url: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/87b3605e6bd9499e38ec39ad6236f455-full.jpg',
                foodId: 3,
                userId: 1,
            },
            {
                url: 'https://d1ja9tyo8nbkbc.cloudfront.net/45929683_S0440/S0440/S0440-R0100/ONEH6297093/ONEH6297093-2.jpg',
                foodId: 4,
                userId: 2,
            },
            {
                url: 'https://d1ja9tyo8nbkbc.cloudfront.net/45929683_S0440/S0440/S0440-R0100/ONE3561922/ONE3561922-2.jpg',
                foodId: 5,
                userId: 1,
            },
            {
                url: 'https://www.compass.com/m/3aca145551c3be57f5147df19ebca2ed7074a8ca_img_0_12fd3/origin.jpg',
                foodId: 6,
                userId: 2,
            },

        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        //   options.tableName = "Users";
        options.tableName = "FoodIcons";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            username: { [Op.in]: [] }
        })
    }
}
