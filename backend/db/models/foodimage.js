'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FoodImage.belongsTo(models.User, {foreignKey: 'userId' })
      FoodImage.belongsTo(models.Food, {foreignKey: 'foodId'})
    }
  }
  FoodImage.init({
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
    modelName: 'FoodImage',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return FoodImage;
};
