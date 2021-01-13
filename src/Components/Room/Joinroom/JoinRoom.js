import React, { useState, useEffect } from "react";
import "./joinroom.css";
import RoomCode from ".././RoomCode";
import { Link } from "react-router-dom";
import Balls from "../../Ball/Balls";
import { withRouter } from "react-router-dom";

const JoinRoom = (props) => {
  const [gamerooms, setGamerooms] = useState([]);
  const [showRooms, setshowRooms] = useState(false);

  const getGamerooms = () => {
    setshowRooms(true);
    fetch("http://localhost:8000/gameroom", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("CC_TOKEN"),
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setGamerooms(r);
      })
      .catch((err) => {
        setTimeout(getGamerooms, 3000);
      });
  };

  return (
    <div className="jr-mainDiv blue-bg">
      <Balls />

      <div className="jr-title">Join Room</div>
      {/* <button onClick={getGamerooms}>Show Rooms</button> */}
      {showRooms ? (
        <div className="gamerooms">
          {gamerooms.map((room) => {
            return (
              <div className="gameroom">
                <p className="code jr-code">{room.name}</p>

                <Link to={"/game-room/" + room._id}>
                  <button className="join-btn">
                    Join <i class="fa fa-arrow-right" aria-hidden="true"></i>
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <RoomCode handler={getGamerooms} />
      )}
    </div>
  );
};

export default withRouter(JoinRoom);
