const { Users, UserBiodata, UserHistory, Games } = require("../models");

UserHistory.hasMany(Games, {
  as: "games",
  foreignKey: "id",
  sourceKey: "game_id",
});
Users.hasMany(UserHistory, {
  as: "score",
  foreignKey: "user_id",
  sourceKey: "id",
});
Users.hasOne(UserBiodata, {
  as: "bio",
  foreignKey: "user_id",
  sourceKey: "id",
});

const getAllUsers = async (req, res) => {
  const user = await Users.findAll({
    where: {
      role: "player",
    },
    order: [['id', 'ASC']],
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
};

const getUserCreate = (req, res) => {
  res.render("Users/CreatePage")
}

const getUserById = (req, res) => {
  Users.findAll({
    where: {
      id: req.params.id,
      role: "player",
    },
    attributes: ["id", "username", "role"],
    include: [
      {
        model: UserBiodata,
        as: 'bio',
        attributes: ["first_name", "last_name", "hobby"],
      },
      {
        model: UserHistory,
        as: 'score',
        attributes: ["game_id", "win", "lose", "draw"],
        include: [
          {
            model: Games,
            as: 'games',
            attributes: ["name", "genre"],
          },
        ],
      },
    ],
  }).then((user) => {
    const row = user.map((users) => {
      return {
        id: users.id,
        username: users.username,
        role: users.role,
        "first name": users.bio?.first_name,
        "last name": users.bio?.last_name,
        hobby: users.bio?.hobby,
        "game id": users.score[0]?.game_id,
        "game name": users.score[0]?.games[0]?.name,
        win: users.score[0]?.win,
        lose: users.score[0]?.lose,
        draw: users.score[0]?.draw,
      };
    });
    const column = Object.keys(row[0]);
    res.render("Users/DetailUser", {
      column,
      row,
      req: req.params.id,
    });
  });
};

const getUserAccountUpdate = (req, res) => {
  Users.findAll({
    where: {
      id: req.params.id,
      role: "player",
    },
    attributes: ["id", "username", "role"],
  }).then((user) => {
    const row = user.map((users) => {
      return {
        id: users.id,
        username: users.username,
        role: users.role,
      };
    });
    const column = Object.keys(row[0]);
    res.render("Users/UpdatePage", {
      column,
      row,
      req: req.params.id,
    });
  });
};

const getUserAccountDelete = (req, res) => {
  Users.findAll({
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
  }).then((user) => {
    const row = user.map((users) => {
      return {
        id: users.id,
        username: users.username,
        role: users.role,
        "first name": users.bio?.first_name,
        "last name": users.bio?.last_name,
        hobby: users.bio?.hobby,
        "game id": users.score[0]?.game_id,
        "game name": users.score[0]?.games[0]?.name,
        win: users.score[0]?.win,
        lose: users.score[0]?.lose,
        draw: users.score[0]?.draw,
      };
    });
    const column = Object.keys(row[0]);
    res.render("Users/DeletePage", {
      column,
      row,
      req: req.params.id,
    });
  });
};

const createUser = async (req, res) => {
  const users = await Users.create({
    username: req.body.username,
    password: req.body.password,
  });
  await UserBiodata.create({
    user_id: users.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    hobby: req.body.hobby,
  })
  await UserHistory.create({
    user_id: users.id,
  }).then(() => {
    res.redirect("/dashboard/users");
  });
};

const updateUser = (req, res) => {
  Users.update(
    {
      username: req.body.username,
      password: req.body.password,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(() => {
    res.redirect("/dashboard/users");
  });
};

const deleteUser = (req, res) => {
  UserHistory.destroy({
    where: {
      user_id: req.params.id,
    }
  })
  UserBiodata.destroy({
    where: {
      user_id: req.params.id,
    }
  })
  Users.destroy({
    where: {
      id: req.params.id,
    },
  })
  res.redirect("/dashboard/users");
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
