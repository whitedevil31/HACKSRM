import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./CreatePost.css";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
const CreatePost = () => {
  const [posted, setPosted] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { register, handleSubmit } = useForm();

  const OnSubmitHandler = (data) => {
    const foo = location.state.foo;
    const bearer = "Bearer " + location.state.foo;
    fetch("https://sharetrip-spyder.herokuapp.com/travel", {
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      body: JSON.stringify(data),
    }).then((locations) => {
      locations.json().then((location) => {
        setPosted(true);
        console.log(location);

        history.push("/dashboard", { off: foo });
      });
    });
  };
  return (
    <div className="crt-container">
      <h1 className="crt-h1">Create a post to the outer World ! </h1>

      <form onSubmit={handleSubmit(OnSubmitHandler)} className="crt-post">
        <div className="lft">
          {" "}
          <input
            type="text"
            placeholder="city to visit"
            name="location"
            ref={register}
            className="input-crt"
          />
          <input
            type="text"
            placeholder="Jouney date in (YYYY/MM/DD)"
            name="startDate"
            ref={register}
            className="input-crt"
          />
          <input
            className="input-crt"
            type="text"
            placeholder="Number of days of travel"
            name="days"
            ref={register}
          />
          <input
            className="input-crt"
            type="text"
            placeholder="Budget planned"
            name="Budget"
            ref={register}
          />
        </div>
        <div className="rgt">
          <textarea
            className="input-crt-txt"
            type="text"
            placeholder="locations planning to visit"
            name="places"
            ref={register}
          />
          <input type="submit" className="crt-submit" id="crt-submit" />
        </div>

        {posted && <p> yay !!! Post created</p>}
      </form>
    </div>
  );
};

export default CreatePost;
