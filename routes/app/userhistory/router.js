const userHistoryRouter = require("express").Router();
const { sessionAuthentication } = require("../../../middlewares/authentication");
const { getUserHistoryById, updateScore } = require("./usersHistoryController");

userHistoryRouter.get("/users/:id/score", sessionAuthentication, getUserHistoryById);
userHistoryRouter.post("/users/:id/score", sessionAuthentication, updateScore);

module.exports = userHistoryRouter