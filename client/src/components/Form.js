import React, { useState } from "react";

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  onsubmit,
  label,
}) => {
  return (
    <div className="auth-container">
      <form>
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">password</label>
          <input
            type="psd"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button type="submit" onClick={onsubmit}>
          {label}
        </button>
      </form>
    </div>
  );
};

export default Form;
