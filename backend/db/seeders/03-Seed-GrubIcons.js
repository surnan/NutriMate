'use strict';

const { Grub, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
let options = {};
options.tableName = 'GrubIcons';



if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "GrubIcons";
        return queryInterface.bulkInsert(options, [
            {
                url: 'https://www.home-mega.com/wp-content/uploads/2021/08/4416-Monticello-Ave-28-1-scaled.jpg',
                grubId: 1,
                name: "one.jpg"
            },
            {
                url: 'https://photos.zillowstatic.com/fp/828db8b15f2e8c98075e9448e6912b38-p_e.jpg',
                grubId: 2,
                name: "two.jpg"
            },
            {
                url: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/87b3605e6bd9499e38ec39ad6236f455-full.jpg',
                grubId: 3,
                name: "three.jpg"
            },
            {
                url: 'https://d1ja9tyo8nbkbc.cloudfront.net/45929683_S0440/S0440/S0440-R0100/ONEH6297093/ONEH6297093-2.jpg',
                grubId: 4,
                name: "four.jpg"
            },
            {
                url: 'https://d1ja9tyo8nbkbc.cloudfront.net/45929683_S0440/S0440/S0440-R0100/ONE3561922/ONE3561922-2.jpg',
                grubId: 5,
                name: "five.jpg"
            },
            {
                url: 'https://www.compass.com/m/3aca145551c3be57f5147df19ebca2ed7074a8ca_img_0_12fd3/origin.jpg',
                grubId: 6,
                name: "six.jpg"
            },
            {
                url: 'https://www.home-mega.com/wp-content/uploads/2021/08/4416-Monticello-Ave-28-1-scaled.jpg',
                grubId: 7,
                name: "seven.jpg"
            },
            {
                url: 'https://photos.zillowstatic.com/fp/828db8b15f2e8c98075e9448e6912b38-p_e.jpg',
                grubId: 8,
                name: "eight.jpg"
            },
            {
                url: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/87b3605e6bd9499e38ec39ad6236f455-full.jpg',
                grubId: 9,
                name: "nine.jpg"
            },
            {
                url: 'https://d1ja9tyo8nbkbc.cloudfront.net/45929683_S0440/S0440/S0440-R0100/ONEH6297093/ONEH6297093-2.jpg',
                grubId: 10,
                name: "ten.jpg"
            },
            {
                url: 'https://d1ja9tyo8nbkbc.cloudfront.net/45929683_S0440/S0440/S0440-R0100/ONE3561922/ONE3561922-2.jpg',
                grubId: 11,
                name: "eleven.jpg"
            },
            {
                url: 'https://www.compass.com/m/3aca145551c3be57f5147df19ebca2ed7074a8ca_img_0_12fd3/origin.jpg',
                grubId: 12,
                name: "twelve.jpg"
            },

        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = "GrubIcons";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            username: { [Op.in]: [] }
        })
    }
}
