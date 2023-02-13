import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useEffect, useRef } from 'react';
import Tableau from "tableau-react";
import "./dashboard.css";
const options = {
  //hideTabs: true,
  hideToolbar: true
};

const url1 = "https://public.tableau.com/views/JSAPI-Superstore/Overview&:jsdebug=n"
const Dashboard = () => {
  return (
    <Box m="20px" className = "chatbotBox">
      <Header title="Dashboard" subtitle="Something here....." />
      <Tableau
       url = {url1}
       
      />
    </Box>
  
    
       
  );
};


export default Dashboard;
