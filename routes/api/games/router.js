const gamesApi = require('express').Router();
const { getAllGames, getListGameByID, createGame, updateGame, deleteGame } = require('./controller');

// GET: /api/v1/games
// Endpoint list games
gamesApi.get('/games', getAllGames)

// GET: /api/v1/games/:id
// Endpoint list game by specified id
gamesApi.get('/games/:id', getListGameByID)

// POST: /api/v1/games
// Endpoint create game
gamesApi.post('/games', createGame)

// PUT: /api/v1/games/:id
// Endpoint update game by id
gamesApi.put('/games/:id', updateGame)

// DELETE: /api/v1/games/:id
// Endpoint delete game by id
gamesApi.delete('/games/:id', deleteGame)

module.exports = gamesApi