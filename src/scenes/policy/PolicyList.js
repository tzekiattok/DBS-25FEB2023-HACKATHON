import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import { reactLocalStorage } from "reactjs-localstorage";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../../Auth";

const PolicyList = () => {
  const [policies, setPolicy] = useState([])
  const token = useAuth();

  useEffect(() => {
    getPolicies();
  },[]);

  const getPolicies = async () => {
    // user = reactLocalStorage.getObject('user').userID
    const response = await axios.get("http://localhost:5001/getPolicies", {headers: { Authorization: `Bearer ${token}` }});
    // const response = await axios.get("http://localhost:5001/getPolicies", { params: { employeeId: user.userID } });
    setPolicy(response.data);
  };


  return (
    <Box m="20px" className = "chatbotBox">
    <Header title="Policies" subtitle="View all policies" />
    <div className="columns mt-5 is-centered">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Insurance ID</th>
              <th>Insurance Type</th>
              <th>Start Date</th>
              <th>Term</th>
              <th>End Date</th>
              <th>Claim Limit</th>
              <th>Remaining Claim Limit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map(policy => (
              <tr key={policy.InsuranceID}>
                <td>{policy.InsuranceID}</td>
                <td>{policy.InsuranceType}</td>
                <td>{policy.PolicyStartDate}</td>
                <td>{policy.PolicyTerm}</td>
                <td>{policy.PolicyEndDate}</td>
                <td>{policy.ClaimLimit}</td>
                <td>{policy.RemainingClaimLimit}</td>
                <td> 
                  <Link
                      to = {`/policy/${policy.InsuranceID}`}
                      state= {{
                        insuranceID: policy.InsuranceID
                      }
                      }
                    className="button is-small is-info mr-2"
                    >View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
};

export default PolicyList;