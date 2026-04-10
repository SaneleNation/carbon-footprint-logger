import React, { useState } from "react";
import axios from "axios";

const Login = ({ setUser, switchToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/auth/login", {
      username,
      password
    })
    .then((res) => {
      setUser(res.data.user);
    })
    .catch(() => {
      alert("Login failed");
    });
  };

  return (
    <div>
      <h3>Login</h3>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

    </div>
  );
};

export default Login;