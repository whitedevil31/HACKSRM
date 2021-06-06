import "./SignUp.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BeatLoader, BarLoader } from "react-spinners";
import { css } from "@emotion/core";
import logo from "../../assets/Logo.jpg";
import { Link } from "react-router-dom";
const loaderCSS = css`
  margin-top: 15px;
  margin-bottom: 15px;
`;
const SignUp = () => {
  const [spinner, setSpinner] = useState(false);
  const { register, handleSubmit } = useForm();
  const [getAvatar, setAvatar] = useState(null);
  const [setDone, getDone] = useState({});
  const [show, setShow] = useState(false);
  const history = useHistory();
  const fileHandler = (e) => {
    setAvatar(e.target.files[0]);
  };
  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("pictures", getAvatar, getAvatar.name);
    const bearer = "Bearer " + setDone.token;

    axios
      .post("http://localhost:3000/users/me/pictures", fd, {
        headers: { Authorization: bearer },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          history.push("/");
        }
      });
  };

  const onSubmit = (data) => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      response.json().then((res) => {
        console.log("user data is " + res.user);
        console.log("token is " + res.token);
        getDone(res);

        setShow(true);
      });
    });
  };

  return (
    <div className="d-container">
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
      <div className="signup-container">
      <h2>Sign Up</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="signup-container-form"
        >
          <div className="input-contain">
            <div className="input-contain1">
              <input
                className="input-class"
                type="text"
                placeholder="name"
                name="name"
                ref={register}
              />
             
             <p>
              <input
                className="input-class"
                type="text"
                placeholder="age"
                name="age"
                ref={register}
              />
              </p>
                
              <input
                className="input-class"
                type="text"
                placeholder="Gender"
                name="gender"
                ref={register}
              />
               
              <input
                className="input-class"
                type="text"
                placeholder="email"
                name="email"
                ref={register}
              />
               
              <input
                className="input-class"
                type="text"
                placeholder="password"
                name="password"
                ref={register}
              />
            

            <div className="sec-signup">
              <textarea
                type="text"
                placeholder="  Your Bio"
                
                name="bio"
                ref={register}
              />
              <input className="input-class" type="submit" id="d-submit" />
              {show && (
                <div className="upload">
                  <input
                    type="file"
                    onChange={fileHandler}
                    className="filehand"
                  />
                  <button onClick={fileUploadHandler} className="upload-class">
                    UPLOAD
                  </button>
                </div>
              )}
            </div>
          </div>
          </div>  
        </form>
        <div className="para">
        <p>Already registered, log in <a href="./login.html" class="shortcut">here</a>!</p>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
