import React from "react";

const Form = (props) => {
  return (
    <div className="form">
      <div className="input-container">
        <i className="fa fa-user icon"></i>
        <input
          type="text"
          placeholder="Enter Username"
          value={props.userName}
          onChange={props.userNamechangeHandler}
          className="input_field"
        ></input>
      </div>

      <div className="input-container">
        <i className="fa fa-key icon" aria-hidden="true"></i>
        <input
          type="password"
          placeholder="Enter Password"
          value={props.password}
          onChange={props.passwordchangeHandler}
          className="input_field"
        ></input>
      </div>

      {props.err ? <div className="error">{props.err}</div> : null}
    </div>
  );
};

export default Form;
