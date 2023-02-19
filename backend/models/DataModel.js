import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

//OBJECT Models in DB --> change depends on DB
//ONE MODEL per FILE
const Data = db.define('data',{
    //Primary Key needs to be indicated
    email: DataTypes.STRING,
    item: DataTypes.STRING
},{
    freezeTableName:true,
    timestamps: false
});

export default Data;

(async()=>{
    await db.sync();
})();