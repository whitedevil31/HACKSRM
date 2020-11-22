import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";

import "./PostId.css";

const PostId = () => {
  const [result, setResult] = useState({});
  const [profile, getProfile] = useState({});
  const [show, setShow] = useState(false);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const bearer = "Bearer " + location.state.pwd;
    fetch("https://sharetrip-spyder.herokuapp.com/users/me", {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((res) => {
        console.log(res);
        console.log("porilf egot");
        getProfile(res);
      });
    });
  }, []);
  useEffect(() => {
    const ids = location.state.locationId;
    const bearer = "Bearer " + location.state.pwd;

    fetch(`https://sharetrip-spyder.herokuapp.com/travel/${ids}`, {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((res) => {
        console.log(res);
        setResult(res);
        setTimeout(() => {
          setShow(true);
          console.log("set true da");
        }, 300);
      });
    });
  }, []);

  return (
    show && (
      <div className="id-container">
        <div className="img-div">
          <img
            src={`https://sharetrip-spyder.herokuapp.com/users/${result.owner}/pictures`}
            alt="loading"
            className="id-profile"
          />

          <div className="id-a">
            <a
              href={`https://whitedevil31-chatapp.herokuapp.com/chat.html?username=${profile.name}&room=${result.ownerName}`}
              target="_blank"
              className="id-tag"
            >
              CHAT NOW !
            </a>
          </div>
        </div>
        <div className="info">
          <div className="id-left">
            <h2>Name : {result.ownerName}</h2>
            <h1>Gender : {result.ownerGender}</h1>
            <h1>Age : {result.ownerAge}</h1>
            <h3>Myself :{result.ownerBio}</h3>
          </div>
          <div className="id-right">
            <h1>Location : {result.location}</h1>
            <h1>places planned to visit :{result.places}</h1>
            <h1>Trip planned for : {result.days}</h1>
            <h1>Maximum Budget : ₹{result.Budget}</h1>
            <h1>Expected Travel partner gender : {result.Expected}</h1>
          </div>
        </div>
      </div>
    )
  );
};

export default PostId;
