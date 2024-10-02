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
      WorkoutImage.belongsTo(models.User, { foreignKey: 'userId' })
      WorkoutImage.belongsTo(models.Workout, { foreignKey: 'workoutId' })
    }
  }
  WorkoutImage.init({
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
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
