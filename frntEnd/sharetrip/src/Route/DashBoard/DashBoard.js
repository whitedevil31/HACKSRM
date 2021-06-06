import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./DashBoard.css";
import moment from "moment";

const DashBoard = () => {
  var item;

  const location = useLocation();
  const nanda = location.state.tags || location.state.off;
  const [profile, getProfile] = useState({});
  const [logout, setLogout] = useState(false);
  const [redmi, setRedmi] = useState(false);
  const [result, setResult] = useState([]);
  const { register, handleSubmit } = useForm();

  const history = useHistory();
  useEffect(() => {
    const bearer = "Bearer " + nanda;
    fetch("http://localhost:3000/users/me", {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((res) => {
        getProfile(res);
      });
    });
  }, []);

  const OnSubmitHandler = async (data) => {
    const bearer = "Bearer " + nanda;

    const getting = await fetch("http://localhost:3000/travel/filter", {
      method: "POST",
      withCredentials: true,
      headers: { Authorization: bearer, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const get = await getting.json();

    setTimeout(() => {
      setResult(get);
      console.log(result);
    }, 2000);
  };

  const logoutHandler = () => {
    const bearer = "Bearer " + nanda;

    fetch("http://localhost:3000/users/logout", {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
      },
    }).then((response) => {
      console.log(response.status);
      setLogout(true);
      setTimeout(() => {
        if (response.status === 200) {
          history.push("/");
        }
      }, 800);
    });
  };
  const componentHandler = (item) => {
    history.push(`/postId/${item}`, { locationId: item, pwd: nanda });
  };

  return (
    <div className="dash-container">
      <div className="dash-header">
        <div className="header-left">
          <h1>DashBoard</h1>
        </div>
        <div className="header-right">
          <Link to={{ pathname: "/post", state: { foo: nanda } }}>
            <button className="btn-sign-up">CREATE POST</button>
          </Link>
          <a
            href={`https://thechatterbotks.herokuapp.com/chat.html?username=${profile.name}&room=${profile.name}`}
            target="_blank"
            className="chat-msg"
          >
            MY INBOX
          </a>
          <button onClick={logoutHandler} className="logout">
            LOGOUT
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(OnSubmitHandler)} className="dash-form">
        <div className="search">
          <h2>Create Ride</h2>
          <input
            className="dash-input"
            type="text"
            placeholder="Location to search for"
            name="location"
            ref={register}
          />
          <input
            className="dash-input"
            type="text"
            placeholder="Starting date(YYYY-MM-DD)"
            name="startDate"
            ref={register}
          />
          <input
            className="dash-input"
            type="text"
            placeholder="Ending date(YYYY-MM-DD)"
            name="endDate"
            ref={register}
          />

          <input className="btn-submit" type="submit" />
        </div>
      </form>

      {redmi && (
        <div>
          <h4>{profile.name}</h4>
          <h5>{profile.email}</h5>

          <img
            src={`/users/${profile._id}/pictures`}
            alt="loading"
            className="profile"
          />
        </div>
      )}
      {result && (
        <div className="component">
          {result.map((item) => (
            <div
              key={item._id}
              className="RESULT"
              onClick={() => {
                componentHandler(item._id);
              }}
            >
              <div className="RESULT_LEFT">
                <img
                  src={`http://localhost:3000/users/${item.owner}/pictures`}
                  alt="loading"
                  className="profile"
                />
                <h4>{item.ownerName}</h4>
              </div>
              <div className="RESULT_RIGHT">
                <div className="left">
                  <h4>Travel:{moment(item.startDate).format("DD-MM-YYYY")}</h4>
                  <h4>Budget:₹ {item.Budget}</h4>
                  <h4>Expected Partner:{item.Expected}</h4>
                </div>
                <div className="right">
                  <h4>Trip planned :{item.days} days</h4>
                  <h4>Age :{item.ownerAge}</h4>
                  <h4> Gender :{item.ownerGender}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashBoard;
