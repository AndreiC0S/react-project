import React from "react";

import { Outlet } from "react-router-dom";

// import Banner from "../banner/Banner";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <NavBar />

      <Outlet />

      <Footer />
    </>
  );
}
