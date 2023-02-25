const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
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

//Create Connection
const db = mysql.createConnection({
    user: "root", //default
    host: "localhost", //default
    password: "", //default
    database: "InsuranceData", //to be updated
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

//################################################################### EXAMPLE BACKEND CALLS #############################################################################################
//Methods - call any methods from the database specified ^ in db
app.get("/getAccounts", (req, res) => {
    console.log("running query... getAccount");
    db.query("SELECT * FROM accounts", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("results");
            res.send(result);
        }
    });
});

// Return list of policies based on employeeId
// TO DO: INPUT THE EMPLOYEE ID GIVEN
app.get("/getPolicies",(req,res)=>{
    console.log('running query... getPolicies')
    const employeeId = req.query.employeeId;
    const query = `SELECT * FROM insurancepolicies WHERE EmployeeID = ${employeeId}`
    db.query(query,(err, result)=>{
        if (err) {
            console.log(err);
          } else {
            console.log('results')
            res.send(result);
        }
    })
})

// Return list of claim records based on insuranceId
app.get("/getClaims",(req,res)=>{
    console.log('running query... getClaims')
    const insuranceId = req.body.insuranceId;
    const query = `SELECT * FROM insuranceclaims WHERE InsuranceID = ${insuranceId}`
    db.query(query,(err, result)=>{
        if (err) {
            console.log(err);
          } else {
            console.log('results')
            res.send(result);
        }
    })
})

//Insert User
app.post("/createClaim", (req, res) => {
    const employeeId = req.body.employeeId;
    const insuranceId = req.body.insuranceId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const date = req.body.date;
    const claimAmt = req.body.claimAmt;
    const purpose = req.body.purpose;
    const followUp = req.body.followUp;
    const prevClaimId = req.body.prevClaimId;
    const status = 'Pending' // everytime create new claim -> status is pending
    const lastEditedClaimDate = new String(Date());
    const query = `INSERT INTO insuranceclaims 
    (employeeId, insuranceId, firstName, lastName, date, claimAmt, purpose, followUp, prevClaimId, status, lastEditedClaimDate) VALUES 
    ('${employeeId}', '${insuranceId}', '${firstName}', '${lastName}', '${date}', '${claimAmt}', '${purpose}', '${followUp}', '${prevClaimId}', '${status}', '${lastEditedClaimDate}')`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send(err);
        } else {
            console.log("Claim created");
            console.log("result", result);
            res.status(200);
            res.send(result);
        }
    });
});

//Authenticate User login
app.post("/verifyAccount", (req, res) => {
    console.log("verifying account log in");
    const email = req.body.email;
    const password = req.body.password;
    const query = `SELECT * FROM accounts WHERE email = '${email}' AND password = '${password}'`;
    console.log("executing...", query);
    db.query(query, (err, result) => {
        if (err) {
            console.log(err); //DB error
        } else {
            if (result.length > 0) {
                //ALWAYS check the length of the result, else it would show an exception error
                console.log("result", result[0].email);
                res.send(result);
            } else {
                console.log("No account found in DB");
                res.send(result);
            }
        }
    });
});
//Insert User
app.post("/createAccount", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const query = `INSERT INTO accounts (email, password) VALUES ('${email}', '${password}')`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send(err);
        } else {
            console.log("Account created");
            console.log("result", result);
            res.status(200);
            res.send(result);
        }
    });
});

//List users
//Authenticate User login
app.get("/listUsers", (req, res) => {
    console.log("getting all users");
    const query = `SELECT * FROM users`;
    console.log("executing...", query);
    db.query(query, (err, result) => {
        if (err) {
            console.log(err); //DB error
        } else {
            if (result.length > 0) {
                //ALWAYS check the length of the result, else it would show an exception error
                console.log("result", result);
                res.send(result);
            } else {
                console.log("No account found in DB");
                res.send(result);
            }
        }
    });
});

//User Delete
app.post("/deleteUsers", (req, res) => {
    console.log("deleting users");
    const id = req.body.id;
    const query = `DELETE FROM users WHERE id = '${id}'`;
    console.log("executing...", query);
    db.query(query, (err, result) => {
        if (err) {
            console.log(err); //DB error
        } else {
            if (result.length > 0) {
                //ALWAYS check the length of the result, else it would show an exception error
                console.log("result", result);
                res.send(result);
            } else {
                console.log("No account found in DB");
                res.send(result);
            }
        }
    });
});

app.patch("/editUsers", (req, res) => {
    console.log("updating users");
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const gender = req.body.gender;
    const query = `UPDATE users SET name ='${name}' , email ='${email}', gender ='${gender}'  WHERE id = '${id}'`;
    console.log("executing...", query);
    db.query(query, (err, result) => {
        if (err) {
            console.log(err); //DB error
        } else {
            if (result.length > 0) {
                //ALWAYS check the length of the result, else it would show an exception error
                console.log("result", result);
                res.send(result);
            } else {
                console.log("No account found in DB");
                res.send(result);
            }
        }
    });
});
//getDashboard databased on Email
app.post("/getDashboard", (req, res) => {
    console.log("verifying account log in");
    const email = req.body.email;
    const query = `SELECT * FROM dashboard WHERE email = '${email}'`;
    console.log("executing...", query);
    db.query(query, (err, result) => {
        if (err) {
            console.log(err); //DB error
        } else {
            if (result.length > 0) {
                //ALWAYS check the length of the result, else it would show an exception error
                //console.log('result',result[0].email)
                res.send(result);
            } else {
                console.log("No account found in DB");
                res.send(result);
            }
        }
    });
});

app.post("/deleteClaim", (req, res) => {
    console.log("deleting claim");
    const claimId = req.body.claimId;
    const query = `DELETE FROM InsuranceClaims WHERE ClaimID = '${claimId}'`;
    console.log("executing...", query);
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                res.send(result);
            } else {
                console.log("No claim found in DB");
                res.send(result);
            }
        }
    });
});

//Backend Listens to port 5001, your axios calls should be localhost:5001
app.listen(5001, () => console.log("Server up and running... on port 5001"));
