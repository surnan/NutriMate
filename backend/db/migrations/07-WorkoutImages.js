'use strict';

let options = {};
options.tableName = 'WorkoutImages';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // schema defined in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(options, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      foodId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users' },
        onDelete: 'CASCADE'
      },
      workoutId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Workouts' },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable(options);
  }
};
