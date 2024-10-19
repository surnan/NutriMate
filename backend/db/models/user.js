// backend/db/models/user.js
'use strict';
const {Model,Validator} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Grub, {foreignKey: 'userId'})
      User.hasMany(models.Workout, {foreignKey: 'userId'})
      User.hasMany(models.DayLog, {foreignKey: 'userId'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      // type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    profileImg: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
