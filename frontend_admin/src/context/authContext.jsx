import axios from "axios";
import { createContext, useEffect, useState } from "react";
import configData from "../config.json";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  const [authenticated, setauthenticated] = useState(
    sessionStorage.getItem(sessionStorage.getItem("authenticated") || false)
  );

  // console.log('adminData', currentUser.master)

  const login = async (inputs) => {
    const res = await axios.post(configData.SERVER_URL + "veifyLogin", inputs);

    setCurrentUser(res.data);
    sessionStorage.setItem("user", JSON.stringify(currentUser));
    setauthenticated(true);
    sessionStorage.setItem("authenticated", true);
  };

  const logout = async (inputs) => {
    alert("doriti sa va delogati?");
    const res = await axios.post(configData.SERVER_URL + "logout");
    setauthenticated(false);
    sessionStorage.setItem("authenticated", false);
    setCurrentUser(null);
    // sessionStorage.log(res.data);
  };

  useEffect(() => {
    //    alert('context');

    if (currentUser != null) {
      sessionStorage.setItem("user", JSON.stringify(currentUser));
      setauthenticated(true);
      sessionStorage.setItem("authenticated", true);
    } else {
      sessionStorage.setItem("user", null);
      setauthenticated(false);
      sessionStorage.setItem("authenticated", false);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
