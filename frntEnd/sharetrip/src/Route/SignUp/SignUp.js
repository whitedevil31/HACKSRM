import "./SignUp.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BeatLoader, BarLoader } from "react-spinners";
import { css } from "@emotion/core";
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
      .post("https://sharetrip-spyder.herokuapp.com/users/me/pictures", fd, {
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
    fetch("https://sharetrip-spyder.herokuapp.com/users", {
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
      <h1>Sign Up Here!</h1>
      <div className="signup-container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="signup-container-form"
        >
          <div className="input-container">
            <div className="input-container1">
              <input
                className="input-class"
                type="text"
                placeholder="name"
                name="name"
                ref={register}
              />

              <input
                className="input-class"
                type="text"
                placeholder="age"
                name="age"
                ref={register}
              />

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
            </div>

            <div className="sec-signup">
              <textarea
                type="text"
                placeholder="  Your Bio"
                className="bio"
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
        </form>
      </div>
    </div>
  );
};
export default SignUp;
