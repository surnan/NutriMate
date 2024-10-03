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
      // many to many with Food
      // many to many with Workout
    }
  }
  DayLog.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Users'}
    },
    // foodId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {model: 'Foods'}
    // },
    // workoutId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {model: 'Workouts'}
    // },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    unitType: {
      type: DataTypes.STRING(15),
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
