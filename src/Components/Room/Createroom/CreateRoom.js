import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./createRoom.css";
import Balls from "../../Ball/Balls";
import { withRouter } from "react-router-dom";

const CreateRoom = (props) => {
  const username = localStorage.getItem("username");
  const [id, setid] = useState();
  const [code, setcode] = useState();
  const [showEnterbutton, setshowEnterbutton] = useState(false);

  const generateCode = () => {
    const roomcode = Math.floor(100000 + Math.random() * 900000);
    setcode(roomcode);
    return roomcode;
  };

  const createRoom = () => {
    generateCode();
    setshowEnterbutton(true);
    console.log(username);
    fetch("http://localhost:8000/gameroom", {
      method: "POST",
      body: JSON.stringify({ name: generateCode(), username }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("CC_TOKEN"),
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setid(r._id);
      })
      .catch((err) => {
        setTimeout(createRoom, 3000);
      });
  };

  return (
    <div className="cr-mainDiv blue-bg">
      <Balls />
      <div className="jr-title">Create Room</div>
      <div className="cr-container">
        {showEnterbutton ? <div className="code">{code}</div> : null}
        {showEnterbutton ? (
          <Link to={"/game-room/" + id}>
            <button>Enter</button>
          </Link>
        ) : (
          <button onClick={createRoom}>Generate Code</button>
        )}
      </div>
    </div>
  );
};

export default withRouter(CreateRoom);
