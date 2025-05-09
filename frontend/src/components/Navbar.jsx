import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../utils/UserRoutes";

const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("User");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {

    const fetchUserData = async (token) => {
      try {
        // 1. Await the result of getUser(token)
        const userData = await getUser(token);
        setUserData(userData);
        console.log(userData);
        if(userData.role=="SUPERADMIN"||userData.role == "ADMIN"){
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error during login check or user fetch:", error);
      }
    };
    
    //check if user is logged in
    const checkLoginStatus = () => {
      return new Promise((resolve) => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
        resolve(!!token);
      });
    };
    
    

    const initialize = async () => { // Encapsulate the logic in an async function
      const isLoggedIn = await checkLoginStatus();
      if (isLoggedIn) {
        const token = localStorage.getItem("token"); // Get token *after* confirming login
        await fetchUserData(token);
      }
    };
    initialize();

  

    //get username from localstorage
    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username"));
    }


    

    //get username from localstorage
    if (localStorage.getItem("role") && (localStorage.getItem("role")=="ADMIN" || localStorage.getItem("role")=="SUPERADMIN")) {
      setIsAdmin(true);
    }


    // fetchUserData(localStorage.getItem("token"));

    //event listener to check when localStorage changes
    window.addEventListener("storage", checkLoginStatus);

    // Add hover functionality to dropdowns
    const dropdownElements = document.querySelectorAll(".dropdown");

    dropdownElements.forEach((dropdown) => {
      dropdown.addEventListener("mouseenter", () => {
        dropdown.querySelector(".dropdown-menu").classList.add("show");
      });

      dropdown.addEventListener("mouseleave", () => {
        dropdown.querySelector(".dropdown-menu").classList.remove("show");
      });
    });

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      dropdownElements.forEach((dropdown) => {
        dropdown.removeEventListener("mouseenter", () => {});
        dropdown.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          {" "}
          Sharedule
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products/Services
              </NavLink>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/create-listing">
                    Create Listing
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/view-listings">
                    My Listings
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            {isLoggedIn && isAdmin && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link font-weight-bold" to="/admin">
                    Admin
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="buttons text-center">
            {/* <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                        <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                        <div className="dropdown d-inline-block">
                            <button className="btn btn-outline-dark m-2 dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-user mr-1"></i> User123
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="userDropdown">
                                <li><NavLink className="dropdown-item" to="/profile"><i className="fa fa-user-circle me-2"></i>My Profile</NavLink></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><NavLink className="dropdown-item" to="/logout"><i className="fa fa-sign-out-alt me-2"></i>Log Out</NavLink></li>
                            </ul>
                        </div> */}
            {isLoggedIn ? (
              <div className="dropdown d-inline-block">
                <button
                  className="btn btn-outline-dark m-2 dropdown-toggle"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa fa-user mr-1"></i> {username}
                </button>
                <ul className="dropdown-menu" aria-labelledby="userDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/user/profile">
                      <i className="fa fa-user-circle me-2"></i>My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/my-appointments">
                      <i className="fa fa-calendar-check me-2"></i>My Appointments
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="fa fa-sign-out-alt me-2"></i>Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline-dark m-2">
                  <i className="fa fa-sign-in-alt mr-1"></i> Login
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-dark m-2">
                  <i className="fa fa-user-plus mr-1"></i> Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dropdown:hover .dropdown-menu {
          display: block;
          margin-top: 0;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
