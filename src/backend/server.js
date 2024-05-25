const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  app.get("/", (_req, res) => {
    res.send("Server is up and running");
  });
  

// User registration route
app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

