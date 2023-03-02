require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");

const _dirname = path.dirname("");
const buildPath = path.join(__dirname, "../client/build");

const app = express();

app.use(express.static(buildPath));
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "build", "../client/build/index.html"),
    (err) => {
      res.status(500).send(err);
    }
  );
});

const corsOption = process.env.CORS_OPTION;
var corsOptions = {
  origin: corsOption,
};

//app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database

const db = require("./app/models");

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to test url of application." });
// });

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/jobseeker.routes.js")(app);
require("./app/routes/posting.routes.js")(app);
require("./app/routes/apply.routes.js")(app);
require("./app/routes/admin.routes.js")(app);
// set port, listen for requests
// setting dnamic port for Heroku deployment
const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${PORT}.`);
  // console.log("Server is running on Heroku...");
});
