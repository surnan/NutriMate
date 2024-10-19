// backend/db/10-DayLogGrubs.js
'use strict';

let options = {};
options.tableName = 'DayLogGrubs';
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
      dayLogId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'DayLogs'},
        onDelete: 'CASCADE'
      },
      grubId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Grubs'},
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(options);
  }
};
