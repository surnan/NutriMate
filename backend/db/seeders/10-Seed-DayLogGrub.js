'use strict';

const { Grub, Workout, Users, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
let options = {};
options.tableName = 'DayLogGrubs';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('DayLogGrubs', [
      {
        dayLogId: 1, 
        grubId: 1,   
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dayLogId: 2, 
        grubId: 2,   
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dayLogId: 3, 
        grubId: 3,   
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('DayLogGrubs', null, {});
  }
};
