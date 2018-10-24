const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("./middleware/cors")

const employeeRoutes = require("./routes/employee");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect("mongodb+srv://chintan:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0-rwaw3.mongodb.net/datis-challenge?retryWrites=true")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("It's working");
});

app.use("/images", express.static(path.join("images")));

app.use(cors);

app.use("/api/employee", employeeRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
