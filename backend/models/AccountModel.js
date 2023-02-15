import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

//OBJECT Models in DB --> change depends on DB
//ONE MODEL per FILE
const Account = db.define('accounts',{
    //Primary Key needs to be indicated
    email: {type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    password: DataTypes.STRING
},{
    freezeTableName:true,
    timestamps: false
});

export default Account;

(async()=>{
    await db.sync();
})();