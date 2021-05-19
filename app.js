const express = require("express");
require("dotenv").config();

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

const app = express();

//setup mongoose collection
const mongoose = require("mongoose");
const mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.listen(3000, () => console.log("Server started at port 3000"));
