import React from "react";
import { balls1, balls2 } from "./balldata";
import "./balls.css";
const Balls = () => {
  return (
    <>
      {balls1.map((ball) => {
        return (
          <figure className={ball.ballIndex + " ball"}>
            <span className={"number number" + ball.number}>{ball.number}</span>
          </figure>
        );
      })}
      {balls2.map((ball) => {
        return (
          <figure className={ball.ballIndex + " ball"}>
            <span className={"number number" + ball.number}>{ball.number}</span>
          </figure>
        );
      })}
    </>
  );
};

export default Balls;
