const { Users, UserBiodata, UserHistory, Games, Player } = require("../../../models");
const bcrypt = require("bcrypt");

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
          attributes: ["game_id", "win", "lose", "draw", "total_score"],
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
        'total score': users?.score[0]?.total_score
      };
    });
    const column = Object.keys(row[0] || {});
    res.render("Users/ListUsers", {
      column,
      row,
      layout: "_layouts/main-layout",
      title: "Dashboard - Users",
      style: "/styles/users/listusers.css",
    });
  } catch (error) {
    console.error(error);
  }
};

const getUserCreate = (req, res) => {
  res.render("Users/CreatePage", {
    layout: "_layouts/main-layout",
    title: "Dashboard - Create New User",
    style: "/styles/users/create.css",
  });
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
          attributes: ["game_id", "win", "lose", "draw", "total_score"],
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
        'total score': user.score[0]?.total_score
      };
    });
    const column = Object.keys(row[0]);
    res.render("Users/DetailUser", {
      column,
      row,
      req: req.params.id,
      layout: "_layouts/main-layout",
      title: "Dashboard - Detail User",
      style: "/styles/users/detail.css",
    });
  } catch (error) {
    console.error(error);
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
      layout: "_layouts/main-layout",
      title: "Dashboard - Update Account",
      style: "/styles/users/update.css",
    });
  } catch (error) {
    console.error(error);
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
      layout: "_layouts/main-layout",
      title: "Dashboard - Delete User",
      style: "/styles/users/delete.css",
    });
  } catch (error) {
    console.error(error);
  }
};

const createUser = async (req, res) => {
  try {
    const users = await Users.register(req.body);
    await UserBiodata.create({
      user_id: users.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      hobby: req.body.hobby,
    });
    await UserHistory.create({
      user_id: users.id,
    });
    res.redirect("/dashboard/users");
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

const updateUser = async (req, res) => {
  try {
    const password = req.body.password;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    await Users.update(
      {
        username: req.body.username,
        password: encryptedPassword,
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
  }
};

const deleteUser = async (req, res) => {
  try {
    await Player.destroy({
      where: {
        player_id: req.params.id
      }
    })
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
