import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import { reactLocalStorage } from "reactjs-localstorage";
import { Box, Button, TextField, Grid, Container } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import jsonClaim from "./claims.json";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
// components
import Iconify from "../Icons";
import "../dashboard.css";
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
} from "../dashBoardDependencies";
import { useAuth } from "../../../Auth";

const ClaimList = () => {
  const [claims, setClaims] = useState([]);
  const token = useAuth();
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [data, setData] = useState([
    {
      personalAccident: 0,
      Housing: 0,
      Car: 0,
      Travel: 0,
    },
  ]);
  const theme = useTheme();
  const email = reactLocalStorage.getObject("user").id;
  const employeeId = 58001001;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      console.log("Running dashboard data", employeeId);
      const response = await axios.get(
        `http://localhost:5001/getClaimsSummary`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data !== []) {
        for (const i in response.data) {
          var type = response.data[i];
          if (type["InsuranceType"] === "Personal Accident") {
            data[0]["personalAccident"] = type["count"];
          } else {
            data[0][type["InsuranceType"]] = type["count"];
          }
        }
        console.log("newdata", data[0]);
      }
      console.log("dashboard data", response);
      setClaims(response.data);
    } catch (error) {
      console.log(error);
    }
    setSummaryLoading(false);
  };

  const deleteUser = async (id) => {
    try {
      await axios.post(`http://localhost:5001/deleteUsers`, {
        id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="20px" className="chatbotBox">
      <Header title="Claims" subtitle="List of Claims" />
      {!summaryLoading && (
        <div className="dashboard-bg">
          <Grid container spacing={3}>
            <Grid item xs={6} sm={4} md={3}>
              <AppWidgetSummary
                title="Personal Accident"
                total={data[0].personalAccident}
                icon={"ant-design:android-filled"}
              />
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
              <AppWidgetSummary
                title="Car"
                total={data[0].Car}
                color="info"
                icon={"ic:baseline-account-balance-wallet"}
              />
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
              <AppWidgetSummary
                title="Travel"
                total={data[0].Travel}
                color="warning"
                icon={"ant-design:windows-filled"}
              />
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
              <AppWidgetSummary
                title="Housing"
                total={data[0].Housing}
                color="error"
                icon={"ant-design:bug-filled"}
              />
            </Grid>
          </Grid>
        </div>
      )}
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
