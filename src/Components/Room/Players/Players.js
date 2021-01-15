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
      <div className="players-title">Players</div>
      {players.map((player) => {
        return (
          <div className="player">
            <i className="fas fa-user fa-2x"></i>
            <div>{player}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Players;
