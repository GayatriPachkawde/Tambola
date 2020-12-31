import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./createRoom.css";

const CreateRoom = () => {
  const [code, setCode] = useState(undefined);
  const [showEnterbutton, setshowEnterbutton] = useState(false);
  const generateCode = () => {
    setCode(Math.floor(100000 + Math.random() * 900000));
    setshowEnterbutton(true);
  };
  return (
    <div className="mainDiv">
      <div className="cr-div">
        <h1 className="cr-title">Create Room</h1>
        {code ? <div className="code">{code}</div> : null}
        {showEnterbutton ? (
          <Link to="/game-room">
            <div id="btn">
              Enter Room
              <div id="circle"></div>
            </div>
          </Link>
        ) : (
          <div id="btn" onClick={generateCode}>
            Generate Code
            <div id="circle"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRoom;
