import react from "react";
import logo from "../../assets/Logo.jpg";
import { Link } from "react-router-dom";
import "./About.css";
const About = () => {
  return (
    <div className="about-page">
      <div className="navbar">
        <div className="logo-navbar">
          <img src={logo} alt="sharetrip logo" className="logo" />
        </div>
        <div className="navbar-content">
          <Link to="/">
            <button className="navbar-content-ind">HOME</button>
          </Link>

          <Link to="/about">
            {" "}
            <button className="navbar-content-ind">ABOUT</button>
          </Link>
          <Link to="/contact">
            <button className="navbar-content-ind">CONTACT US</button>
          </Link>

          <Link to="/login">
            {" "}
            <button className="navbar-content-ind">LOGIN</button>
          </Link>
          <Link to="/users">
            {" "}
            <button className="navbar-content-ind">SIGNUP</button>
          </Link>
        </div>
      </div>
      <div>THis is about page</div>
    </div>
  );
};

export default About;
