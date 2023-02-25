import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams , useLocation } from "react-router-dom";
import "bulma/css/bulma.css";
import { reactLocalStorage } from "reactjs-localstorage";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import InsuranceClaims from "./InsuranceClaims";
import InsurancePolicies from "./InsurancePolicies";
import { DataGrid } from "@mui/x-data-grid";

//Changes
const ClaimsByPolicies = () => {
  const [users, setUser] = useState([]);
  const [email, setEmail] = useState([])

  const[claims, setClaims] = useState([]);
  // const policyID = "1009"
  const { policyID } = useParams();

  useEffect(()  =>{
    getClaims();
  },[])



  const getClaims = async () => {
    const response = await axios.get("http://localhost:5001/getClaims/", {params:{insuranceId: policyID}});
    setClaims(response.data);
  };

  useEffect(() => {
    setEmail(reactLocalStorage.getObject('user').email);
  }, []);

  const deleteClaims = async (id) => {
    try {
      await axios.post(`http://localhost:5001/deleteClaim`,{
        id
      });
      // getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  
  //PROPS.insuranceID --> fetch from backend


  return (
    <Box m="20px" className = "chatbotBox">
    <Header title="Policy ID" subtitle="Displaying all claims" />
    <Link to={`/policy/${policyID}/add`} className="button is-success">
          Add
        </Link>
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
                          onClick={() => deleteClaims()}
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
      </div>
    {/* <div className="columns mt-5 is-centered">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Last Edited</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim, index) => (
              <tr key={claim.ClaimID}>
                <td>{claim.ClaimID}</td>
                <td>{claim.FirstName} {claim.LastName}</td>
                <td>{claim.Amount}</td>
                <td>{claim.Status}</td>
                <td>{claim.LastEditedClaimDate}</td>
                <td>
                 
                  <Link
                      to = {`/edit/${claim.ClaimID}`}
                      state= {{
                        username: claims.FirstName,
                        useremail: claims.LastName,
                        // usergender: claim.ClaimID
                      }
                      }
                    
                    className="button is-small is-info mr-2"
                    >Edit</Link>
                  <button
                    onClick={() => deleteClaims(claim.id)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </Box>
  );
};

export default ClaimsByPolicies;
