'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Excercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Excercise.init({
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
    excerciseImg: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    iconId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Excercise',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Excercise;
};
