import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [client_role, setRole] = useState(['']);

  const getUserRole = () => {
    const storedData = localStorage.getItem('access_token');
    if (!storedData) {
      console.error("No access token found!");
      return;
    }

    try {
      const decoded = jwtDecode(storedData);
      const roles = decoded.resource_access?.Insurance?.roles || [];
      setRole(roles);
    } catch (error) {
      console.error("Error parsing auth token:", error);
    }
  };

  /*useEffect(() => {
    console.log("Updated client_role:", client_role); // ✅ Logs the new value after state updates
  }, [client_role]); // Run whenever client_role updates*/

  const logout = () => {
    setUser(null);
    setRole([]);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };


  return (
    <AuthContext.Provider value={{logout , getUserRole , client_role}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
