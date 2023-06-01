const { UserBiodata } = require("../../../models");

const getAllUsersBiodata = async (req, res) => {
  try {
    const user = await UserBiodata.findAll({
      attributes: ["user_id", "first_name", "last_name", "hobby"],
    });
    if (!user) {
      res.json({
        message: "user biodata by id not found",
        result: null,
        error: "couldn't find user biodata",
      });
      return
    }
    res.json({
      message: "success",
      result: user,
      error: null,
    });
  } catch (error) {
    console.error(error)
  }
};

const getUserBiodataByID = async (req, res) => {
  try {
    const user = await UserBiodata.findOne({
      where: {
        user_id: req.params.id,
      },
      attributes: ["user_id", "first_name", "last_name", "hobby"],
    });
    if (!user) {
      res.json({
        message: "user biodata by id not found",
        result: null,
        error: "couldn't find user biodata",
      });
      return
    }
    res.json({
      message: "success",
      result: user,
      error: null,
    });
  } catch (error) {
    console.error(error)
  }
}

const updateUserBiodata = async (req, res) => {
  try {
    const updated = await UserBiodata.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        hobby: req.body.hobby,
      },
      {
        where: {
          user_id: req.params.id,
        },
      }
    );
    if (!updated) {
      res.json({
          message: "failed to update user biodata",
          result: null,
        });
        return
    }
    res.json({
      message: "success",
      result: updated,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteUserBiodata = async (req, res) => {
  try {
    const deleted = await UserBiodata.destroy({
      where: {
        user_id: req.params.id,
      },
    });
    if (!deleted) {
      res.json({
          message: "failed to delete user biodata",
          result: null,
        });
        return
    }
    res.json({
      message: "user biodata deleted successfully",
      result: deleted,
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAllUsersBiodata,
  getUserBiodataByID,
  updateUserBiodata,
  deleteUserBiodata
}