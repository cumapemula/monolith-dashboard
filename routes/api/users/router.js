const usersApi = require('express').Router()
const { getPlayers, getPlayerByID, createPlayer, updateUser, deleteUser } = require('./controller')

// GET: /api/v1/users
// Endpoint list users dengan role 'Player'
usersApi.get('/users/accounts', getPlayers)

// GET: /api/v1/users/:id
// Endpoint list users dengan role 'Player' by spesific ID
usersApi.get('/users/accounts/:id', getPlayerByID)

// POST: /api/v1/users
// Endpoint create user dengan role 'Player'
usersApi.post('/users/accounts', createPlayer)

// PUT: /api/v1/users/:id
// Endpoint update user by ID
usersApi.put('/users/accounts/:id', updateUser)

// DELETE: /api/v1/users/:id
// Endpoint delete user by spesific ID
usersApi.delete('/users/accounts/:id', deleteUser)

module.exports = usersApi