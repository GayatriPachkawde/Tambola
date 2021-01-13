import React, { useState } from "react";
import { Link } from "react-router-dom";

const RoomCode = (props) => {
  const [roomcode, setroomCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState();
  const setInputInArray = (e, idx) => {
    const newArr = [...roomcode];
    newArr[idx] = e.target.value;
    setroomCode(newArr);
  };

  const [id, setId] = useState();

  const joinRoom = () => {
    const name = roomcode.join("");
    fetch("http://localhost:8000/gameroom/getRoom", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("CC_TOKEN"),
        name,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.error) {
          throw "error";
        }
        if (r.id) {
          setId(r.id);
          setError("");
        }
      })
      .catch((err) => {
        setError("Gameroom does not exist.");
      });
  };

  return (
    <div className="rc-container">
      <h2 className="rc-title">Enter Room Code</h2>
      <div className="code-container">
        <input
          type="text"
          maxLength="1"
          id="1"
          autoFocus
          onKeyUpCapture={(e) => {
            if (e.keyCode === 8) {
              document.getElementById("1").focus();
            } else {
              document.getElementById("2").focus();
            }
          }}
          autocomplete="off"
          className="brown-bg"
          onChange={(e) => setInputInArray(e, 0)}
          value={roomcode[0]}
        />
        <input
          type="text"
          maxLength="1"
          id="2"
          autocomplete="off"
          onKeyUpCapture={(e) => {
            if (e.keyCode === 8) {
              document.getElementById("1").focus();
            } else {
              document.getElementById("3").focus();
            }
          }}
          className="brown-bg"
          onChange={(e) => setInputInArray(e, 1)}
          value={roomcode[1]}
        />
        <input
          type="text"
          maxLength="1"
          id="3"
          autocomplete="off"
          onKeyUpCapture={(e) => {
            if (e.keyCode === 8) {
              document.getElementById("2").focus();
            } else {
              document.getElementById("4").focus();
            }
          }}
          className="brown-bg"
          onChange={(e) => setInputInArray(e, 2)}
          value={roomcode[2]}
        />
        <input
          type="text"
          maxLength="1"
          id="4"
          autocomplete="off"
          onKeyUpCapture={(e) => {
            if (e.keyCode === 8) {
              document.getElementById("3").focus();
            } else {
              document.getElementById("5").focus();
            }
          }}
          className="brown-bg"
          onChange={(e) => setInputInArray(e, 3)}
          value={roomcode[3]}
        />
        <input
          type="text"
          maxLength="1"
          id="5"
          autocomplete="off"
          onKeyUpCapture={(e) => {
            if (e.keyCode === 8) {
              document.getElementById("4").focus();
            } else {
              document.getElementById("6").focus();
            }
          }}
          className="brown-bg"
          onChange={(e) => setInputInArray(e, 4)}
          value={roomcode[4]}
        />
        <input
          type="text"
          maxLength="1"
          id="6"
          className="brown-bg"
          autocomplete="off"
          onChange={(e) => setInputInArray(e, 5)}
          onKeyUpCapture={(e) => {
            if (e.keyCode === 8) {
              document.getElementById("5").focus();
            }
          }}
          value={roomcode[5]}
          onKeyUp={joinRoom}
        />
      </div>
      {error ? <div className="error">{error}</div> : null}
      <div className="jr-buttons">
        <Link to={"/game-room/" + id}>
          <button disabled={id ? false : true}>Enter Room</button>
        </Link>
        <button onClick={props.handler}>Active Rooms</button>
      </div>
    </div>
  );
};

export default RoomCode;
