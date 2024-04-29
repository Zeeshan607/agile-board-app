import {Model} from 'sequelize';


module.exports = (sequelize, DataTypes) => {
  class Role_Has_Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role, {
        foreignKey:'role_id',
      });
      this.belongsTo(models.Permission, {
        foreignKey:'permission_id',
      });
    }
  }
Role_Has_Permission.init({
    role_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Role_Has_Permission',
  });

return Role_Has_Permission;
}