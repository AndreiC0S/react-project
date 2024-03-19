import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function NavBar() {
  const { authenticated } = useContext(AuthContext);
  const { currentUser } = useContext(AuthContext);

  let { logout } = useContext(AuthContext);

  // console.log("admin", typeof(currentUser.master));

  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  const [user, setUser] = useState(false);

  const path = location.pathname;

  const activePageLink = (page) => {
    if (page === path) {
      return "text-amber-300";
    } else {
      return;
    }
  };
  //-------------------------------------------------------------------------

  return (
    <>
      <header className="flex w-full text-white shadow-sm body-font bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 ">
        <div className="container flex flex-col items-start justify-between p-6 mx-auto md:flex-row ">
          <a className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
            LOGO
          </a>
          <nav className="flex absolute flex-wrap items-center justify-center left-[30%] text-base  md:ml-auto md:mr-auto hidden md:block">
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

            {authenticated && (
              <>
                <Link to="/products">
                  {" "}
                  <span
                    className={`mr-5 font-medium hover:text-amber-300 ${activePageLink(
                      "/products"
                    )}`}
                  >
                    Products
                  </span>
                </Link>

                {Number(currentUser.master) === 1 && (
                  <>
                    <Link to="/admins">
                      {" "}
                      <span
                        className={`mr-5 font-medium hover:text-amber-300 ${activePageLink(
                          "/admins"
                        )}`}
                      >
                        Admins
                      </span>
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>
          {currentUser && (
            <>
              <button onClick={logout}>
                <p className=" inline ">Log</p>
                <p className=" inline  text-amber-200">Out</p>
              </button>
            </>
          )}
        </div>
      </header>
    </>
  );
}
