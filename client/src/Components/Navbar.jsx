import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Notes Calendar{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {localStorage.getItem("username") && (
              <div className="mx-1 mb-1">
                Welcome {localStorage.getItem("username")}
              </div>
            )}
            {!localStorage.getItem("username") && (
              <div className="d-flex gap-3">
                <Link
                  to="/signup"
                  type="button"
                  className="btn btn-outline-success"
                >
                  SignUp
                </Link>
                <Link
                  to="/login"
                  type="button"
                  className="btn btn-outline-success"
                >
                  Login
                </Link>
              </div>
            )}
            {localStorage.getItem("username") && (
              <div className="d-flex gap-3">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => {
                    localStorage.setItem("authToken", "");
                    localStorage.setItem("username", "");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
