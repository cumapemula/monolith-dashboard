const gamesRouter = require('express').Router();
const { getAllGames, createGames, updateGames, getUpdateGames, getDeleteGames, deleteGames, getCreateGames } = require('../../controller/gamesController');

gamesRouter.get("/games", getAllGames);
gamesRouter.get("/games/create", getCreateGames);
gamesRouter.get("/games/:id/update", getUpdateGames);
gamesRouter.get("/games/:id/delete", getDeleteGames);
gamesRouter.post("/games/create", createGames);
gamesRouter.post("/games/:id/update", updateGames);
gamesRouter.post("/games/:id/delete", deleteGames);

module.exports = gamesRouter