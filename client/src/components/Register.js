import React, { useState } from "react";
import axios from "axios";

const Register = ({ switchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/auth/register", {
      username,
      password
    })
    .then((res) => {
      alert(res.data.message);
      switchToLogin();
    })
    .catch((err) => {
      alert(err.response?.data?.message || "Registration failed");
    });
  };

  return (
    <div>
      <h3>Register</h3>

      <form onSubmit={handleRegister}>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>

      <p onClick={switchToLogin} style={{ cursor: "pointer", color: "blue" }}>
        Already have an account? Login
      </p>
    </div>
  );
};

export default Register;