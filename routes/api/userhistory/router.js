const userHistoryApi = require('express').Router()
const { getAllUsersHistory, getUserHistoryByID, createUserHistory, updateUserHistory, deleteUserHistory } = require('./controller');

// GET: /api/v1/users/history/:id
// Endpoint list user
userHistoryApi.get("/users/history", getAllUsersHistory);

// GET: /api/v1/users/history/:id
// Endpoint list user history by id
userHistoryApi.get("/users/history/:id", getUserHistoryByID);

// POST: /api/v1/users/history
// Endpoint create user history
userHistoryApi.post('/users/history', createUserHistory)

// PUT: /api/v1/users/history/:id
// Endpoint update user history by id
userHistoryApi.put('/users/history/:id', updateUserHistory)

// DELETE: /api/v1/users/history/:id
// Endpoint delete user history by id
userHistoryApi.delete('/users/history/:id', deleteUserHistory)

module.exports = userHistoryApi