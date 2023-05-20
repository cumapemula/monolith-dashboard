const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const gamesRouter = require("./routes/games/games");
const usersBiodataRouter = require("./routes/users/userbiodata");
const usersRouter = require("./routes/users/users");
const userHistoryRouter = require("./routes/users/userhistory");
const usersApi = require('./routes/api/users/routes');
const gamesApi = require("./routes/api/games/routes");
const userBiodataApi = require("./routes/api/userbiodata/routes");
const userHistoryApi = require("./routes/api/userhistory/routes");
const dashboardRouter = require("./routes/dashboard/login");

// Built-In Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Third Party Middleware
app.use(morgan("dev"));

// set view engine
app.set("view engine", "ejs");
app.set('')

// Routing
app.use('/dashboard', gamesRouter, usersBiodataRouter, usersRouter, userHistoryRouter, dashboardRouter);
app.use('/api/v1', usersApi, gamesApi, userBiodataApi, userHistoryApi)
app.get('/', (req, res) => {
  res.redirect('/dashboard/login')
})

// Internal Server Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: "fail",
    errors: err.message,
  });
});

// 404 error handler
app.use((req, res) => {
  res.status(404).render("404Page");
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
