
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

const roleCount=await Role.count();

if(roleCount==0 || roleCount <2){
  try{
  await sequelize.transaction(function(t) {
    var options = { raw: true, transaction: t }
    sequelize
      .query('SET FOREIGN_KEY_CHECKS = 0', null, options)
      .then(function() {
        return sequelize.query('truncate table roles', null, options)
      })
      .then(function() {
        return sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options)
      })
      .then(function() {
        return t.commit()
      })
  })
  }catch(err){
    console.log("Role model Transaction error: "+err);
  }
    await Role.bulkCreate([
      {id:1,title:"admin",createdAt:new Date(), updatedAt:new Date()},
      {id:2,title:"member",createdAt:new Date(), updatedAt:new Date()},
    ])
} 


export default Role;
