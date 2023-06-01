const userBiodataApi = require('express').Router()
const { getAllUsersBiodata, getUserBiodataByID, updateUserBiodata, deleteUserBiodata } = require('./controller')

// GET: /api/v1/users/biodata
// Endpoint list user biodata
userBiodataApi.get('/users/biodata', getAllUsersBiodata)

// GET: /api/v1/users/biodata/:id
// Endpoint list user biodata by specified id
userBiodataApi.get('/users/biodata/:id', getUserBiodataByID)

// PUT: /api/v1/users/biodata/:id
// Endpoint update user biodata by id
userBiodataApi.put('/users/biodata/:id', updateUserBiodata)

// DELETE: /api/v1/user/biodata/:id
// Endpoint delete user biodata by id
userBiodataApi.delete("/users/biodata/:id", deleteUserBiodata);

module.exports = userBiodataApi