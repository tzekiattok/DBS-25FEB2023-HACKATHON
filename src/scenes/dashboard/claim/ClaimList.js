import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import { reactLocalStorage } from "reactjs-localstorage";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import jsonClaim from "./claims.json";
import { DataGrid } from "@mui/x-data-grid";

const ClaimList = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    // const response = await axios.get("http://localhost:5001/listUsers");
    // setClaims(response.data);
    setClaims(jsonClaim);
    console.log(jsonClaim);
    console.log("hi");
  };

  const deleteUser = async (id) => {
    try {
      await axios.post(`http://localhost:5001/deleteUsers`, {
        id,
      });
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="20px" className="chatbotBox">
      <Header title="Claims" subtitle="List of Claims" />
      <div className="columns mt-5 is-centered">
        {claims ? (
          <Box height={"600px"} width={"100%"}>
            <DataGrid
              pagination
              getRowId={(row) => row.ClaimID}
              rows={claims}
              columns={[
                { field: "ClaimID", headerName: "ID" },
                { field: "FirstName", headerName: "First Name" },
                { field: "LastName", headerName: "Last Name" },
                { field: "ExpenseDate", headerName: "Expense Date" },
                { field: "Amount", headerName: "Amount" },
                { field: "Purpose", headerName: "Purpose", width: 150 },
                { field: "FollowUp", headerName: "Follow Up" },
                { field: "PreviousClaimID", headerName: "Previous Claim ID" },
                { field: "Status", headerName: "Status" },
                {
                  field: "LastEditedClaimDate",
                  headerName: "Last Edited Claim Date",
                  width: 200,
                },
                {
                  headerName: "Actions",
                  width: 200,
                  renderCell: (cellValue) => {
                    console.log(cellValue);
                    return (
                      <>
                        <Link
                          to={`/edit/${cellValue.id}`}
                          className="button is-small is-info mr-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteUser()}
                          className="button is-small is-danger"
                        >
                          Delete
                        </button>
                      </>
                    );
                  },
                },
              ]}
              pageSize={10}
            />
          </Box>
        ) : (
          <div>Loading...</div>
        )}
        {/* <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Expense Date</th>
              <th>Amount</th>
              <th>Purpose</th>
              <th>Follow Up</th>
              <th>Previous Claim ID</th>
              <th>Status</th>
              <th>Last Edited Claim Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim, index) => (
              <tr key={claim.ClaimID}>
                <td>{index + 1}</td>
                <td>{claim.FirstName}</td>
                <td>{claim.LastName}</td>
                <td>{claim.ExpenseDate}</td>
                <td>{claim.Amount}</td>
                <td>{claim.Purpose}</td>
                <td>{claim.FollowUp}</td>
                <td>{claim.PreviousClaimID}</td>
                <td>{claim.Status}</td>
                <td>{claim.LastEditedClaimDate}</td>
                <td>
                  <Link
                    to={`/edit/${claim.id}`}
                    state={{
                      username: claim.name,
                      useremail: claim.email,
                      usergender: claim.gender,
                    }}
                    className="button is-small is-info mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(claim.id)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </Box>
  );
};

export default ClaimList;
