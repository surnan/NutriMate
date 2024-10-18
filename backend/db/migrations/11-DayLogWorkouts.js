// backend/db/11-DayLogWorkout.js
'use strict';

let options = {};
options.tableName = 'DayLogWorkouts';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // schema defined in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DayLogWorkouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dayLogId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'DayLogs',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      workoutId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Workouts',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DayLogWorkouts');
  }
};
