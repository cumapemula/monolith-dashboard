const usersBiodataRouter = require("express").Router();
const { sessionAuthentication } = require("../../../middlewares/authentication");
const {
  getUserBiodataByID,
  updateUserBiodata
} = require('./usersBiodataController')

usersBiodataRouter.get("/users/:id/biodata", sessionAuthentication, getUserBiodataByID);
usersBiodataRouter.post("/users/:id/biodata", sessionAuthentication, updateUserBiodata);

module.exports = usersBiodataRouter;
