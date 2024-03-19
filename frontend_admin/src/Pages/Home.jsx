import React, { useState, useContext, useEffect } from "react";
import LoginPopup from "../Components/Login/LoginPopup";
import { AuthContext } from "../context/authContext";
import Orders from "../Components/orderz/Orders";

export default function Home() {
  const auth = sessionStorage.getItem("authenticated");

  let [user, setUser] = useState(auth);

  useEffect(() => {
    if (auth === "true") {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [auth]);

  const handdleUser = () => {
    setUser((current) => !current);
  };
  return (
    <>
      {!user && <LoginPopup isUser={handdleUser} />}
      <Orders />
    </>
  );
}
