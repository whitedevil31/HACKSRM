import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/Logo.jpg";
import "./Login.css";
import { useForm } from "react-hook-form";
import { BeatLoader, BarLoader } from "react-spinners";
import { css } from "@emotion/core";
const loaderCSS = css`
  margin-top: 25px;
  margin-bottom: 25px;
`;
const Login = () => {
  let history = useHistory();
  const [spinner, setSpinner] = useState(false);
  const { register, handleSubmit } = useForm();
  const OnSubmit = (data) => {
    fetch("https://sharetrip-spyder.herokuapp.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      response.json().then((res) => {
        const tokenId = res.token;

        if (response.status === 200) {
          history.push("/dashboard", {
            tags: tokenId,
          });
        }
      });
    });
  };
  return (
    <div className="container">
      <div className="navbar">
        <div className="logo-navbar">
          <img src={logo} alt="sharetrip logo" className="logo" />
        </div>
        <div className="navbar-content">
          <Link to="/home">
            <button className="navbar-content-ind">HOME</button>
          </Link>
          <Link to="/about">
            {" "}
            <button className="navbar-content-ind">ABOUT</button>
          </Link>{" "}
          <Link to="/contact">
            <button className="navbar-content-ind">CONTACT US</button>
          </Link>
          <Link to="/">
            {" "}
            <button className="navbar-content-ind">LOGIN</button>
          </Link>
          <Link to="/users">
            {" "}
            <button className="navbar-content-ind">SIGNUP</button>
          </Link>
        </div>
      </div>
      <div className="loginForm">
        <img src={logo} alt="sharetrip logo" className="logo" />
        <div className="formArea">
          <form onSubmit={handleSubmit(OnSubmit)} className="formArea">
            <div className="input-container">
              <input
                className="input-entry"
                type="text"
                placeholder="Email"
                name="email"
                ref={register}
              />
              <input
                className="input-entry"
                type="password"
                placeholder="Password"
                name="password"
                ref={register}
              />
            </div>
            <div className="submit">
              <input
                className="form-btn-submit"
                type="submit"
                onClick={() => setSpinner(!spinner)}
              />
            </div>
          </form>
        </div>
      </div>
      <BeatLoader css={loaderCSS} loading={spinner} color="blue" />
      <h4 className="h4-text">Don't have an account? Register Here!</h4>
      <Link to="/users">
        <div class="signup">
          <button className="signup">SIGNUP</button>
        </div>
      </Link>
    </div>
  );
};
export default Login;
