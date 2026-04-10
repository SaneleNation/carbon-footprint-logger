import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getLogs = () => axios.get(`${API_URL}/logs`);

export const addLog = (log) => axios.post(`${API_URL}/logs`, log);
