import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { FiMenu } from "react-icons/fi";
import "./Tb.css";

const Tb = () => {
  const { user, dispatch } = useContext(Context);
  const PF = "https://t/images/";
  const defaultProfilePic = "user.jpg";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleImageError = (e) => {
    e.target.src = defaultProfilePic;
  };

  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef();

  const toggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
  };

  // Close the navigation when clicking outside the navbar
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch profile picture from localStorage if available
  const userProfilePic = localStorage.getItem("userProfilePic") || (user?.profilePic || defaultProfilePic);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light ${isNavOpen ? "show-nav" : ""}`}>
      {/* Added 'sticky-top' for making the topbar sticky */}
      <div className="container-fluid" ref={navRef}>
        {/* Left Section */}
        <div className="navbar-left">
          <Link className="navbar-brand" to="/">
            TPO MITS {/* Company name at the top left */}
          </Link>
        </div>

        {/* Custom Toggle Button */}
        <button className="navbar-toggler" type="button" onClick={toggleNav}>
          <FiMenu />
        </button>

        {/* Middle and Right Section */}
        <div className={`navbar-middle-right ${isNavOpen ? "show" : ""}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/home" onClick={toggleNav}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dsa" onClick={toggleNav}>
                DSA
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={toggleNav}>
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link middle" to="/write" onClick={toggleNav}>
                Write
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/settings" onClick={toggleNav}>
                    <img
                      src={PF + userProfilePic}
                      alt="User Profile"
                      onError={handleImageError}
                      className="rounded-circle me-2"
                      style={{ width: "30px", height: "30px" }}
                    />
                    {user.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link btn btn-danger"
                    to="/"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link btn btn-success"
                    to="/login"
                    onClick={toggleNav}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link btn btn-success"
                    to="/register"
                    onClick={toggleNav}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Tb;
