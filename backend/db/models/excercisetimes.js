'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExcerciseTimes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExcerciseTimes.init({
    excerciseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unitType: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ExcerciseTimes',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return ExcerciseTimes;
};
