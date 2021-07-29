import React from "react";

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <label htmlFor="username">
          username:
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label htmlFor="password">
          password:
          <input
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
