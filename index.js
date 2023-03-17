const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

require("dotenv/config");

// mongodb
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
});

app.use(express.json());

// routes
const tokenRoute = require("./routes/token");
app.use("/token", tokenRoute);

const switchesRoute = require("./routes/switches");
app.use("/switches", switchesRoute);

const keycapsRoute = require("./routes/keycaps");
app.use("/keycaps", keycapsRoute);

// homepage
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Thocky API!",
    documentation: "https://github.com/kcirreb11/thocky-api",
    token: "https://thocky-api.onrender.com/token",
    switches: "https://thocky-api.onrender.com/switches",
    keycaps: "https://thocky-api.onrender.com/keycaps",
  });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
