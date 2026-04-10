import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import Dashboard from "./components/Dashboard";
import AddLogForm from "./components/AddLogForm";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  // 🔐 Auth state (stores logged-in user)
  const [user, setUser] = useState(null);

  // Toggle login/register screen
  const [isRegister, setIsRegister] = useState(false);

  // Logs state
  const [logs, setLogs] = useState([]);

  // Fetch logs from backend
  const fetchLogs = () => {
    axios.get("http://localhost:5000/api/logs")
      .then((res) => {
        setLogs(res.data);
      })
      .catch((err) => {
        console.error("Error fetching logs:", err);
      });
  };

  // Load logs when user logs in
  useEffect(() => {
    if (user) {
      fetchLogs();
    }
  }, [user]);

  // Add new log
  const addLog = (log) => {
    axios.post("http://localhost:5000/api/logs", log)
      .then(() => {
        fetchLogs(); // refresh after adding
      })
      .catch((err) => {
        console.error("Error adding log:", err);
      });
  };

  // Logout user
  const handleLogout = () => {
    setUser(null);
    setLogs([]);
  };

  // If NOT logged in → show auth screens
  if (!user) {
    return (
      <div className="container">
        <h1>Carbon Footprint Logger</h1>

        <div className="card">
          {isRegister ? (
            <Register switchToLogin={() => setIsRegister(false)} />
          ) : (
            <Login
              setUser={setUser}
              switchToRegister={() => setIsRegister(true)}
            />
          )}

          <p
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Login"
              : "Need an account? Register"}
          </p>
        </div>
      </div>
    );
  }

  // If logged in → show app
  return (
    <div className="container">
      <h1>Carbon Footprint Dashboard</h1>

      <div className="card">
        <p>Welcome, <strong>{user.username}</strong> </p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="card">
        <AddLogForm onAddLog={addLog} />
      </div>

      <div className="card">
        <Dashboard logs={logs} />
      </div>
    </div>
  );
}

export default App;