import React, { useEffect, useState } from "react";
import "./gameroom.css";
import { withRouter } from "react-router-dom";
import Chat from "../Chat/Chat";
import cross from "../../icons/cross.ico";
import Players from "../Players/Players";
import Congratulations from "../Congratulations/Congratulations";

const GameRoom = ({ match, socket }) => {
  const [userId, setUserId] = useState("");
  const [admin, setAdmin] = useState(false);
  const gameroomid = match.params.id;
  const [clicked, setClicked] = useState([]);
  const [number, setNumber] = useState();
  const [disabled, setDisabled] = useState([]);
  const [gameStarted, setgameStarted] = useState(false);
  const [gameWon, setgameWon] = useState(false);
  const [row1boxClicked, setrow1boxClicked] = useState([
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
  ]);
  const [row2boxClicked, setrow2boxClicked] = useState([
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
  ]);
  const [row3boxClicked, setrow3boxClicked] = useState([
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
    "notClicked",
  ]);

  const startTimer = () => {
    if (socket) {
      socket.emit("startTimer", {
        gameroomid,
      });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("timerStarted", (data) => {
        setgameStarted(true);
        setNumber(data.time);
      });
    }
  }, [number]);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);

    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
  const [row1, setrow1] = useState([]);
  const [row2, setrow2] = useState([]);
  const [row3, setrow3] = useState([]);

  const getTicket = () => {
    fetch("http://localhost:8000/gameroom/ticket", {
      method: "POST",
      body: JSON.stringify({ id: gameroomid }),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("CC_TOKEN"),
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        const [ticketrow1, ticketrow2, ticketrow3] = [...r.ticket];
        setrow1(ticketrow1);
        setrow2(ticketrow2);
        setrow3(ticketrow3);
      });
  };

  useEffect(() => {
    getTicket();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("admin", (data) => {
        setAdmin(data.isadmin);
      });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("CC_TOKEN");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.emit("joinroom", {
        gameroomid,
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveroom", {
          gameroomid,
        });
      }
    };
  }, []);

  const verifyTicket = () => {
    const playerClicked = [...clicked];
    if (playerClicked.length < 15) {
      alert("not won");
    } else {
      const verify = playerClicked.filter(
        (ticket) =>
          !row1.includes(ticket) &&
          !row2.includes(ticket) &&
          !row3.includes(ticket)
      );

      if (verify) {
        alert("not won");
      } else {
        setgameWon(true);
        alert("You Won");
      }
    }
  };

  const ticketClicked = (e, idx, row) => {
    const clickedNumber = Number(e.target.innerText);

    if (!gameStarted || disabled.includes(clickedNumber)) {
      return;
    }

    if (clickedNumber === number) {
      const tempArr = [...clicked];
      tempArr.push(clickedNumber);
      setClicked(tempArr);
    } else {
      const tempArr = [...disabled];
      tempArr.push(clickedNumber);
      setDisabled(tempArr);
    }
    if (row === "row1") {
      const tempArr = [...row1boxClicked];
      tempArr[idx] = "cross";
      setrow1boxClicked(tempArr);
    }
    if (row === "row2") {
      const tempArr = [...row2boxClicked];
      tempArr[idx] = "cross";
      setrow2boxClicked(tempArr);
    }
    if (row === "row3") {
      const tempArr = [...row3boxClicked];
      tempArr[idx] = "cross";
      setrow3boxClicked(tempArr);
    }
  };

  return (
    <div className="gr-mainDiv blue-bg">
      <div className="countdown-timer">
        {admin ? (
          gameStarted ? null : (
            <div className="claim-button">
              <button onClick={startTimer}>Start Game</button>
            </div>
          )
        ) : (
          <div className="title">Wait for Admin to start the game</div>
        )}

        {number ? (
          <div className="calledNumber ball brown-bg">{number}</div>
        ) : null}
      </div>
      {/* <Chat socket={socket} userId={userId} gameroomid={gameroomid} /> */}
      <Players socket={socket} />

      <div className="ticket-container">
        <div className="row">
          {row1.map((number, idx) => {
            return number === 100 ? (
              <>
                <div className={`ticket-box ${row1boxClicked[idx]}`}></div>
              </>
            ) : (
              <div
                onClick={(event) => ticketClicked(event, idx, "row1")}
                className={`ticket-box ${row1boxClicked[idx]}`}
              >
                <figure className="ticket-ball code">{number}</figure>
              </div>
            );
          })}
        </div>
        <div className="row">
          {" "}
          {row2.map((number, idx) => {
            return number === 100 ? (
              <>
                <div className={`ticket-box ${row2boxClicked[idx]}`}></div>
              </>
            ) : (
              <div
                onClick={(event) => ticketClicked(event, idx, "row2")}
                className={`ticket-box ${row2boxClicked[idx]}`}
              >
                <figure className="ticket-ball code">{number}</figure>
              </div>
            );
          })}
        </div>
        <div className="row">
          {" "}
          {row3.map((number, idx) => {
            return number === 100 ? (
              <>
                <div className={`ticket-box ${row3boxClicked[idx]}`}></div>
              </>
            ) : (
              <div
                onClick={(event) => ticketClicked(event, idx, "row3")}
                className={`ticket-box ${row3boxClicked[idx]}`}
              >
                <figure className="ticket-ball code">{number}</figure>
              </div>
            );
          })}
        </div>
      </div>

      {gameWon ? <Congratulations /> : null}
      {/* <Congratulations /> */}

      <div className="claim-button">
        <button onClick={() => verifyTicket()}>Claim Full House</button>
      </div>
    </div>
  );
};

export default withRouter(GameRoom);
