import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard/dashboard";
import Login from "./scenes/login/login";
import UserList from "./scenes/users/UserList";
import AddUser from "./scenes/users/AddUser";
import DashboardAppPage from "./scenes/dashboard/DashboardAppPage";
import EditUser from "./scenes/users/EditUser";
import Page1 from "./scenes/page1/page1";
import Page2 from "./scenes/page2/page2";
import Page3 from "./scenes/page3/page3";
import ClaimsByPolicies from "./scenes/dashboard/ClaimsByPolicies/ClaimsByPolicies";
import PolicyList from "./scenes/policy/PolicyList";
import ProtectedRoute from "./scenes/protectedRoutes/protectedRoutes";
import AuthProvider from "./Auth";
import ClaimList from "./scenes/dashboard/claim/ClaimList";

function App() {
  const [theme, colorMode] = useMode();
  const { pathname } = useLocation();

  const [isActive, setIsActive] = useState(true);
  const [isLogout, setLogout] = useState(false);
  //hideSideBar, topBar if not logged in
  //let hideTopBar = window.location.pathname === '/' ? null : <Topbar setIsSidebar={setIsSidebar} />
  //let hideSideBar = window.location.pathname === '/'  ? null : <Sidebar isSidebar={isSidebar} />

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>

        <div className="app">
          {/* hide sidebar in login page and signin */}
          {pathname !== "/" &&
            pathname !== "/signup" &&
            pathname !== "/resetPassword" && <Sidebar />}
          <main className="content">
            {/* hide topbar in login page and signin */}
            {/*pathname !== '/' && pathname !=='/signup' && pathname !=='/resetPassword' &&  <Topbar/>*/}
            <Routes>
              {/* Authenticated Route -> Redirects user to landing page IF they are authenticated*/}
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard1" element={<DashboardAppPage />} />
              <Route path="/claim" element={<ClaimList />} />
              <Route path="add" element={<AddUser />} />
              <Route path="edit/:id" element={<EditUser />} />
              <Route path="/policy" element={<PolicyList/>} />
              <Route path="/policy/:policyID" element={<ClaimsByPolicies/>} />
              <Route path="page1" element={<Page1 />} />
              <Route path="page2" element={<Page2 />} />
              <Route path="page3" element={<Page3 />} />
            </Routes>
          </main>
        </div>
        </AuthProvider>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
