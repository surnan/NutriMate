'use strict';

let options = {};
options.tableName = 'ExcerciseTimes';
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
      excerciseId:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      timestamp:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      calories: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      units: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unitType: {
        type: Sequelize.STRING(30),
        allowNull: false,
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
