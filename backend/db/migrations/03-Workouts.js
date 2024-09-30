'use strict';

let options = {};
options.tableName = 'Workouts';
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
      name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users' },
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
