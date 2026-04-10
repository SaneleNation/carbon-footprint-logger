const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// DATA STORAGE

// Logs
let logs = [];

// Users (simple auth)
let users = [];


// AUTH ROUTES

// REGISTER
app.post("/api/auth/register", (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find(u => u.username === username);

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: users.length + 1,
    username,
    password // (simple — no hashing for now)
  };

  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
});

// LOGIN
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      username: user.username
    }
  });
});

//  LOG ROUTES

// GET logs
app.get("/api/logs", (req, res) => {
  res.json(logs);
});

// ADD log
app.post("/api/logs", (req, res) => {
  const { activity, emissions } = req.body;

  const newLog = {
    id: logs.length + 1,
    activity,
    emissions: Number(emissions),
    date: new Date().toISOString()
  };

  logs.push(newLog);

  res.status(201).json(newLog);
});

//  START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});