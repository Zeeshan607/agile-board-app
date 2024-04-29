'use strict';
import {Model} from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     this.belongsToMany(models.permission, {
        onDelete: "CASCADE",
        through: [models.role_has_permission],
        foreignKey:'role_id',
        as:'roles'
      });
    }
  }
  Role.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};