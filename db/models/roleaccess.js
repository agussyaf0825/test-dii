'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roleAccess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.role, {
        foreignKey: 'rolesId',
        as: 'role',
      });

      this.belongsTo(models.menu, {
        foreignKey: 'menusId',
        as: 'menu',
      });
    }
  }
  roleAccess.init(
    {
      rolesId: DataTypes.BIGINT,
      menusId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'roleAccess',
      timestamps: true,
    }
  );
  return roleAccess;
};
