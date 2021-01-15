import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import CreateRoom from "./Components/Room/Createroom/CreateRoom";
import JoinRoom from "./Components/Room/Joinroom/JoinRoom";
import Instruction from "./Components/Instruction/Instruction";
import Login from "./Components/Login/Login";
import GameRoom from "./Components/Room/Gameroom/GameRoom";
const io = require("socket.io-client");

function App() {
  const [loggedIn, setloggedIn] = useState(false);
  const [error, seterror] = useState(undefined);
  const [socket, setsocket] = useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("CC_TOKEN");

    if (token && !socket) {
      const connectionOptions = {
        "force new connection": true,
        reconnectionAttempts: "Infinity",
        timeout: 10000,
        transports: ["websocket"],
        query: {
          token: localStorage.getItem("CC_TOKEN"),
        },
      };

      const newSocket = io("http://localhost:8000", connectionOptions);

      newSocket.on("disconnect", () => {
        setsocket(null);
        setTimeout(setupSocket, 3000);
      });

      newSocket.on("connection", () => {
        console.log("Socket connected");
      });

      setsocket(newSocket);
    }
  };

  useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);

  const loginHandler = (name, password) => {
    fetch("http://localhost:8000/user/login", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.message === "Username/Password did not match") {
          seterror(r.message);
        } else {
          localStorage.setItem("username", name);
          localStorage.setItem("CC_TOKEN", r.token);
          setloggedIn(true);
          setupSocket();
        }
      });
  };

  const signupHandler = (name, password) => {
    fetch("http://localhost:8000/user/register", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.message === "User registered successfully") {
          return;
        } else {
          seterror(r.message);
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("CC_TOKEN");
    setloggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("CC_TOKEN");

    if (token) {
      setloggedIn(true);
    }
  }, []);
  return (
    <div className="main">
      {loggedIn ? (
        <Router>
          <Route exact path="/">
            <Home handler={logout} />
          </Route>

          <Route exact path="/create-room">
            <CreateRoom socket={socket} />
          </Route>

          <Route exact path="/join-room">
            <JoinRoom socket={socket} />
          </Route>

          <Route exact path="/instruction">
            <Instruction name="gayu" socket={socket}>
              Heyy There
            </Instruction>
          </Route>

          <Route
            path="/game-room/:id"
            render={() => <GameRoom socket={socket} />}
            exact
          />
        </Router>
      ) : (
        <Login
          loginHandler={loginHandler}
          signupHandler={signupHandler}
          err={error}
        />
      )}
    </div>
  );
}

export default App;
