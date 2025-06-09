import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { token, name, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      data-bs-theme="dark"
      style={{ background: 'rgb(30, 71, 105)' }}
    >
      <div className="container-fluid">
        {/* Logo and Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="VOCAL~LOCAL Logo"
            height="40"
            className="me-2"
          />
          <span
            style={{
              color: 'rgb(227, 182, 59)',
              fontWeight: 'bold',
              fontFamily: 'cursive',
            }}
          >
            VOCAL~LOCAL
          </span>
        </Link>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ fontFamily: 'cursive' }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search" style={{ fontFamily: 'cursive' }}>
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/searchcat" style={{ fontFamily: 'cursive' }}>
                Categories
              </Link>
            </li>

            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/addstore" style={{ fontFamily: 'cursive' }}>
                    Add Store
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/mystore" style={{ fontFamily: 'cursive' }}>
                    My Store
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout} style={{ fontFamily: 'cursive' }}>
                    Logout
                  </Link>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    style={{
                      color: 'rgb(227, 182, 59)',
                      fontFamily: 'cursive',
                      textAlign: 'right',
                    }}
                  >
                    Welcome, {name}
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/signup"
                    style={{
                      color: 'rgb(227, 182, 59)',
                      fontFamily: 'cursive',
                    }}
                  >
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/signin"
                    style={{
                      color: 'rgb(227, 182, 59)',
                      fontFamily: 'cursive',
                    }}
                  >
                    Sign In
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

export default Navbar;
