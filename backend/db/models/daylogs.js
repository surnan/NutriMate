'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DayLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DayLog.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  DayLog.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    day: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    excerciseTimeId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    foodTimeId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
  }, {
    sequelize,
    modelName: 'DayLog',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return DayLog;
};
