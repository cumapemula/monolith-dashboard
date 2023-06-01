const { UserHistory, Users, Games } = require("../../../models");

const getUserHistoryById = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        id: req.params.id,
        role: "player",
      },
      attributes: ["id", "username", "role"],
      include: [
        {
          model: UserHistory,
          as: "score",
          attributes: ["game_id", "win", "lose", "draw"],
          include: [
            {
              model: Games,
              as: "games",
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    const games = await Games.findAll({
      attributes: ["id", "name"],
    });
    const row = user.map((users) => {
      return {
        id: users.id,
        username: users.username,
        role: users.role,
        "game id": users.score[0]?.game_id,
        "game name": users.score[0]?.games[0]?.name,
        win: users.score[0]?.win,
        lose: users.score[0]?.lose,
        draw: users.score[0]?.draw,
      };
    });
    const column = Object.keys(row[0]);
    res.render("UserHistory/UpdatePage", {
      row,
      column,
      games,
      req: req.params.id,
    });
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

const updateScore = async (req, res) => {
  try {
    await UserHistory.update(
      {
        game_id: req.body.game_id,
        win: req.body.win,
        lose: req.body.lose,
        draw: req.body.draw,
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
  getUserHistoryById,
  updateScore,
};
