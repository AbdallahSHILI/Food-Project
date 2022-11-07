const bodyParser = require("body-parser");

const express = require("express");

const userRouter = require("./Routes/userRoutes");
const foodRouter = require("./Routes/foodRoutes");
const preFoodRouter = require("./Routes/preFoodRoutes");

app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use("/Foods/Users", userRouter);
app.use("/Foods", foodRouter);
app.use("/PreFoods", preFoodRouter);

module.exports = app;
