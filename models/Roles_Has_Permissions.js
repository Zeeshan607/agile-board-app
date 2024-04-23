
const Roles_Has_Permissions= sequelize.define('Roles_Has_Permissions', {
    id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
     },

     role_id: {
         type: DataTypes.INTEGER,
         allowNull:true,
       
     },
     permission_id: {
        type: DataTypes.INTEGER,
        allowNull:true,
      
       
    },
 
 
 
 })
 
 
 
 
 export default Roles_Has_Permissions;