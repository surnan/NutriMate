// backend/db/models/workoutimages.js
'use strict';
const {Model, Validator} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkoutImage extends Model {
    static associate(models) {
      WorkoutImage.belongsTo(models.Workout, { foreignKey: 'workoutId' })
    }
  }
  WorkoutImage.init({
    name: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    workoutId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Workouts' },
      onDelete: "CASCADE"
    }
  }, {
    sequelize,
    modelName: 'WorkoutImage',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return WorkoutImage;
};
