import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

const Page1 = () => {
    return(<Box m="20px" className = "chatbotBox">
    <Header title="Page title" subtitle="Page subtitle" />

    </Box>)
}
export default Page1;