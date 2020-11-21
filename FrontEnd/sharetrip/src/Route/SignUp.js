import "../dApp.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { useForm } from "react-hook-form";
const SignUp=()=>{
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
          "",
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
      fetch("", {
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
    








    return(<div className="d-container">
    <h1>Sign Up Here!</h1>
    <br></br>

    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="name" name="name" ref={register} />
      <br></br>
      <br></br>
      <input type="text" placeholder="age" name="age" ref={register} />
      <br></br>
      <br></br>
      <legend id="title5" class="desc">
        Gender
      </legend>
      
     
      	<input id="radioDefault_5" name="Field5" type="hidden" value="" />
      
      		<input id="Field5_0" name="Field5" type="radio" value="Male" tabindex="5" ref={register}/>
      		<label class="choice" for="Field5_0">Male</label>
            
        	<input id="Field5_1" name="Field5" type="radio" value="Female" tabindex="6" ref={register}/>
        	<label class="choice" for="Field5_1">Female</label>
            
      <input id="Field5_2" name="Field5" type="radio" value="I prefer not to say" tabindex="7" ref={register}/>
        	<label class="choice" for="Field5_2">I prefer not to say</label>
      
      <br></br>
      <br></br>
      <input type="text" placeholder="email" name="email" ref={register} />
      <br></br>
      <br></br>
      <input
        type="text"
        placeholder="password"
        name="password"
        ref={register}
      />
      <br></br>
      <br></br>
      <input type="text" placeholder="gender" name="gender" ref={register}  />
      <br></br>
      <br></br>
      <textarea
        type="text"
        placeholder="bio"
        className="bio"
        name="bio"
        ref={register}
      />

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <input type="submit" className="d-submit" />
      {show && (
        <div>
          <input type="file" onChange={fileHandler} />
          <button onClick={fileUploadHandler} className="d-upload">UPLOAD</button>
        </div>
      )}
    </form>
  </div>)}
  export default SignUp
