'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Weight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Weight.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Weight.init({
    metricSystem: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    start: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    goal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    current: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    }
  }, {
    sequelize,
    modelName: 'Weight',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Weight;
};
