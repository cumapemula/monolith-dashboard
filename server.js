require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const passport = require("./lib/passport");
const morgan = require("morgan");
const expressLayout = require("express-ejs-layouts");
const session = require("express-session");
const gamesRouter = require("./routes/app/games/router");
const usersBiodataRouter = require("./routes/app/userbiodata/router");
const usersRouter = require("./routes/app/users/router");
const userHistoryRouter = require("./routes/app/userhistory/router");
const usersApi = require("./routes/api/users/router");
const gamesApi = require("./routes/api/games/router");
const userBiodataApi = require("./routes/api/userbiodata/router");
const userHistoryApi = require("./routes/api/userhistory/router");
const dashboardRouter = require("./routes/app/dashboard/router");
const roomsApi = require("./routes/api/rooms/routes");

// Built-In Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Third Party Middleware
app.use(morgan("dev"));

// set session handler
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000000
    }
  })
);

// set passport
app.use(passport.initialize());
app.use(passport.session());

// set view engine
app.set("view engine", "ejs");
app.use(expressLayout);
app.set("layout", "_layouts/main-layout");

// Routing
app.use(
  "/dashboard",
  gamesRouter,
  usersBiodataRouter,
  usersRouter,
  userHistoryRouter,
  dashboardRouter
);
app.use(
  "/api/v1",
  usersApi,
  gamesApi,
  userBiodataApi,
  userHistoryApi,
  roomsApi
);
app.get("/", (req, res) => {
  res.redirect("/dashboard/login");
});

// Internal Server Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("500page", {
    layout: "_layouts/main-layout",
    title: "500 Internal Server Error",
    style: "/styles/500.css",
  });
});

// 404 error handler
app.use((req, res) => {
  res.status(404).render("404Page", {
    layout: '_layouts/main-layout',
    title: 'Error 404 Page Not Found',
    style: '/styles/404.css'
  });
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
