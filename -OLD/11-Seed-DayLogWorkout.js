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
        dayLogId: 4, 
        workoutId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dayLogId: 5, 
        workoutId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('DayLogWorkouts', null, {});
  }
};
