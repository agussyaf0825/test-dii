'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.role, {
        through: models.userRole,
        foreignKey: 'usersId',
        otherKey: 'rolesId',
        as: 'roles',
      });
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
      timestamps: true,
    }
  );
  return user;
};
