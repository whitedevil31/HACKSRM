import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../App.css";
import { useForm } from "react-hook-form";
import { BeatLoader, BarLoader } from "react-spinners";
import { css } from "@emotion/core";
const loaderCSS = css`
  margin-top: 25px;
  margin-bottom: 25px;
`;
const Login = () => {
    let history = useHistory();
    const [spinner, setSpinner] = useState(false);
    const { register, handleSubmit } = useForm();
    const OnSubmit = (data) => {
        fetch("https://travel-partner-backend.herokuapp.com/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => {
            response.json().then((res) => {
                const tokenId = res.token;

                if (response.status === 200) {
                    history.push("/dashboard", {
                        tags: tokenId,
                    });
                }
            });
        });
    };
    return (<div>
        <h1>login page</h1>
        <form onSubmit={handleSubmit(OnSubmit)}>
            <input type="text" placeholder="email" name="email" ref={register} />
            <input
                type="password"
                placeholder="password"
                name="password"
                ref={register}
            />
            <input type="submit" onClick={() => setSpinner(!spinner)} />
        </form>

        <BarLoader css={loaderCSS} loading={spinner} color="blue" />
        <h4>if you dont have a account pls click here to register</h4>
        <Link to="/users">
            <button>SIGNUP</button>
        </Link>
    </div>)
}
export default Login
