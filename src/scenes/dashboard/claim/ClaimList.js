import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import { reactLocalStorage } from "reactjs-localstorage";
import { Box, Button, TextField, Grid, Container, } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import jsonClaim from "./claims.json";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from '@mui/material/styles';
// components
import Iconify from '../Icons';
import "../dashboard.css"
// sections
import {
  AppTasks,
  //AppNewsUpdate,
  //AppOrderTimeline,
  //AppCurrentVisits,
  //AppWebsiteVisits,
  //AppTrafficBySite,
  AppWidgetSummary,
  //AppCurrentSubject,
  //AppConversionRates,
} from '../dashBoardDependencies';

const ClaimList = () => {
  const [claims, setClaims] = useState([]);
  const [data, setData] = useState([])
  const theme = useTheme();
  const email = reactLocalStorage.getObject('user').id;

  const getData = async () => {
    console.log('email ->', email);
    /*try {
      const response = await axios.post(`http://localhost:5001/getDashboard`, {
        email,
      });
      console.log('dashboard response',response)
      setData(response.data[0])
      console.log('data',data)
      
  }
  catch(error){
    console.log(error)
  }*/
  }
  useEffect(() => {
    getUsers();
    getData();
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
  
        <div className="dashboard-bg">
          <Grid container spacing={3} >
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Weekly Sales" total={data['item1']} icon={'ant-design:android-filled'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="New Users" total={data['item2']} color="info" icon={'ic:baseline-account-balance-wallet'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Item Orders" total={data['item3']} color="warning" icon={'ant-design:windows-filled'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary title="Bug Reports" total={data['item4']} color="error" icon={'ant-design:bug-filled'} />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>

            </Grid>


          </Grid>
        </div>
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
      </div>
    </Box>
  );
};

export default ClaimList;
