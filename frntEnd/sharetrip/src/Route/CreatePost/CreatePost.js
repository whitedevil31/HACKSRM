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
    <div>
      <h1>create your post</h1>

      <form onSubmit={handleSubmit(OnSubmitHandler)}>
        <input
          type="text"
          placeholder="city to visit"
          name="location"
          ref={register}
        />
        <div className="inputs">
          Journey starting date :
          <input
            type="text"
            placeholder="(YYYY/MM/DD)"
            name="startDate"
            ref={register}
          />
        </div>
        <input
          type="text"
          placeholder="locations planning to visit"
          name="places"
          ref={register}
        />

        <input type="submit" />
        {posted && <p> yay !!! Post created</p>}
      </form>
    </div>
  );
};

export default CreatePost;
