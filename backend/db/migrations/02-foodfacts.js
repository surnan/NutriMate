'use strict';

let options = {};
options.tableName = 'FoodFacts';
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
        allowNull: false,
      },
      calories: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      servingSize: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      servingUnit: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.DECIMAL,
        allowNull: true,
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
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      iconId: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
