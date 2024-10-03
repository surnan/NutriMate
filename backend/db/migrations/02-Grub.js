// backend/db/02-Grubs.js
'use strict';

let options = {};
options.tableName = 'Grubs';
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
      servingSize: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      servingUnit: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      calories: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      protein: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fats: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      carbs: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      sugar: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      company: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users' },
        allowNull: false,
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
