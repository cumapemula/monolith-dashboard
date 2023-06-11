const userHistoryApi = require('express').Router()
const { userAuthentication, adminAuthentication } = require('../../../middlewares/authentication');
const { getAllUsersHistory, getUserHistoryByID, createUserHistory, updateUserHistory, deleteUserHistory } = require('./controller');

// GET: /api/v1/users/history/:id
// Endpoint list user
userHistoryApi.get("/users/history", userAuthentication, getAllUsersHistory);

// GET: /api/v1/users/history/:id
// Endpoint list user history by id
userHistoryApi.get("/users/history/:id", userAuthentication, getUserHistoryByID);

// POST: /api/v1/users/history
// Endpoint create user history
userHistoryApi.post('/users/history', adminAuthentication, createUserHistory)

// PUT: /api/v1/users/history/:id
// Endpoint update user history by id
userHistoryApi.put("/users/history/:id", adminAuthentication, updateUserHistory);

// DELETE: /api/v1/users/history/:id
// Endpoint delete user history by id
userHistoryApi.delete('/users/history/:id', adminAuthentication, deleteUserHistory)

module.exports = userHistoryApi