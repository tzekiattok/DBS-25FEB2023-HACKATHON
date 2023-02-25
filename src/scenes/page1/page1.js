import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

const Page1 = () => {

    const getClaimsRecords = async () => {
        const response = await axios.get("http://localhost:5001/getClaimsRecords");;
        console.log(response.data)
      };


    return(
    <div>
        <button onClick={getClaimsRecords}>click</button>
    </div>
    )
}
export default Page1;