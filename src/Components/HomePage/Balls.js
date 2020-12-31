import React from "react";

const Balls = (props) => {
  const ballData = props.ballData;
  return (
    <>
      {ballData.map((ball) => {
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
