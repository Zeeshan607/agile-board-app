import {DataTypes} from 'sequelize';
import sequelize from '../db.js'; // Assuming you have a Sequelize instance set up


const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },



})

export default Role;