import {DataTypes} from 'sequelize';
import sequelize from '../db.js'; // Assuming you have a Sequelize instance set up
import User from './UserModel.js';
import Role from './RoleModel.js';


const User_Has_Roles = sequelize.define('User_Has_Roles', {
   id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
   user_id: {
        type: DataTypes.INTEGER,
        allowNull:true,
      
       
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull:true,
      
    },




})




export default User_Has_Roles;