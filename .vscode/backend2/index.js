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

//Methods - call any methods from the database specified ^ in db
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

//Authenticate User login
app.post("/verifyAccount",(req,res)=>{
    console.log('verifying account log in')
    const email = req.body.email;
    const password = req.body.password;
    const query = `SELECT * FROM accounts WHERE email = '${email}' AND password = '${password}'`
    console.log('executing...',query)
    db.query(query,(err, result)=>{
        if (err) {
            console.log(err);//DB error
          } else {
            if(result.length > 0){//ALWAYS check the length of the result, else it would show an exception error
                console.log('result',result[0].email)
                res.send(result);
            }
            else
            {
                console.log('No account found in DB')
                res.send(result)
            }
        }
    })
})

app.post("/createAccount",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const query = `INSERT INTO accounts (email, password) VALUES ('${email}', '${password}')`
    db.query(query,(err, result)=>{
        if (err) {
            console.log(err);
            res.status(400);
            res.send(err);
          } else {
            console.log('Account created')
            console.log('result',result)
            res.status(200)
            res.send(result);
        }
    })

})

//Backend Listens to port 5001, your axios calls should be localhost:5001
app.listen(5001, ()=> console.log('Server up and running... on port 5001'));