const bodyParser = require("body-parser");
const cors = require("cors");

const express = require("express");

const userRouter = require("./Routes/userRoutes");
const foodRouter = require("./Routes/foodRoutes");

app = express();
app.use(cors({ origine: "*" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use("/v2/Users", userRouter);
app.use("/v2/Foods", foodRouter);

module.exports = app;
