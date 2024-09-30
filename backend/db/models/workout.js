'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Workout.hasMany(models.WorkoutIcon, { foreignKey: 'workoutId' })
      Workout.hasMany(models.WorkoutImage, { foreignKey: 'workoutId' })
      Workout.hasMany(models.DayLog, { foreignKey: 'workoutId' })
      Workout.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Workout.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
        isNameValid(value) {
          if (value < 2) {
            throw new Error('Name too short.');
          } else if (value > 30) {
            throw new Error('Name too long.');
          }
        }
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
