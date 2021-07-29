import React from "react";

const SignupForm = ({
  handleSignup,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSignup}>
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
        <button type="submit">signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
