import React from "react";
const tambola = require("tambola-generator");

const Ticket = () => {
  const ticketArr = tambola.getTickets(1);

  return (
    <div>
      {ticketArr.map((no) => {
        return <div>{no}</div>;
      })}
    </div>
  );
};

export default Ticket;
