// backend/db/models/workout.js
'use strict';
const {Model, Validator} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    static associate(models) {
      Workout.belongsTo(models.User, { foreignKey: 'userId' })
      Workout.hasMany(models.DayLog, { foreignKey: 'workoutId' })
      Workout.hasMany(models.WorkoutImage, { foreignKey: 'workoutId' })
    }
  }
  Workout.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 500]
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
  }, {
    sequelize,
    modelName: 'Workout',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Workout;
};
