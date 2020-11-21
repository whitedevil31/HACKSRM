import "./SignUp.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
const SignUp = () => {
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
      .post(
        "https://travel-partner-backend.herokuapp.com/users/me/pictures",
        fd,
        { headers: { Authorization: bearer } }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          history.push("/");
        }
      });
  };

  const onSubmit = (data) => {
    fetch("https://travel-partner-backend.herokuapp.com/users", {
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
                placeholder="Bio"
                className="bio"
                name="bio"
                ref={register}
              />
              <input className="input-class" type="submit" id="d-submit" />
              {show && (
                <div className="upload">
                  <input type="file" onChange={fileHandler} />
                  <button onClick={fileUploadHandler} className="d-upload">
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
