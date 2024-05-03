
import { Model, DataTypes } from "sequelize";
import sequelize from "../db.js";
import Permission from './Permission.js';

const Role =sequelize.define('Role',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
title:{
    type:DataTypes.STRING,
    allowNull:false,
},

  });


 Role.belongsToMany(Permission, {
    onDelete: "RESTRICT",
    through: "Role_Has_Permission",
    foreignKey:'role_id',
    constraints:false,
    as:'roles'
  });
Permission.belongsToMany(Role,{
  onDelete: "RESTRICT",
  through: "Role_Has_Permission",
  foreignKey:'permission_id',
  constraints:false,
  as:'permissions'
})

export default Role;
