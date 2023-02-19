const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
//import UserRoute from "./routes/UserRoute.js";
//COMMANDS TO RUN - IF YOU ALREADY SET UP
//1. cd backend
//5. nodemon index

//COMMANDS TO RUN - FIRST TIME
//1. cd backend
//2. npm init -y
//3. npm install express mysql2 sequelize cors
//4. npm install -g nodemon
//5. nodemon index --> to ensure it runs properly

//Local host 5001 for backend
//Local host 3000 for frontend
app.use(cors());
app.use(express.json());

//Create Connection
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "crud_db"
  });
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/getAccounts",(req,res)=>{
    console.log('running query... getAccount')
    db.query("SELECT * FROM accounts",(err, result)=>{
        if (err) {
            console.log(err);
          } else {
            console.log('results')
            res.send(result);
        }
    })
})

app.listen(5001, ()=> console.log('Server up and running... on port 5001'));