'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrubIcon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GrubIcon.belongsTo(models.Grub, { foreignKey: 'grubId' })
    }
  }
  GrubIcon.init({
    name: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    grubId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Grubs' }
    }
  }, {
    sequelize,
    modelName: 'GrubIcon',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return GrubIcon;
};
