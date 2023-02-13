import {Sequelize} from "sequelize";


//Connect to DB
const db = new Sequelize('crud_db','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;