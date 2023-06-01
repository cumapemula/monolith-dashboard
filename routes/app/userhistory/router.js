const userHistoryRouter = require("express").Router();
const { getUserHistoryById, updateScore } = require("./usersHistoryController");

userHistoryRouter.get("/users/:id/score", getUserHistoryById);
userHistoryRouter.post("/users/:id/score", updateScore);

module.exports = userHistoryRouter