const { UserHistory, Users, Games } = require("../models");

UserHistory.hasMany(Games, { foreignKey: "id", sourceKey: "game_id" });
Users.hasMany(UserHistory, { foreignKey: "user_id", sourceKey: "id" });

const getUserHistoryById = (req, res) => {
  Users.findAll({
    where: {
      id: req.params.id,
      role: 'player'
    },
    attributes: ['id', 'username', 'role'],
    include: [
      {
        model: UserHistory,
        attributes: ['game_id', 'win', 'lose', 'draw'],
        include: [
          {
            model: Games,
            attributes: ['name']
          }
        ]
      }
    ]
  }).then( async (user) => {
    const games = await Games.findAll({
      attributes: ['id', 'name']
    })
    const row = user.map((users) => {
      return {
          id: users.id,
          username: users.username,
          role: users.role,
          'game id': users.UserHistories[0]?.game_id,
          'game name': users.UserHistories[0]?.Games[0]?.name,
          win: users.UserHistories[0]?.win,
          lose: users.UserHistories[0]?.lose,
          draw: users.UserHistories[0]?.draw
      }
    })
    const column = Object.keys(row[0])
    res.render('UserHistory/UpdatePage', {
      row,
      column,
      games,
      req: req.params.id
    })
  })
}

const updateScore = (req, res) => {
  UserHistory.update({
    game_id: req.body.game_id,
    win: req.body.win,
    lose: req.body.lose,
    draw: req.body.draw
  },
  {
    where: {
      user_id: req.params.id
    }
  }).then(() => {
    res.redirect("/dashboard/users");
  })
}

module.exports = {
  getUserHistoryById,
  updateScore
};
