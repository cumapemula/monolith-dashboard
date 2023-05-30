const { Users, UserBiodata, UserHistory, Games } = require("../models");

const getAllUsers = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        role: "player",
      },
      order: [["id", "ASC"]],
      attributes: ["id", "username", "role"],
      include: [
        {
          model: UserBiodata,
          as: "bio",
          attributes: ["first_name", "last_name", "hobby"],
        },
        {
          model: UserHistory,
          as: "score",
          attributes: ["game_id", "win", "lose", "draw"],
          include: {
            model: Games,
            as: "games",
            attributes: ["name", "genre"],
          },
        },
      ],
    });
    const row = user.map((users) => {
      return {
        id: users.id,
        username: users.username,
        role: users.role,
        "first name": users.bio?.first_name,
        "last name": users.bio?.last_name,
        hobby: users.bio?.hobby,
        "game id": users?.score[0]?.game_id,
        "game name": users?.score[0]?.games[0]?.name,
        win: users?.score[0]?.win,
        lose: users?.score[0]?.lose,
        draw: users?.score[0]?.draw,
      };
    });
    const column = Object.keys(row[0] || {});
    res.render("Users/ListUsers", {
      column,
      row,
    });
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

const getUserCreate = (req, res) => {
  res.render("Users/CreatePage");
};

const getUserById = async (req, res) => {
  try {
    const users = await Users.findAll({
      where: {
        id: req.params.id,
        role: "player",
      },
      attributes: ["id", "username", "role"],
      include: [
        {
          model: UserBiodata,
          as: "bio",
          attributes: ["first_name", "last_name", "hobby"],
        },
        {
          model: UserHistory,
          as: "score",
          attributes: ["game_id", "win", "lose", "draw"],
          include: [
            {
              model: Games,
              as: "games",
              attributes: ["name", "genre"],
            },
          ],
        },
      ],
    });
    const row = users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        role: user.role,
        "first name": user.bio?.first_name,
        "last name": user.bio?.last_name,
        hobby: user.bio?.hobby,
        "game id": user.score[0]?.game_id,
        "game name": user.score[0]?.games[0]?.name,
        win: user.score[0]?.win,
        lose: user.score[0]?.lose,
        draw: user.score[0]?.draw,
      };
    });
    const column = Object.keys(row[0]);
    res.render("Users/DetailUser", {
      column,
      row,
      req: req.params.id,
    });
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

const getUserAccountUpdate = async (req, res) => {
  try {
    const users = await Users.findAll({
      where: {
        id: req.params.id,
        role: "player",
      },
      attributes: ["id", "username", "role"],
    });
    const row = users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        role: user.role,
      };
    });
    const column = Object.keys(row[0]);
    res.render("Users/UpdatePage", {
      column,
      row,
      req: req.params.id,
    });
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

const getUserAccountDelete = async (req, res) => {
  try {
    const users = await Users.findAll({
      where: {
        id: req.params.id,
        role: "player",
      },
      attributes: ["id", "username", "role"],
      include: [
        {
          model: UserBiodata,
          as: "bio",
          attributes: ["first_name", "last_name", "hobby"],
        },
        {
          model: UserHistory,
          as: "score",
          attributes: ["game_id", "win", "lose", "draw"],
          include: [
            {
              model: Games,
              as: "games",
              attributes: ["name", "genre"],
            },
          ],
        },
      ],
    });
    const row = users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        role: user.role,
        "first name": user.bio?.first_name,
        "last name": user.bio?.last_name,
        hobby: user.bio?.hobby,
        "game id": user.score[0]?.game_id,
        "game name": user.score[0]?.games[0]?.name,
        win: user.score[0]?.win,
        lose: user.score[0]?.lose,
        draw: user.score[0]?.draw,
      };
    });
    const column = Object.keys(row[0]);
    res.render("Users/DeletePage", {
      column,
      row,
      req: req.params.id,
    });
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

const createUser = async (req, res) => {
  try {
    const users = await Users.create({
      username: req.body.username,
      password: req.body.password,
    });
    await UserBiodata.create({
      user_id: users.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      hobby: req.body.hobby,
    });
    await UserHistory.create({
      user_id: users.id,
    }).then(() => {
      res.redirect("/dashboard/users");
    });
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

const updateUser = async (req, res) => {
  try {
    await Users.update(
      {
        username: req.body.username,
        password: req.body.password,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.redirect("/dashboard/users");
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

const deleteUser = async (req, res) => {
  try {
    await UserHistory.destroy({
      where: {
        user_id: req.params.id,
      },
    });
    await UserBiodata.destroy({
      where: {
        user_id: req.params.id,
      },
    });
    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/dashboard/users");
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

module.exports = {
  getAllUsers,
  getUserCreate,
  getUserById,
  getUserAccountUpdate,
  getUserAccountDelete,
  createUser,
  updateUser,
  deleteUser,
};
