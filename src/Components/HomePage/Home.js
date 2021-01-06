import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import Balls from "../Ball/Balls";

const Home = (props) => {
  return (
    <div className="hp-mainDiv">
      <Balls />

      <div className="buttons">
        <div class="tooltip">
          <i
            className="fas fa-user fa-2x user-icon"
            onClick={props.showUser}
          ></i>
          <span class="tooltiptext">User Info</span>
        </div>
        <div class="tooltip">
          <div className="instruction">
            <Link to="/instruction">
              <i
                className="fa fa-3x fa-question-circle info-icon"
                aria-hidden="true"
              ></i>
            </Link>
          </div>
          <span class="tooltiptext">How to play</span>
        </div>
        <div class="tooltip">
          <i
            class="fas fa-sign-out-alt signout-icon fa-2x"
            onClick={props.handler}
          ></i>

          <span class="tooltiptext">Log Out</span>
        </div>
      </div>

      <div className="title">
        <h1>HOUSIE</h1>
      </div>
      <div className="roomBtn">
        <Link to="/create-room">
          <button>Create Room</button>
        </Link>

        <Link to="/join-room">
          <button>Join Room</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
