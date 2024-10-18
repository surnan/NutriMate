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
        timestamp: new Date(), // Current timestamp
        name: 'Breakfast', // Example log name
        calories: 500, // Calories logged
        units: 1.5, // Number of units consumed
        unitType: 'serving', // Unit type of the consumed item
        userId: 1, // Foreign key referencing the User table
        grubId: 1, // Assuming this DayLog entry relates to a Grub (must provide either grubId or workoutId)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: new Date(), // Current timestamp
        name: 'Lunch', // Example log name
        calories: 800, // Calories logged
        units: 2, // Number of units consumed
        unitType: 'serving', // Unit type of the consumed item
        userId: 2, // Foreign key referencing the User table
        workoutId: 1, // Assuming this DayLog entry relates to a Workout (must provide either grubId or workoutId)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: new Date(), // Current timestamp
        name: 'Afternoon Snack', // Example log name
        calories: 200, // Calories logged
        units: 1, // Number of units consumed
        unitType: 'piece', // Unit type of the consumed item
        userId: 3, // Foreign key referencing the User table
        grubId: 2, // This DayLog entry relates to a Grub
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: new Date(), // Current timestamp
        name: 'Dinner', // Example log name
        calories: 900, // Calories logged
        units: 1, // Number of units consumed
        unitType: 'plate', // Unit type of the consumed item
        userId: 1, // Foreign key referencing the User table
        workoutId: 2, // This DayLog entry relates to a Workout
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        timestamp: new Date(), // Current timestamp
        name: 'Evening Snack', // Example log name
        calories: 150, // Calories logged
        units: 0.5, // Number of units consumed
        unitType: 'cup', // Unit type of the consumed item
        userId: 2, // Foreign key referencing the User table
        grubId: 3, // This DayLog entry relates to a Grub
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('DayLogs', null, {});
  }
};
