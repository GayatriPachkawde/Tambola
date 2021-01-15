import React, { useEffect, useState } from "react";
import "./Chat.css";

const Chat = ({ socket, userId, gameroomid }) => {
  const [newmessage, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const sendMessage = () => {
    if (socket) {
      socket.emit("GameroomMessage", {
        gameroomid,
        message: newmessage,
      });

      setmessage("");
    }
  };

  useEffect(() => {
    socket.on("newMessage", (data) => {
      const msgArr = [...messages];
      msgArr.push(data);
      setmessages(msgArr);
    });
  }, [messages]);
  return (
    <div className="chat-box">
      <div className="messages-container">
        {messages.map((message) => {
          return (
            <div
              className={
                userId === message.userId
                  ? "message-container my-message-container"
                  : "message-container not-my-message-container"
              }
            >
              <span className="message">
                {" "}
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
              </span>
            </div>
          );
        })}
      </div>

      <div className="send-message">
        <input
          className="input-message"
          type="text"
          placeholder="Say something..."
          onChange={(event) => setmessage(event.target.value)}
          value={newmessage}
          autoFocus
          onKeyDown={(e) => {
            if (e.keyCode === 13) sendMessage();
          }}
        ></input>
        <div className="send" onClick={sendMessage}>
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

export default Chat;
