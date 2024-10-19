// backend/db/models/grubimages.js
'use strict';
const {Model, Validator} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrubImage extends Model {
    static associate(models) {
      GrubImage.belongsTo(models.Grub, {foreignKey: 'grubId'})
    }
  }
  GrubImage.init({
    name: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    grubId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Grubs' },
      onDelete: "CASCADE"
    }
  }, {
    sequelize,
    modelName: 'GrubImage',
    defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
    }
  });
  return GrubImage;
};
