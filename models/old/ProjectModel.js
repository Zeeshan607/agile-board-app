import {DataTypes} from 'sequelize';
import sequelize from '../db.js'; // Assuming you have a Sequelize instance set up

const Project = sequelize.define('Project', {
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
            description:{
                type:DataTypes.TEXT('long'),
                allowNull:false
            },
            createdBy:{
                type:DataTypes.BIGINT,
                allowNull:false
            },

})
export default  Project;





// import  mongoose  from "mongoose";

// const ProjectSchema= new mongoose.Schema({

//     name:String,
//     description:String,
//     createdBy:{
//         type:mongoose.Types.ObjectId,
//         ref:'User'
//     }


// },{timestamps:true})

// export default mongoose.model('Project',ProjectSchema)