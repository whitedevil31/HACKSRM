import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/Logo.jpg"
import "../App.css";
import { useForm } from "react-hook-form";
import { BeatLoader, BarLoader } from "react-spinners";
import { css } from "@emotion/core";
const loaderCSS = css
    `
//   margin-top: 25px;
//   margin-bottom: 25px;
`;
const Login = () => {
    let history = useHistory();
    const [spinner, setSpinner] = useState(false);
    const { register, handleSubmit } = useForm();
    const OnSubmit = (data) => {
        fetch("", {
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
    return (<div class="Body">
        <section class="loginForm">
            <img src={logo} alt="sharetrip logo" />
            <h1>Log In Here!</h1>
            <form onSubmit={handleSubmit(OnSubmit)}>
                <input type="text" class="inputs" placeholder="Email" name="email" ref={register} />
                <input
                    class="inputs"
                    type="password"
                    placeholder="Password"
                    name="password"
                    ref={register}
                />
                <input class="buttons" type="submit" onClick={() => setSpinner(!spinner)} />
            </form>
        </section>
        <BarLoader css={loaderCSS} loading={spinner} color="blue" />
        <h4>Don't have an account? Register Here!</h4>
        <Link to="/users">
            <div class="signup">
                <button class="buttons">SIGNUP</button>
            </div>
        </Link>
    </div>)
}
export default Login
