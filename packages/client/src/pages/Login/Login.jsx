import React, { useState } from 'react';

export const Login = ({ onLogin }) => {
  const [ username, setUsername ] = useState(``);
  const [ password, setPassword ] = useState(``);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <p>Note: Use "admin" as username and "password" as password to log in.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
