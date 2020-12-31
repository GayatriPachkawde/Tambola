import React, { useState } from "react";

const Signup = (props) => {
  return (
    <div className="box">
      <h1>Don't have an account?</h1>
      <div className="signup-btn" onClick={props.signup}>
        Sign Up
      </div>
    </div>
  );
};

export default Signup;
