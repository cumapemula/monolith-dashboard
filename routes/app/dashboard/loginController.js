const { Users } = require("../../../models");

const getLoginPage = (req, res) => {
  res.render('LoginPage')
}

const getAdmin = async (req, res) => {
  try {
    const isAdmin = await Users.findOne({
      where: {
        username: req.body.username,
        password: req.body.password,
        role: "admin",
      },
    });
    if (!isAdmin) {
      res.redirect("/dashboard/login");
      return;
    }
    res.redirect("/dashboard/users");
  } catch (error) {
    console.error(error);
  }
}



module.exports = {
  getLoginPage,
  getAdmin
}