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
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [data, setData] = useState([{}]);
  const token = useAuth();
  const theme = useTheme();
  const email = reactLocalStorage.getObject("user").id;
  const employeeId = 58001001;

  useEffect(() => {
    getData();
    getUsers();
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
        const newJson = {
          personalAccident: 0,
          Housing: 0,
          Car: 0,
          Travel: 0,
        };
        for (const i in response.data) {
          var type = response.data[i];
          if (type["InsuranceType"] === "Personal Accident") {
            newJson["personalAccident"] = type["count"];
          } else {
            newJson[type["InsuranceType"]] = type["count"];
          }
        }
        console.log("newdata", data[0]);
        setData(newJson);
      }
      console.log("dashboard data", response);
    } catch (error) {
      console.log(error);
    }
    setSummaryLoading(false);
  };

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5001/getAllClaims", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setClaims(response.data);
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
      {!summaryLoading && (
        <div className="dashboard-bg">
          <Grid container spacing={3}>
            <Grid item xs={6} sm={4} md={3}>
              {data.personalAccident !== 0 ? (
                <AppWidgetSummary
                  title="Personal Accident"
                  total={data.personalAccident}
                  icon={"ant-design:android-filled"}
                />
              ) : (
                <AppWidgetSummary
                  title="Personal Accident"
                  total={"0"}
                  icon={"ant-design:android-filled"}
                />
              )}
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
              {data.Car !== 0 ? (
                <AppWidgetSummary
                  title="Car"
                  total={data.Car}
                  color="info"
                  icon={"ic:baseline-account-balance-wallet"}
                />
              ) : (
                <AppWidgetSummary
                  title="Car"
                  total={"0"}
                  color="info"
                  icon={"ic:baseline-account-balance-wallet"}
                />
              )}
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
              {data.Travel !== 0 ? (
                <AppWidgetSummary
                  title="Travel"
                  total={data.Travel}
                  color="warning"
                  icon={"ant-design:windows-filled"}
                />
              ) : (
                <AppWidgetSummary
                  title="Travel"
                  total={"0"}
                  color="warning"
                  icon={"ant-design:windows-filled"}
                />
              )}
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
              {data.Housing !== 0 ? (
                <AppWidgetSummary
                  title="Housing"
                  total={data.Housing}
                  color="error"
                  icon={"ant-design:bug-filled"}
                />
              ) : (
                <AppWidgetSummary
                  title="Housing"
                  total={"0"}
                  color="error"
                  icon={"ant-design:bug-filled"}
                />
              )}
            </Grid>
          </Grid>
        </div>
      )}
      <div className="columns mt-5 is-centered">
        {claims ? (
          <Box height={"600px"} width={"100%"}>
            <DataGrid
              pagination
              getRowId={(row) => row.claimid}
              rows={claims}
              columns={[
                { field: "claimid", headerName: "ID" },
                { field: "firstName", headerName: "First Name" },
                { field: "lastName", headerName: "Last Name" },
                { field: "expensedate", headerName: "Expense Date" },
                { field: "amount", headerName: "Amount" },
                { field: "purpose", headerName: "Purpose", width: 150 },
                { field: "followup", headerName: "Follow Up" },
                { field: "previousclaimID", headerName: "Previous Claim ID" },
                { field: "status", headerName: "Status" },
                {
                  field: "lasteditedclaimdate",
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
