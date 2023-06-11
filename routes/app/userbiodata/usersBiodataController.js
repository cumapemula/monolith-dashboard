const { UserBiodata } = require("../../../models");

const getUserBiodataByID = async (req, res) => {
  try {
    const user = await UserBiodata.findAll({
      where: {
        user_id: req.params.id,
      },
    });
    const row = user.map((users) => {
      return {
        "user id": users.user_id,
        "first name": users.first_name,
        "last name": users.last_name,
        hobby: users.hobby,
      };
    });
    const column = Object.keys(row[0] || {});
    res.render("UserBiodata/UpdatePage", {
      column,
      row,
      req: req.params.id,
      layout: "_layouts/main-layout",
      title: "Dashboard - Update Biodata",
      style: "/styles/userbiodata/update.css",
    });
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

const updateUserBiodata = async (req, res) => {
  try {
    await UserBiodata.update(
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
    res.redirect("/dashboard/users");
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

module.exports = {
  getUserBiodataByID,
  updateUserBiodata,
};
