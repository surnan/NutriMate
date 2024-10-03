'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrubImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GrubImage.belongsTo(models.User, {foreignKey: 'userId' })
      GrubImage.belongsTo(models.Grub, {foreignKey: 'grubId'})
    }
  }
  GrubImage.init({
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
  },
    grubId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Grubs' }
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
