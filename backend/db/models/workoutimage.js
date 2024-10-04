'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkoutImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
      references: { model: 'Workouts' }
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
