
import {DataTypes} from 'sequelize';
import sequelize from '../db.js'; // Assuming you have a Sequelize instance set up
import User from './UserModel.js';

const Board = sequelize.define('Board', {
    // Define model attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
       type: DataTypes.STRING,
       allowNull:false
    },
    slug:{
        type: DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdBy:{
        type:DataTypes.INTEGER,
        allowNull:false,
        reference:{
            model:User,
            key:'id'
        }
    },
  
    is_deleted:{
        type:DataTypes.DATE,
        default:null
    },


});

export default Board;


// sequalize default model template
// id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
// },
// username: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
// },
// password: {
//     type: DataTypes.STRING,
//     allowNull: false
// }










// old mongoose db model code



// import mongoose from 'mongoose';

// const BoardSchema= new mongoose.Schema({
//     name:String,
//     description:String,
//     createdBy:{
//         type:mongoose.Types.ObjectId,
//         ref:'User'
//     },
//     order:Number,
  
//     projectId:{
//         type:mongoose.Types.ObjectId,
//         ref:'Project'
//     },
//     is_deleted:{
//         type:Date,
//         default:null
//     },



    
// },{timestamps:true})

// export default mongoose.model('Board',BoardSchema);
