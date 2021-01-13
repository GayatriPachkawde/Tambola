import React, { useEffect, useState } from "react";
import "./gameroom.css";
import { withRouter } from "react-router-dom";
import Chat from "../Chat/Chat";
import cross from "../../icons/cross.ico";
import Players from "../Players/Players";

const GameRoom = ({ match, location, socket }) => {
  const [userId, setUserId] = useState("");
  const [admin, setAdmin] = useState(false);
  const [showTikcet, setshowTicket] = useState(false);
  const gameroomid = match.params.id;
  const [clicked, setClicked] = useState([]);
  const [time, setTime] = useState();
  const [disabled, setDisabled] = useState([]);
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
    socket.on("timerStarted", (data) => {
      setTime(data.time);
    });
  }, [time]);

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
    setshowTicket(true);
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
    if (socket) {
      socket.on("admin", (data) => {
        setAdmin(data.isadmin);
      });
    }
  });

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
          admin,
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
        alert("won");
      }
    }
  };

  const ticketClicked = (e) => {
    const number = e.target.innerText;

    if (number && !disabled.includes(number)) {
      if (Number(number) === Number(time)) {
        const tempArr = [...clicked];
        if (!tempArr.includes(number)) {
          tempArr.push(number);
          setClicked(tempArr);
        }
      }
      e.target.classList.add("cross");
    }
  };

  return (
    <div className="hp-mainDiv">
      <div className="countdown-timer">
        {admin ? <button onClick={startTimer}>Start Game</button> : null}
        {time ? <div>{time}</div> : null}
      </div>
      {/* <Chat socket={socket} userId={userId} gameroomid={gameroomid} /> */}
      <Players socket={socket} />
      {showTikcet ? (
        <div
          className="ticket-container"
          onClick={(e) => {
            ticketClicked(e);
          }}
        >
          <div className="row">
            {row1.map((number, idx) => {
              return number === 100 ? (
                <>
                  <div className={"ticket-box"}></div>
                </>
              ) : (
                <div className={"ticket-box"}>
                  <figure className="ticket-ball code">{number}</figure>
                </div>
              );
            })}
          </div>
          <div className="row">
            {" "}
            {row2.map((number) => {
              return number === 100 ? (
                <>
                  <div className={"ticket-box"}></div>
                </>
              ) : (
                <div className={"ticket-box"}>
                  <figure className="ticket-ball code">{number}</figure>
                </div>
              );
            })}
          </div>
          <div className="row">
            {" "}
            {row3.map((number) => {
              return number === 100 ? (
                <>
                  <div className={"ticket-box"}></div>
                </>
              ) : (
                <div className={"ticket-box"}>
                  <figure className="ticket-ball code">{number}</figure>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <button className="ticket-btn" onClick={getTicket}>
          Ticket
        </button>
      )}

      <div className="claim-buttons">
        <button onClick={() => verifyTicket()}>Claim Full House</button>
        {/* <button>Claim first five</button> */}
      </div>
    </div>
  );
};

export default withRouter(GameRoom);
