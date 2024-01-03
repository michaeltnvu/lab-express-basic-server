// IMPORT PACKAGES
// Here you should import the required packages for your Express app: `express` and `morgan`
require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const apiRouter = require("./routes/api");

// CREATE EXPRESS APP
// Here you should create your Express app:
const app = express();

// MIDDLEWARE
// Here you should set up the required middleware:
// - `express.static()` to serve static files from the `public` folder
// - `express.json()` to parse incoming requests with JSON payloads
// - `morgan` logger to log all incoming requests
app.use(express.static("public"));
app.use(express.json());
app.use(logger("dev"));

// ROUTES
// Start defining your routes here:
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});

app.get("/blog", (req, res) => {
  res.sendFile(__dirname + "/views/blog.html");
});

app.use("/api", apiRouter);

// START THE SERVER
// Make your Express server listen on port 4000:
app.listen(process.env.PORT, () => {
  console.log("Server is listening on " + process.env.PORT);
});
