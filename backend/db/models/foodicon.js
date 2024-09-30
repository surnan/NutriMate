'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodIcon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FoodIcon.belongsTo(models.User, { foreignKey: 'userId' })
      FoodIcon.belongsTo(models.Food, { foreignKey: 'foodId' })
    }
  }
  FoodIcon.init({
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    foodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Foods' }
    }
  }, {
    sequelize,
    modelName: 'FoodIcon',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return FoodIcon;
};
