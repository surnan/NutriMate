'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkoutIcon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WorkoutIcon.belongsTo(models.Workout, { foreignKey: 'workoutId' })
    }
  }
  WorkoutIcon.init({
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
    modelName: 'WorkoutIcon',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return WorkoutIcon;
};
