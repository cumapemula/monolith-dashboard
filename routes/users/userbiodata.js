const usersBiodataRouter = require("express").Router();
const {
  getUserBiodataByID,
  updateUserBiodata
} = require('../../controller/usersBiodataController')

usersBiodataRouter.get("/users/:id/biodata", getUserBiodataByID);
usersBiodataRouter.post("/users/:id/biodata", updateUserBiodata);

module.exports = usersBiodataRouter;
