const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const auth = require("./generateAccessToken");
const dotenv = require("dotenv");
var cookieParser = require("cookie-parser");

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
function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth && auth.split(" ")[1];
  console.log(token, "HI");
  if (token == null) return res.sendStatus(401);
  auth.authenticate.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
}

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

//################################################################### BACKEND CALLS #############################################################################################
// Return list of policies based on employeeId
// TO DO: INPUT THE EMPLOYEE ID GIVEN
app.get("/getPolicies", authenticate, (req, res) => {
  console.log("running query... getPolicies");
  const employeeId = req.query.employeeId;
  const query = `SELECT * FROM insurancepolicies WHERE EmployeeID = ${employeeId}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("results");
      res.send(result);
    }
  });
});

app.post("/verifyAccount", (req, res) => {
  const EmployeeID = req.body.EmployeeID;
  const Password = req.body.Password;
  const sqlSearch = "Select * from user where EmployeeID = ?";
  const search_query = mysql.format(sqlSearch, [EmployeeID]);

  db.query(search_query, async (err, result) => {
    if (err) throw err;
    const verified = { verification: "failure" };
    if (result.length === 0) {
      console.log("--------> User does not exist");
      res.send(verified);
    } else {
      const hashedPassword = result[0].Password;
      //get the hashedPassword from result
      if (await bcrypt.compare(Password, hashedPassword)) {
        console.log("---------> Login Successful");
        const token = auth.generateAccessToken({ EmployeeID: EmployeeID });
        verified.verification = "success";
        // res.setHeader('Set-Cookie', [
        //     `accessToken=${token}; HttpOnly; Max-Age=${60000 * 15};`,
        //   ])
        console.log(token);
        verified.token = token;
        res.send(verified);
      } else {
        console.log("---------> Password Incorrect");
        res.send(verified);
      }
    }
  });
});

//Insert User
app.post("/createAccount", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const age = req.body.age;
  // const salt = await bcrypt.genSalt(15)
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const employeeID_query = "SELECT MAX(EmployeeID) FROM user";
  const sqlInsert = "INSERT INTO user VALUES (?,?,?,?,?)";

  db.query(employeeID_query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const employeeID = result[0]["MAX(EmployeeID)"] + 1;
      const insert_query = mysql.format(sqlInsert, [
        employeeID,
        hashedPassword,
        firstName,
        lastName,
        age,
      ]);
      db.query(insert_query, (err, result) => {
        if (err) throw err;
        console.log("--------> Created new User");
        res.sendStatus(201);
      });
    }
  });
});

// Return list of claim records based on insuranceId
app.get("/getClaims", authenticate, (req, res) => {
  console.log("running query... getClaims");
  const insuranceId = req.body.insuranceId;
  const query = `SELECT * FROM insuranceclaims WHERE InsuranceID = ${insuranceId}`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("results");
      res.send(result);
    }
  });
});

//Insert User
app.post("/createClaim", authenticate, (req, res) => {
  const employeeId = req.body.employeeId;
  const insuranceId = req.body.insuranceId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const date = req.body.date;
  const claimAmt = req.body.claimAmt;
  const purpose = req.body.purpose;
  const followUp = req.body.followUp;
  const prevClaimId = req.body.prevClaimId;
  const status = "Pending"; // everytime create new claim -> status is pending
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

// Deletes claims based on claim id
app.get("/deleteClaim", authenticate, (req, res) => {
  console.log("deleting claim");
  const claimId = req.query.claimId;
  console.log("claimid", claimId);

  const query = `DELETE FROM InsuranceClaims WHERE ClaimID = ${claimId} AND Status = 'Pending'`;
  console.log("executing...", query);
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.affectedRows > 0) {
        console.log(result);
        res.send(result);
      } else {
        console.log(result);
        res.send("No such pending claim found in DB");
      }
    }
  });
});

// Edit claims based on claim id
app.get("/editClaim", authenticate, (req, res) => {
  console.log("deleting claim");
  const claimId = req.query.claimId;
  const insuranceId = req.query.insuranceId;
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const expenseDate = req.query.expenseDate;
  const amount = req.query.amount;
  const purpose = req.query.purpose;
  const followUp = req.query.followUp;
  const previousClaimId = req.query.previousClaimId;
  const query = `UPDATE InsuranceClaims SET 
        insuranceId = ${insuranceId},
        firstName = '${firstName}',
        lastName = '${lastName}',
        expenseDate = '${expenseDate}'
        amount = '${amount}',
        purpose = '${purpose}',
        followUp = ${followUp},
        previousClaimId = ${previousClaimId},
        LastEditedClaimDate = CURRENT_TIMESTAMP() WHERE ClaimID = ${claimId} AND (Status = 'Pending' OR Status = 'Rejected')`;
  console.log("executing...", query);
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.affectedRows > 0) {
        console.log(result);
        res.send(result);
      } else {
        console.log(result);
        res.send("No such pending or rejected claim found in DB");
      }
    }
  });
});

//Backend Listens to port 5001, your axios calls should be localhost:5001
app.listen(5001, () => console.log("Server up and running... on port 5001"));
