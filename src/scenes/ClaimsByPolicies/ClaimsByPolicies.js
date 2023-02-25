import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import { reactLocalStorage } from "reactjs-localstorage";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import InsuranceClaims from "./InsuranceClaims";
import InsurancePolicies from "./InsurancePolicies";

//Changes
const ClaimsByPolicies = () => {
  const [users, setUser] = useState([]);
  const [email, setEmail] = useState([])

  const[claims, setClaims] = useState([]);

  const claimID = "1005"

  useEffect(() =>{
    const relevantclaims = InsuranceClaims.filter((index) => {
        if (index.InsuranceID == claimID) {
            return index
        }
    })
    setClaims(relevantclaims)
  },[])


  useEffect(() => {
    setEmail(reactLocalStorage.getObject('user').email);
    getUsers();
  }, []);


  

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5001/listUsers");
    setUser(response.data);
  };

  const deleteClaims = async (id) => {
    try {
      await axios.post(`http://localhost:5001/deleteClaims`,{
        id
      });
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  
  //PROPS.insuranceID --> fetch from backend


  return (
    <Box m="20px" className = "chatbotBox">
    <Header title="Policy ID" subtitle="Displaying all claims" />
    <Link to={`/add`} className="button is-success">
          Add
        </Link>
    <div className="columns mt-5 is-centered">
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
      </div>
    </Box>
  );
};

export default ClaimsByPolicies;
