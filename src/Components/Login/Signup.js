import React from "react";

const Signup = (props) => {
  return (
    <div className="box">
      <h1 className="register-heading">Don't have an account?</h1>
      <div className="signup-btn" onClick={props.signup}>
        Register
      </div>
    </div>
  );
};

export default Signup;
