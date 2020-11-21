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
      <div>
        <img
          src={`https://sharetrip-spyder.herokuapp.com/users/${result.owner}/pictures`}
          alt="loading"
          className="profile"
        />{" "}
        <h1>location : {result.location}</h1>
        <h1>{result.ownerName}</h1>
        <h1>places planned to visit :{result.places}</h1>
        <h1>{result.ownerGender}</h1>
        <h1>{result.ownerAge}</h1>
        <div className="a">
          <a
            href={`https://whitedevil31-chatapp.herokuapp.com/chat.html?username=${profile.name}&room=${result.ownerName}`}
            target="_blank"
          >
            CHAT NOW !
          </a>
        </div>
      </div>
    )
  );
};

export default PostId;
