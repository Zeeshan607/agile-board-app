'use strict';
import {Model} from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     this.belongsToMany(models.roles, {
        onDelete: "CASCADE",
        through: [models.role_has_permission],
        foreignKey:'permission_id',
        as:'permissions'
      });
    }
  }
  Permission.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};