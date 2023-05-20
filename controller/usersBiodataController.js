const { UserBiodata } = require('../models')

const getUserBiodataByID = (req, res) => {
  UserBiodata.findAll({
    where: {
      user_id: req.params.id,
    }
  }).then((user) => {
    const row = user.map((users) => {
      return {
        'user id': users.user_id,
        'first name': users.first_name,
        'last name': users.last_name,
        hobby: users.hobby,
      };
    });
    const column = Object.keys(row[0] || {})
    res.render("UserBiodata/UpdatePage", {
      column,
      row,
      req: req.params.id,
    });
  });
}

const updateUserBiodata = (req, res) => {
  UserBiodata.update(
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
  )
    .then(() => {
      res.redirect("/dashboard/users");
    })
    .catch((error) => console.error(error));
}

module.exports = {
  getUserBiodataByID,
  updateUserBiodata
}