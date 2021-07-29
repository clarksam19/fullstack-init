import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import userAdminService from "../services/userAdminService";
import tempService from "../services/tempService";

const UserAdmin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setUser] = useState(null);
  const [, setNewUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      tempService.setToken(user.token);
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await userAdminService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      tempService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      const newUser = await userAdminService.signup({
        username,
        password,
      });
      setNewUser(newUser);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const show = (formName) => {
    if (formName === "login") {
      setLoginVisible(true);
      setSignupVisible(false);
    } else if (formName === "signup") {
      setLoginVisible(false);
      setSignupVisible(true);
    } else {
      return;
    }
  };

  return (
    <div>
      <button onClick={() => show("login")}>login</button>
      <button onClick={() => show("signup")}>signup</button>
      <div style={{ display: loginVisible ? "" : "none" }}>
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </div>
      <div style={{ display: signupVisible ? "" : "none" }}>
        <SignupForm
          handleSignup={handleSignup}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </div>
    </div>
  );
};

export default UserAdmin;
