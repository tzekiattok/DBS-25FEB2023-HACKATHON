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

//################################################################### BACKEND CALLS #############################################################################################
// Return list of policies based on employeeId
// TO DO: INPUT THE EMPLOYEE ID GIVEN
app.get("/getPolicies", (req, res) => {
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

// Return list of claim records based on insuranceId
app.get("/getClaims", (req, res) => {
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
app.get("/deleteClaim", (req, res) => {
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
app.get("/editClaim", (req, res) => {
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

app.get("/getClaimsSummary", (req, res) => {
    console.log("getting claims summary");
    const employeeId = req.query.employeeId;
    const query = `SELECT InsuranceType, COUNT(*) AS count FROM InsurancePolicies WHERE EmployeeID = ${employeeId} GROUP BY InsuranceType`;

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

//Backend Listens to port 5001, your axios calls should be localhost:5001
app.listen(5001, () => console.log("Server up and running... on port 5001"));
