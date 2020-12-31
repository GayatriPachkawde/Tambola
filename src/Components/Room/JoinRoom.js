import React from "react";
import { Link } from "react-router-dom";

const JoinRoom = () => {
  return (
    <div className="mainDiv">
      <div className="cr-div">
        <h1 className="cr-title">Join Room</h1>

        <h2>Enter Room Code</h2>
        <div id="divOuter">
          <div id="divInner">
            <input
              id="partitioned"
              type="text"
              maxlength="6"
              oninput={(event) => {
                event.target.value = event.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*)\./g, "$1");
              }}
              onKeyPress={(event) => {
                if (event.target.value.length === 4) return false;
              }}
            />
          </div>
        </div>
        <Link to="/game-room">
          <div id="btn">
            Enter Room
            <div id="circle"></div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default JoinRoom;
