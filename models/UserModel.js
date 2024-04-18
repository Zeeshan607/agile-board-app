import {DataTypes} from 'sequelize';
import sequelize from '../db.js'; // Assuming you have a Sequelize instance set up

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
        role:{
            type: DataTypes.STRING,
            allowNull:false,
            
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }

})

User.prototype.passwordLessUser=function(){
   
}

export default  User;


















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