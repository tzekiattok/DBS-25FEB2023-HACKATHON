import React, { useContext, useState } from "react";

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
export const useAuthUpdate = () => {
  return useContext(AuthUpdateContext);
};

const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState();
  console.log(jwtToken, "hafsjioa");
  return (
    <AuthContext.Provider value={jwtToken}>
      <AuthUpdateContext.Provider value={setJwtToken}>
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};
export default AuthProvider;
