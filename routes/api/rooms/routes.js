const roomsApi = require("express").Router();
const { createRoom, playersFight } = require("./controller");
const { userAuthentication } = require("../../../middlewares/authentication");

// POST: /api/v1/rooms
// endpoint for create room
roomsApi.post("/rooms", userAuthentication, createRoom);

// POST: /api/v1/fights/:roomId
// endpoint for player battle
roomsApi.post("/fights/:roomId", userAuthentication, playersFight);

module.exports = roomsApi;
