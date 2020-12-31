import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import Balls from "./Balls";

const Home = (props) => {
  const balls1 = [
    { ballIndex: "ball1", number: 12 },
    { ballIndex: "ball2", number: 45 },
    { ballIndex: "ball3", number: 32 },
    { ballIndex: "ball4", number: 8 },
    { ballIndex: "ball5", number: 34 },
  ];

  const balls2 = [
    { ballIndex: "ball6", number: 54 },
    { ballIndex: "ball7", number: 31 },
    { ballIndex: "ball8", number: 47 },
    { ballIndex: "ball9", number: 1 },
    { ballIndex: "ball0", number: 27 },
  ];
  return (
    <div className="hp-mainDiv">
      <div className="balls_div_1">
        <Balls ballData={balls1} />
      </div>

      <div className="balls_div_2">
        <Balls ballData={balls2} />
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
      <div className="buttons">
        <i className="fas fa-user fa-2x user-icon" onClick={props.showUser}></i>
        <div className="instruction">
          <Link to="/instruction">
            <i
              className="fa fa-3x fa-question-circle info-icon"
              aria-hidden="true"
            ></i>
          </Link>
        </div>
        <div>
          <i
            class="fas fa-sign-out-alt signout-icon fa-2x"
            onClick={props.handler}
          ></i>
        </div>

        {/* <button onClick={props.handler}>Log Out</button> */}
      </div>
    </div>
  );
};

export default Home;
