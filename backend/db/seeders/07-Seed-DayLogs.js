'use strict';

const {DayLog, Sequelize} = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
options.tableName = 'DayLogs';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}


module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "DayLogs";
    return queryInterface.bulkInsert(options, [
      {
        timestamp: new Date('2024-10-17T01:00:00'), 
        name: 'hamburger', 
        calories: 600, 
        units: 2, 
        unitType: 'servings', 
        userId: 2,
        grubId: 1,
        workoutId: null, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: new Date('2024-10-16T08:00:00'), 
        name: 'hotdog', 
        calories: 250, 
        units: 1, 
        unitType: 'servings', 
        userId: 3, 
        grubId: 2,
        workoutId: null, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: new Date('2024-10-16T09:00:00'), 
        name: 'ice cream', 
        calories: 300, 
        units: 0.5, 
        unitType: 'servings', 
        userId: 3, 
        grubId: 3,
        workoutId: null, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: new Date('2024-10-17T10:00:00'), 
        name: 'grill chicken salad', 
        calories: 350, 
        units: 1, 
        unitType: 'servings', 
        userId: 2, 
        grubId: 4,
        workoutId: null, 
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
        grubId: null,
        workoutId: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: new Date('2024-10-17T18:00:00'), 
        name: 'cycling', 
        calories: 650, 
        units: 30, 
        unitType: 'minutes', 
        userId: 2, 
        grubId: null,
        workoutId: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "DayLog";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: {[Op.in]: []}
    })
  }
};