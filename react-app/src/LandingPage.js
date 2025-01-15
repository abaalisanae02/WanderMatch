import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import logo from "./asserts/Logo.PNG"; // Ensure the logo path is correct

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Background GIF */}
      <div className="background"></div>

      {/* Header with logo and navigation */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <nav>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      {/* Page Content */}
      <div className="content">
        <h1>
          Time for your <span className="highlight">next adventure</span>
        </h1>
        <p>Let us help you with it</p>
        <Link to="/questionnaire">
          <button className="cta-button">
            LOOK FOR YOUR DESTINATION
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
