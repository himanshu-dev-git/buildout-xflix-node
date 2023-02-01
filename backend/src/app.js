const express = require("express");
const routes = require("./routes/v1");
const cors = require('cors');
const ApiError = require("./utils/ApiError");
const httpStatus = require("http-status");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//enable cors
app.use(cors());
app.options("*", cors());

app.use('/v1', routes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;