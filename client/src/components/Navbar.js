import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "../services/auth.service";

import EventBus from "../common/EventBus";

const Navbar = () => {
  const [showCompanyBoard, setShowCompanyBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowCompanyBoard(user.roles.includes("ROLE_COMPANY"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowCompanyBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Job Search
        </Link>
        <div className="navbar-nav mr-auto">
          {/* <li className="nav-item">
            {currentUser && (
              <Link to={"/postings"} className="nav-link">
                Postings
              </Link>
            )}
          </li> */}
          <li className="nav-item">
            {showCompanyBoard && (
              <Link to={"/add"} className="nav-link">
                Add Posting
              </Link>
            )}
          </li>

          {/* {showCompanyBoard && (
            <li className="nav-item">
              <Link to={"/company"} className="nav-link">
                Company Board
              </Link>
            </li>
          )} */}

          {showCompanyBoard && (
            <li className="nav-item">
              <Link to={"/applicantList"} className="nav-link">
                Applicant List
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin UserList
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                Profile
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
