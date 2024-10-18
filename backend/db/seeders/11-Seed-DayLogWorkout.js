'use strict';

const { Grub, Workout, Users, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
let options = {};
options.tableName = 'DayLogWorkouts';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('DayLogWorkouts', [
      {
        dayLogId: 4, // Assuming you have DayLog with ID 4
        workoutId: 1, // Assuming you have Workout with ID 1
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dayLogId: 5, // DayLog ID 5
        workoutId: 2, // Workout ID 2
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('DayLogWorkouts', null, {});
  }
};
