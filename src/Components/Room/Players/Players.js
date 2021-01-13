import React, { useState, useEffect } from "react";
import "./players.css";

const Players = ({ socket }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("players", (data) => {
        setPlayers(data.players);
      });
    }
  }, [players]);

  return (
    <div className="players">
      {players.map((player) => {
        return (
          <div className="user">
            <i className="fas fa-user fa-2x"></i>
            <p>{player}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Players;
