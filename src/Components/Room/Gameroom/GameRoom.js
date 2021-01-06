import React, { useEffect, useState } from "react";
import "./gameroom.css";
import { withRouter } from "react-router-dom";
import cross from "../../icons/cross.ico";

const GameRoom = ({ match, location, socket, isadmin }) => {
  const [userId, setUserId] = useState("");
  const [admin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [player, setPlayer] = useState("");

  useEffect(() => {
    setAdmin(isadmin);
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
  const [newmessage, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const gameroomid = match.params.id;
  const sendMessage = () => {
    if (socket) {
      socket.emit("GameroomMessage", {
        gameroomid,
        message: newmessage,
      });

      setmessage("");
    }
  };

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
        console.log(ticketrow1, ticketrow2, ticketrow3);
      });
  };

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

      socket.on("newMessage", (data) => {
        const msgArr = [...messages];
        msgArr.push(data);
        setmessages(msgArr);
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveroom", {
          gameroomid,
        });
      }
    };
  }, [messages, users]);

  return (
    <div className="hp-mainDiv">
      <div className="chat-box">
        <div className="messages-container">
          {messages.map((message) => {
            return (
              <div className="message-container">
                <span
                  className={
                    userId === message.userId
                      ? "myMessage message"
                      : "notmyMessage message"
                  }
                >
                  <span className="sender-name">
                    {userId === message.userId ? "Me" : message.name}:
                  </span>{" "}
                  <span>{message.message}</span>
                </span>
              </div>
            );
          })}
        </div>

        <div className="send-message">
          {" "}
          <input
            className="input-message"
            type="text"
            placeholder="Say something..."
            onChange={(event) => setmessage(event.target.value)}
            value={newmessage}
            autoFocus
          ></input>
          <div className="send" onClick={sendMessage}>
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <button className="ticket-btn" onClick={getTicket}>
        Ticket
      </button>
      {users.map((user) => {
        return <p>{user}</p>;
      })}
      <div
        className="ticket-container"
        onClick={(e) => {
          if (e.target.innerText) {
            e.target.classList.add("cross");
          }
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
    </div>
  );
};

export default withRouter(GameRoom);
