'use strict';

const { Grub, Workout, Users, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
let options = {};
options.tableName = 'DayLogs';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}


module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('DayLogs', [
      {
        timestamp: new Date('2024-10-17T01:00:00'), 
        name: 'hamburger', 
        calories: 600, 
        units: 2, 
        unitType: 'each', 
        userId: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: new Date('2024-10-16T08:00:00'), 
        name: 'hotdog', 
        calories: 250, 
        units: 1, 
        unitType: 'each', 
        userId: 3, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: new Date('2024-10-16T09:00:00'), 
        name: 'ice cream', 
        calories: 300, 
        units: 0.5, 
        unitType: '', 
        userId: 3, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: new Date('2024-10-17T10:00:00'), 
        name: 'grill chicken salad', 
        calories: 350, 
        units: 1, 
        unitType: 'Table Spoons', 
        userId: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: new Date('2024-10-16T19:00:00'), 
        name: 'running', 
        calories: 300, 
        units: 1, 
        unitType: 'hour', 
        userId: 3, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: new Date('2024-10-17T18:00:00'), 
        name: 'cycling', 
        calories: 650, 
        units: 0.5, 
        unitType: 'swimming', 
        userId: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('DayLogs', null, {});
  }
};