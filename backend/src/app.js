const express = require("express");
const router = require("./routes/index.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error.middleware.js");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: "true",
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use("/api", router);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

module.exports = app;
