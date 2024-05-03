import {DataTypes} from 'sequelize';
import sequelize from '../db.js'; // Assuming you have a Sequelize instance set up
import Role from './Role.js';


const User = sequelize.define('User', {
    // Define model attributes
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    
        role_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model:Role,
                key:'id'
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }

});
// Relations
Role.hasMany(User,{onDelete: 'CASCADE',foreignKey:{ allowNull: false,name:"role_id"}});
User.belongsTo(Role,{as:"Role", foreignKey:{ allowNull: false,name:"role_id"}});

        
//Methods
User.prototype.hideSensitiveInfo=function(){
   // Create a copy of the instance object
  const instance = this.toJSON();
  // Remove sensitive properties from the copy
  delete instance.password;

  return instance;

};

export default User;


















// import mongoose from 'mongoose';

// const UserSchema= new mongoose.Schema({
//     username:String,
//     email:String,
//     password:String,
//     role:{
//         type:String, 
//         enum: ['admin','user','developer','project_manager'],
//         default:'admin'
//     }


    
// },{timestamps:true})
// UserSchema.methods.withoutPassword=function(){
//     const obj=this.toObject();
//     delete obj.password;
//     return obj;
// }
// export default mongoose.model('User', UserSchema);