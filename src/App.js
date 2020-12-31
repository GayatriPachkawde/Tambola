import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import CreateRoom from "./Components/Room/CreateRoom";
import JoinRoom from "./Components/Room/JoinRoom";
import Instruction from "./Components/Instruction/Instruction";
import Login from "./Components/Login/Login";
import GameRoom from "./Components/Room/GameRoom";

function App() {
  const [loggedIn, setloggedIn] = useState(false);
  const [error, seterror] = useState(undefined);
  const [userName, setuserName] = useState(undefined);
  const [points, setPoints] = useState(undefined);

  const getUserName = () => {
    return fetch("http://localhost:9999/userInfo", { credentials: "include" })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          setloggedIn(false);
          setuserName(undefined);
          return { success: false };
        }
      })
      .then((r) => {
        if (r.success !== false) {
          setloggedIn(true);
          setuserName(r.userName);
          setPoints(r.points);
        }
      });
  };
  useEffect(() => {
    getUserName();
  }, []);

  const logoutHandler = () => {
    return fetch("/http://localhost:9999/logout", {
      credentials: "include",
    }).then((r) => {
      if (r.ok) {
        setloggedIn(false);
        setuserName(undefined);
        seterror(undefined);
      }
    });
  };

  const loginHandler = (userName, password) => {
    fetch("http://localhost:9999/login", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return { success: true };
        } else {
          return r.json();
        }
      })
      .then((r) => {
        if (r.success) {
          return getUserName();
        } else {
          seterror(r.err);
        }
      });
  };

  const signinHandler = (userName, password) => {
    fetch("http://localhost:9999/signup", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return { success: true };
        } else {
          return r.json();
        }
      })
      .then((r) => {
        if (r.success) {
          return getUserName();
        } else {
          seterror(r.err);
        }
      });
  };

  const showUser = () => {
    console.log(`Username: ${userName} Points: ${points}`);
  };
  return (
    <div className="main">
      {/* {loggedIn ? ( */}
      <Router>
        <Route exact path="/">
          <Home handler={logoutHandler} showUser={showUser} />
        </Route>

        <Route exact path="/create-room">
          <CreateRoom />
        </Route>

        <Route exact path="/join-room">
          <JoinRoom />
        </Route>

        <Route exact path="/instruction">
          <Instruction />
        </Route>

        <Route exact path="/game-room">
          <GameRoom />
        </Route>
      </Router>
      {/* ) : (
        <Login
          loginHandler={loginHandler}
          signinHandler={signinHandler}
          err={error}
        />
      )} */}
    </div>
  );
}

export default App;
