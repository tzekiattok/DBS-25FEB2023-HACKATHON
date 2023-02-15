import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

//OBJECT Models in DB --> change depends on DB
//ONE MODEL per FILE
const User = db.define('users',{
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING
},{
    freezeTableName:true
    
});

export default User;

(async()=>{
    await db.sync();
})();