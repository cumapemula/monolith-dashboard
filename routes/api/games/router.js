const gamesApi = require('express').Router();
const { adminAuthentication, userAuthentication } = require('../../../middlewares/authentication');
const { getAllGames, getListGameByID, createGame, updateGame, deleteGame } = require('./controller');

// GET: /api/v1/games
// Endpoint list games
gamesApi.get('/games', userAuthentication, getAllGames)

// GET: /api/v1/games/:id
// Endpoint list game by specified id
gamesApi.get("/games/:id", userAuthentication, getListGameByID);

// POST: /api/v1/games
// Endpoint create game
gamesApi.post("/games", adminAuthentication, createGame);

// PUT: /api/v1/games/:id
// Endpoint update game by id
gamesApi.put('/games/:id', adminAuthentication, updateGame)

// DELETE: /api/v1/games/:id
// Endpoint delete game by id
gamesApi.delete("/games/:id", adminAuthentication, deleteGame);

module.exports = gamesApi