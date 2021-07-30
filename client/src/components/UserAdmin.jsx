import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Notification from "./Notification";
import userAdminService from "../services/userAdminService";
import tempService from "../services/tempService";
import notify from "../utils/notify";

const UserAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setUser] = useState(null);
  const [, setNewUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);
  const [notification, setNotification] = useState(notify().reset);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      tempService.setToken(user.token);
    }
  }, []);
  const resetNotification = () => {
    setTimeout(() => {
      setNotification(notify().reset);
    }, 5000);
  };
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
      setNotification(notify(user.username).success.login);
      resetNotification();
    } catch (err) {
      setNotification(notify().error.login);
      resetNotification();
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
      setNotification(notify().success.signup);
      resetNotification();
    } catch (err) {
      setNotification(notify().error.signup);
      resetNotification();
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
      <Notification notification={notification} />
      <button data-testid="btn-login" onClick={() => show("login")}>
        login
      </button>
      <button data-testid="btn-signup" onClick={() => show("signup")}>
        signup
      </button>
      <div
        data-testid="form-login"
        style={{ display: loginVisible ? "" : "none" }}
      >
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </div>
      <div
        data-testid="form-signup"
        style={{ display: signupVisible ? "" : "none" }}
      >
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
