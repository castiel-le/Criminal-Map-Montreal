/**
 * Express Application with route
 * @author Castiel Le & Nael Louis
 */

/* eslint-disable max-len */

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const compression = require("compression");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for a full-stack MERN project",
    version: "1.0.0",
  },
};

const options = {
  swaggerDefinition,
  apis: ["./server/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options)

const rootRouter = require("./routes/root");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

//Add compression module
app.use(compression());
app.use(function (req, res, next) {
  res.set("Cache-control", "public, max-age=31536000");
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//any other search query will go to client/build
app.use(express.static(path.resolve(__dirname, "../client/build")));

//route for /case
app.use("/case", rootRouter);

//route for Swaggers API Documentation
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
