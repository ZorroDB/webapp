// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // Update the base URL if necessary
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);
