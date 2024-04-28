import {Model, DataTypes} from 'sequelize';
import sequelize from '../db';

  class Role_Has_Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
Role_Has_Permission.init({
    role_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Role_Has_Permission',
  });

export default Role_Has_Permission;
