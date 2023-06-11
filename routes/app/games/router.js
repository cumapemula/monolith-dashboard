const gamesRouter = require('express').Router();
const { sessionAuthentication } = require('../../../middlewares/authentication');
const { getAllGames, createGames, updateGames, getUpdateGames, getDeleteGames, deleteGames, getCreateGames } = require('./gamesController');

gamesRouter.get("/games", sessionAuthentication, getAllGames);
gamesRouter.get("/games/create", sessionAuthentication, getCreateGames);
gamesRouter.get("/games/:id/update", sessionAuthentication, getUpdateGames);
gamesRouter.get("/games/:id/delete", sessionAuthentication, getDeleteGames);
gamesRouter.post("/games/create", sessionAuthentication, createGames);
gamesRouter.post("/games/:id/update", sessionAuthentication, updateGames);
gamesRouter.post("/games/:id/delete", sessionAuthentication, deleteGames);

module.exports = gamesRouter