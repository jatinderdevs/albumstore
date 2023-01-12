import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
      <a className="navbar-brand" href="/">
        Navbar
      </a>
      <button
        className="navbar-toggler"
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
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className="nav-link">
              Admin
            </Link>
          </li>
        </ul>
        <div className="form-inline my-2 my-lg-0">
          {!user && (
            <React.Fragment>
              <Link to="/signup" className="btn btn-outline-light">
                Register
              </Link>
              &nbsp;|&nbsp;
              <Link to="/signin" className="btn btn-outline-light">
                Sign In
              </Link>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <Link to="/profile" className="btn text-capitalize btn-light">
                Hi! {user.username}
              </Link>
              &nbsp;|&nbsp;
              <Link to="/logout" className="btn btn-outline-warning">
                Log Out
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
