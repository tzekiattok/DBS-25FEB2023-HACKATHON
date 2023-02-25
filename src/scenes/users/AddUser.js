import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import "bulma/css/bulma.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const AddUser = () => {
  // const [claimId, setClaimId] = useState("");
  const [insuranceId, setInsuranceId] = useState("1008");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [expenseDateInput, setExpenseDate] = useState("");
  const [claimAmt, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [prevClaimId, setPreviousClaimId] = useState("");
  // const [status, setStatus] = useState("");
  // const [lastEditedClaimDate, setLastEditedClaimDate] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();

    // console.log(expenseDate)
    var offset = new Date().getTimezoneOffset() / -60; // 7
    const expenseDate = expenseDateInput + "+0" + offset + ":00";
    // console.log(expenseDateFormatted)
    console.log('saving')
    try {
      console.log(insuranceId)
      console.log(expenseDate)
      const body = {
        // claimId,
        insuranceId,
        firstName,
        lastName,
        // expenseDate,
        claimAmt,
        purpose,
        followUp,
        prevClaimId,
        // status,
        // lastEditedClaimDate,
      }
      console.log(body)
      await axios.post("http://localhost:5001/createClaim", {}, {params:body}).then(response => console.log(response,"response..."))
      navigate("/list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="20px" className = "chatbotBox">
    <Header title="Table" subtitle="Add claims" />
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveUser}>
          {/* <div className="field">
            <label className="label">ClaimId</label>
            <div className="control">
              <input
                type="number"
                className="input"
                value={claimId}
                onChange={(e) => setClaimId(e.target.value)}
                placeholder="ClaimId"
              />
            </div>
          </div> */}
          <div className="field">
            <label className="label">Insurance Id</label>
            <div className="control">
              <input
                type="number"
                className="input"
                value={insuranceId}
                onChange={(e) => setInsuranceId(e.target.value)}
                placeholder="InsuranceId"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="FirstName"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="LastName"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Expense Date</label>
            <div className="control">
            <input
                type="datetime-local"
                className="input"
                value={expenseDateInput}
                onChange={(e) => setExpenseDate(e.target.value)}
                placeholder="ExpenseDate"
              />
              {/* <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="DateTimePicker"
                    value={value}
                    onChange={(newValue) => {
                      setExpenseDate(newValue);
                    }}
                  />
                </LocalizationProvider> */}
            </div>
          </div>
          <div className="field">
            <label className="label">Amount</label>
            <div className="control">
              <input
                type="number"
                className="input"
                value={claimAmt}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Purpose</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Purpose"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Follow Up</label>
            <div className="control">
              {/* <input
                type="number"
                className="input"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                placeholder="FollowUp"
              /> */}
              <div className="select is-fullwidth">
                <select
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                >
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Previous Claim Id</label>
            <div className="control">
              <input
                type="number"
                className="input"
                value={prevClaimId}
                onChange={(e) => setPreviousClaimId(e.target.value)}
                placeholder="PreviousClaimId"
              />
            </div>
          </div>
          {/* <div className="field">
            <label className="label">Status</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div> */}
          {/* <div className="field">
            <div className="control">
              <input
                type="hidden"
                className="input"
                value={lastEditedClaimDate}
                onChange={(e) => setLastEditedClaimDate(e.target.value)}
                placeholder="LastEditedClaimDate"
              />
            </div>
          </div> */}
          <div className="field">
            <button type="submit" className="button is-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    </Box>
  );
};

export default AddUser;
