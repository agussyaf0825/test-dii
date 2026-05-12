'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userRole extends Model {
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

      this.belongsTo(models.user, {
        foreignKey: 'usersId',
        as: 'user',
      });
    }
  }
  userRole.init(
    {
      usersId: DataTypes.BIGINT,
      rolesId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'userRole',
      timestamps: true,
    }
  );
  return userRole;
};
