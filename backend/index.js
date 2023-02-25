const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const generateAccessToken = require("./generateAccessToken")
const dotenv = require('dotenv');
var cookieParser = require('cookie-parser');

// get config vars
dotenv.config();

//Make sure you have WAMP, mySQL installed

//COMMANDS TO RUN BACKEND - FIRST TIME EXECUTING THIS APP ON YOUR LAPTOP
//New terminal
//1. cd backend
//2. npm init -y
//3. npm install express mysql mysql2 cors 
//4. cd..
//5. npm install -g nodemon
//5. cd backend
//5. nodemon index --> 'Server up and running... on port 5001' if successful

//COMMANDS TO RUN FRONTEND - FIRST TIME EXECUTING THIS APP ON YOUR LAPTOP(installation of node modules takes a few minutes)
//New terminal
//1. npm install
//2. npm start

//COMMANDS TO RUN BACKEND- IF YOU ALREADY SET UP
//New terminal
//1. cd backend
//2. nodemon index

//COMMANDS TO RUN FRONTEND- IF YOU ALREADY SET UP
//New terminal
//1. npm start

//Local host 5001 for backend
//Local host 3000 for frontend
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Create Connection
const db = mysql.createConnection({
    user: "root",//default
    host: "localhost",//default
    password: "",//default
    database: "insurancedata"//to be updated
  });
  
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//################################################################### EXAMPLE BACKEND CALLS #############################################################################################
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

app.post("/verifyAccount", (req, res) => {
    const EmployeeID = req.body.EmployeeID
    const Password = req.body.Password
    const sqlSearch = "Select * from user where EmployeeID = ?"
    const search_query = mysql.format(sqlSearch, [EmployeeID])
    
    db.query(search_query, async (err, result) => {
        if (err) throw (err)
        const verified = {verification: 'failure'}
        if (result.length === 0) {
            console.log("--------> User does not exist")
            res.send(verified)
        }
        else {
            const hashedPassword = result[0].Password
            //get the hashedPassword from result
            if (await bcrypt.compare(Password, hashedPassword)) {
                console.log("---------> Login Successful")
                const token = generateAccessToken({EmployeeID: EmployeeID})
                verified.verification = 'success'
                // res.setHeader('Set-Cookie', [
                //     `accessToken=${token}; HttpOnly; Max-Age=${60000 * 15};`,
                //   ])
                console.log(token)
                verified.token = token;
                res.send(verified)
            }
            else {
                console.log("---------> Password Incorrect")
                res.send(verified)
            }
        }
    })
})

//Insert User
app.post("/createAccount", async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    // const salt = await bcrypt.genSalt(15)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const employeeID_query = "SELECT MAX(EmployeeID) FROM user"
    const sqlInsert = "INSERT INTO user VALUES (?,?,?,?,?)"

    db.query(employeeID_query, (err, result) => {
        if (err) {
            console.log(err);
          } else {
            const employeeID = result[0]['MAX(EmployeeID)'] + 1
            const insert_query = mysql.format(sqlInsert, [employeeID, hashedPassword, firstName, lastName, age])
            db.query(insert_query, (err, result) => {
                if (err) throw (err)
                console.log("--------> Created new User")
                res.sendStatus(201)
            })
        }
    })    
})

//List users
//Authenticate User login
app.get("/listUsers",(req,res)=>{
    console.log('getting all users')
    const query = `SELECT * FROM user`
    console.log('executing...',query)
    db.query(query,(err, result)=>{
        if (err) {
            console.log(err);//DB error
          } else {
            if(result.length > 0){//ALWAYS check the length of the result, else it would show an exception error
                // console.log('result',result)
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

//User Delete
app.post("/deleteUsers",(req,res)=>{
    console.log('deleting users')
    const id = req.body.id;
    const query = `DELETE FROM users WHERE id = '${id}'`
    console.log('executing...',query)
    db.query(query,(err, result)=>{
        if (err) {
            console.log(err);//DB error
          } else {
            if(result.length > 0){//ALWAYS check the length of the result, else it would show an exception error
                console.log('result',result)
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

app.patch("/editUsers",(req,res)=>{
    console.log('updating users')
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const gender = req.body.gender;
    const query = `UPDATE users SET name ='${name}' , email ='${email}', gender ='${gender}'  WHERE id = '${id}'`
    console.log('executing...',query)
    db.query(query,(err, result)=>{
        if (err) {
            console.log(err);//DB error
          } else {
            if(result.length > 0){//ALWAYS check the length of the result, else it would show an exception error
                console.log('result',result)
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
//getDashboard databased on Email
app.post("/getDashboard",(req,res)=>{
    console.log('verifying account log in')
    const email = req.body.email;
    const query = `SELECT * FROM dashboard WHERE email = '${email}'`
    console.log('executing...',query)
    db.query(query,(err, result)=>{
        if (err) {
            console.log(err);//DB error
          } else {
            if(result.length > 0){//ALWAYS check the length of the result, else it would show an exception error
                //console.log('result',result[0].email)
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

//Backend Listens to port 5001, your axios calls should be localhost:5001
app.listen(5001, ()=> console.log('Server up and running... on port 5001'));