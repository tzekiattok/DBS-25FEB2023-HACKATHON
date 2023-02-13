import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard/dashboard";
import Login from "./scenes/login/login";

function App() {
  const [theme, colorMode] = useMode();
  const {pathname} = useLocation();

  const[isActive,setIsActive]=useState(true)
  const[isLogout,setLogout]=useState(false)
  //hideSideBar, topBar if not logged in
  //let hideTopBar = window.location.pathname === '/' ? null : <Topbar setIsSidebar={setIsSidebar} />
  //let hideSideBar = window.location.pathname === '/'  ? null : <Sidebar isSidebar={isSidebar} />
  
  return (
    
   
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* hide sidebar in login page and signin */}
          {pathname !== '/' && pathname !=='/signup' && pathname !=='/resetPassword' &&  <Sidebar/>}
          <main className="content">
            {/* hide topbar in login page and signin */}
            {/*pathname !== '/' && pathname !=='/signup' && pathname !=='/resetPassword' &&  <Topbar/>*/}
            <Routes>
              {/* Authenticated Route -> Redirects user to landing page IF they are authenticated*/}
              <Route path="/" element={<Login/>} />
                <Route path="/dashboard" element={<Dashboard/>} />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
  
}

export default App;
