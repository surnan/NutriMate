'use strict';

const { Grub, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
let options = {};
options.tableName = 'WorkoutImages';



if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        options.tableName = "WorkoutImages";
        return queryInterface.bulkInsert(options, [
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9137.jpg',
                workoutId: 1,
                name: "file-a"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9111.jpg',
                workoutId: 2,
                name: "file-b"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9021.jpg',
                workoutId: 3,
                name: "file-c"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9006.jpg',
                workoutId: 4,
                name: "file-d"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_8477.jpg',
                workoutId: 5,
                name: "file-e"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/DarkWater.png',
                workoutId: 6,
                name: "file-f"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/cycling.jpg',
                workoutId: 7,
                name: "file-g"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/cutie.png',
                workoutId: 8,
                name: "file-h"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/1730057908818.jpg',
                workoutId: 9,
                name: "file-i"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/1730057865862.png',
                workoutId: 10,
                name: "file-j"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9323.jpg',
                workoutId: 11,
                name: "file-k"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9324.jpg',
                workoutId: 12,
                name: "file-l"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9326.jpg',
                workoutId: 13,
                name: "file-m"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/IMG_9327.jpg',
                workoutId: 14,
                name: "file-n"
            },
            {
                url: 'https://nutrimatebucket.s3.amazonaws.com/1730057529227.png',
                workoutId: 15,
                name: "file-o"
            }
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        options.tableName = "WorkoutImages";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            username: { [Op.in]: [] }
        })
    }
}
