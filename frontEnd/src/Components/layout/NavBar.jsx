import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "../login-Register/Login";
import SignUpPop from "../login-Register/Sign_up";

import { AuthContext } from "../../context/authContext";
import { lrContext } from "../../context/lrContext";
import SuccesAlert from "../misc/succesAlert";

import "./assets/css/navbar.css";

export default function NavBar() {
  const useLrContext = () => useContext(lrContext);
  const { regSucc } = useLrContext();
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  // const [flag, setFlag] = useState(false);
  const auth = localStorage.getItem("authenticated");

  let [user, setUser] = useState(auth);

  useEffect(() => {
    if (auth === "true") {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [auth]);

  let { logout } = useContext(AuthContext);

  const handdleUser = () => {
    setUser((current) => !current);
  };

  const path = location.pathname;
  // console.log("🚀 ~ file: NavBar.js:11 ~ NavBar ~ path:", path);

  const activePageLink = (page) => {
    if (page === path) {
      return "text-amber-300";
    } else {
      return;
    }
  };
  //     //-------------------------------------------------------------------------

  return (
    <>
      <header className="flex w-full text-white shadow-sm body-font bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 ">
        {regSucc && (
          <>
            <div className="flex absolute w-[100%] z-[999] animate-fadeOut opacity-0 md:w-[25%]">
              <SuccesAlert />
            </div>
          </>
        )}
        <div className="container flex flex-col items-start justify-between p-6 mx-auto md:flex-row ">
          <p className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
            LOGO
          </p>
          <nav className="flex absolute flex-wrap items-center justify-center left-[30%] text-base z-[996]  md:ml-auto md:mr-auto hidden md:block z-[2]">
            <Link to="/">
              {" "}
              <span
                className={`mr-5 font-medium hover:text-amber-300 ${activePageLink(
                  "/"
                )}`}
              >
                Home
              </span>
            </Link>
            <Link to="/product-list">
              {" "}
              <span
                className={`mr-5 font-medium hover:text-amber-300 ${activePageLink(
                  "/product-list"
                )}`}
              >
                Products
              </span>
            </Link>
            {/* <Link to="/about">
              {" "}
              <span
                className={`mr-5 font-medium hover:text-amber-300 ${activePageLink(
                  "/about"
                )}`}
              >
                About
              </span>
            </Link>
            <Link to="/contact">
              {" "}
              <span
                className={`mr-5 font-medium hover:text-amber-300 ${activePageLink(
                  "/contact"
                )}`}
              >
                Contact
              </span>
            </Link> */}
          </nav>

          <div className=" flex items-center h-full hidden  md:block">
            {user && (
              <>
                <button id="userProfile"></button>
                <button onClick={logout}>
                  <p className=" inline ">Log</p>
                  <p className=" inline text-amber-200">Out</p>
                </button>
              </>
            )}

            {!user && (
              <>
                <Login isUser={handdleUser} />
                <SignUpPop />
              </>
            )}
          </div>

          <section className="MOBILE-MENU flex z-[999] md:hidden">
            <div
              className="HAMBURGER-ICON space-y-2 absolute right-4 top-8 "
              onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
            >
              <span className="block h-0.5 w-8 bg-amber-200"></span>
              <span className="block h-0.5 w-8 bg-amber-200"></span>
              <span className="block h-0.5 w-8 bg-amber-200"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              {" "}
              <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between my-10 z-[996]">
              <div className="flex w-full mb-10">
                {!user && (
                  <>
                    <div className=" ">
                      <Login />
                    </div>
                    <div className=" ">
                      <SignUpPop />
                    </div>
                  </>
                )}
              </div>
                <li>
                  <Link to="/">
                    {" "}
                    <span
                      className={`mr-5 font-medium hover:text-amber-300 ${activePageLink(
                        "/"
                      )}`}
                    >
                      {" "}
                      Home{" "}
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/product-list">
                    {" "}
                    <span
                      className={`mr-5 font-medium hover:text-amber-300 ${activePageLink(
                        "/product-list"
                      )}`}
                    >
                      {" "}
                      Products{" "}
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/about">
                    {" "}
                    <span
                      className={`mr-5 font-medium hover:text-amber-300 ${activePageLink(
                        "/about"
                      )}`}
                    >
                      {" "}
                      About{" "}
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/contact">
                    {" "}
                    <span
                      className={`mr-5 font-medium hover:text-amber-300 ${activePageLink(
                        "/contact"
                      )}`}
                    >
                      {" "}
                      Contact{" "}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </header>
    </>
  );
}
