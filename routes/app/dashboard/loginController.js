const getLoginPage = (req, res) => {
  res.render("LoginPage", {
    layout: "_layouts/main-layout",
    title: "Dashboard - Login Page",
    style: "/styles/dashboard/login.css",
  });
};

module.exports = {
  getLoginPage
};
