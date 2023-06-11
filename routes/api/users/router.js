const usersApi = require("express").Router();
const { userAuthentication, adminAuthentication } = require("../../../middlewares/authentication");
const {
  getPlayers,
  getPlayerByID,
  getLogin,
  createPlayer,
  updateUser,
  deleteUser,
} = require("./controller");

// GET: /api/v1/users
// Endpoint list users dengan role 'Player'
usersApi.get("/users/accounts", userAuthentication, getPlayers);

// GET: /api/v1/users/:id
// Endpoint list users dengan role 'Player' by spesific ID
usersApi.get("/users/accounts/:id", userAuthentication, getPlayerByID);

// POST: /api/v1/users
// Endpoint create user dengan role 'Player'
usersApi.post("/users/accounts", adminAuthentication, createPlayer);

// POST: /api/v1/users/login
// Endpoint login
usersApi.post("/users/login", getLogin);

// PUT: /api/v1/users/:id
// Endpoint update user by ID
usersApi.put("/users/accounts/:id", adminAuthentication, updateUser);

// DELETE: /api/v1/users/:id
// Endpoint delete user by spesific ID
usersApi.delete("/users/accounts/:id", adminAuthentication, deleteUser);

module.exports = usersApi;
