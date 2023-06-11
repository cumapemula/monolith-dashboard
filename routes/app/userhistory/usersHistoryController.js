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
          attributes: ["game_id", "win", "lose", "draw", "total_score"],
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
        'total score': users.score[0]?.total_score
      };
    });
    const column = Object.keys(row[0]);
    res.render("UserHistory/UpdatePage", {
      row,
      column,
      games,
      req: req.params.id,
      layout: "_layouts/main-layout",
      title: "Dashboard - Update History",
      style: "/styles/userhistory/update.css",
    });
  } catch (error) {
    console.error(error);
  }
};

const updateScore = async (req, res) => {
  try {
    
    const game = await Games.findOne({
      where: {
        name: 'rock paper scissors',
      }
    });

    await UserHistory.update(
      {
        game_id: req.body.game_id,
        win: req.body.win,
        lose: req.body.lose,
        draw: req.body.draw,
        total_score: (game.win_score * +req.body.win) + (game.lose_score * +req.body.lose) + (game.draw_score * +req.body.draw)
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
  }
};

module.exports = {
  getUserHistoryById,
  updateScore,
};
