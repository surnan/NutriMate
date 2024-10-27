'use strict';

const { Grub, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
let options = {};
options.tableName = 'GrubImages';



if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "GrubImages";
        return queryInterface.bulkInsert(options, [
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/1730057529100.png',
                grubId: 1,
                name: "one-img.jpg"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/1730057529227.png',
                grubId: 2,
                name: "two-img.jpg"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/output.jpg',
                grubId: 3,
                name: "three-img.jpg"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9327.jpg',
                grubId: 4,
                name: "four-img.jpg"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9326.jpg',
                grubId: 5,
                name: "five-img.jpg"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9325.jpg',
                grubId: 6,
                name: "six-img.jpg"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9324.jpg',
                grubId: 7,
                name: "sevem-img.jpg"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9323.jpg',
                grubId: 8,
                name: "eight-img.jpg"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9322.jpg',
                grubId: 9,
                name: "nine-img.jpg"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9321.jpg',
                grubId: 10,
                name: "ten-img.jpg"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9320.jpg',
                grubId: 11,
                name: "eleven-img.jpg"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9319.jpg',
                grubId: 12,
                name: "twelve-img.jpg"
            },

        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = "GrubImages";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            username: { [Op.in]: [] }
        })
    }
}
