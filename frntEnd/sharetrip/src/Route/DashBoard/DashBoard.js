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
    fetch("https://sharetrip-spyder.herokuapp.com/users/me", {
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

    const getting = await fetch(
      "https://sharetrip-spyder.herokuapp.com/travel/filter",
      {
        method: "POST",
        withCredentials: true,
        headers: { Authorization: bearer, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const get = await getting.json();

    setTimeout(() => {
      setResult(get);
      console.log(result);
    }, 2000);
  };

  const logoutHandler = () => {
    const bearer = "Bearer " + nanda;

    fetch("https://sharetrip-spyder.herokuapp.com/users/logout", {
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
          <button onClick={logoutHandler} className="logout">
            logout
          </button>
          <Link to={{ pathname: "/post", state: { foo: nanda } }}>
            <button className="btn-sign-up">CreatePost</button>
          </Link>
          <a
            href={`https://whitedevil31-chatapp.herokuapp.com/chat.html?username=${profile.name}&room=${profile.name}`}
            target="_blank"
            className="chat-msg"
          >
            check msgs !
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit(OnSubmitHandler)} className="dash-form">
        <div className="search">
          <input
            className="dash-input"
            type="text"
            placeholder="location to search for"
            name="location"
            ref={register}
          />
          <input
            className="dash-input"
            type="text"
            placeholder="starting date"
            name="startDate"
            ref={register}
          />
          <input
            className="dash-input"
            type="text"
            placeholder="ending date"
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
              <img
                src={`https://sharetrip-spyder.herokuapp.com/users/${item.owner}/pictures`}
                alt="loading"
                className="profile"
              />
              <p>Name : {item.ownerName}</p>
              <p>Travel:{moment(item.startDate).format("DD-MM-YYYY")}</p>
              <p> Age :{item.ownerAge}</p>
              <p> Gender :{item.ownerGender}</p>
              <p>locations planned :{item.places}</p>
            </div>
          ))}
        </div>
      )}
      {logout && <h1>logging out !!!!</h1>}
    </div>
  );
};

export default DashBoard;
