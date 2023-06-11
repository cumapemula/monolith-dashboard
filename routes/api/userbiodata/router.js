const userBiodataApi = require('express').Router()
const { userAuthentication, adminAuthentication } = require('../../../middlewares/authentication')
const { getAllUsersBiodata, getUserBiodataByID, updateUserBiodata, deleteUserBiodata } = require('./controller')

// GET: /api/v1/users/biodata
// Endpoint list user biodata
userBiodataApi.get('/users/biodata', userAuthentication, getAllUsersBiodata)

// GET: /api/v1/users/biodata/:id
// Endpoint list user biodata by specified id
userBiodataApi.get('/users/biodata/:id', userAuthentication, getUserBiodataByID)

// PUT: /api/v1/users/biodata/:id
// Endpoint update user biodata by id
userBiodataApi.put("/users/biodata/:id", adminAuthentication, updateUserBiodata);

// DELETE: /api/v1/user/biodata/:id
// Endpoint delete user biodata by id
userBiodataApi.delete("/users/biodata/:id", adminAuthentication, deleteUserBiodata);

module.exports = userBiodataApi