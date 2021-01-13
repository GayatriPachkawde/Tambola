import React, { useState } from "react";
import "./loginStyle.css";
import Signup from "./Signup";
import Form from "./Form";

const Login = (props) => {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  const [signup, setsignup] = useState(false);
  console.log(props.err);

  const userNamechangeHandler = (e) => {
    setuserName(e.target.value);
  };

  const passwordchangeHandler = (e) => {
    setpassword(e.target.value);
  };
  return (
    <div className="mainDiv">
      <h1 className="fp-title">Welcome to Housie</h1>
      <div className="fp-div">
        <div className="login">
          {signup ? (
            <h1 className="heading">Register</h1>
          ) : (
            <h1 className="heading">Log In</h1>
          )}
          <Form
            userName={userName}
            password={password}
            userNamechangeHandler={(e) => userNamechangeHandler(e)}
            passwordchangeHandler={(e) => passwordchangeHandler(e)}
            err={props.err}
          />

          {signup ? (
            <div
              className="login-signup"
              id="btn"
              onClick={() => {
                setsignup(false);
                props.signupHandler(userName, password);
              }}
            >
              Register<div id="circle"></div>
            </div>
          ) : (
            <div
              className="login-signup"
              id="btn"
              onClick={() => props.loginHandler(userName, password)}
            >
              Log In<div id="circle"></div>
            </div>
          )}
        </div>
        <div className="signup">
          {signup ? null : (
            <Signup showSignup={signup} signup={() => setsignup(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
