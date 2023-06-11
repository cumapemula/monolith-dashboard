const { UserHistory, Games } = require("../../../models");

const getAllUsersHistory = async (req, res) => {
  try {
    const user = await UserHistory.findAll();
    if (!user) {
      res.json({
        message: "user not found",
        result: null,
        error: "user not found",
      });
      return;
    }
    res.json({
      message: "success",
      result: user,
      error: null,
    });
  } catch (error) {
    console.error(error);
  }
}

const getUserHistoryByID = async (req, res) => {
  try {
    const user = await UserHistory.findOne({
      where: {
        user_id: req.params.id,
      },
    });
    if (!user) {
      res.json({
        message: "user not found",
        result: null,
        error: "user not found",
      });
      return;
    }
    res.json({
      message: "success",
      result: user,
      error: null,
    });
  } catch (error) {
    console.error(error);
  }
}

const createUserHistory = async (req, res) => {
  try {
    const game = await Games.findOne({
      where: {
        name: 'rock paper scissors'
      }
    })

    const created = await UserHistory.create({
      user_id: req.body.user_id,
      game_id: req.body.game_id,
      win: req.body.win,
      lose: req.body.lose,
      draw: req.body.draw,
      total_score: (+req.body.win * game.win_score) + (+req.body.lose * game.lose_score) + (+req.body.draw * game.draw_score),
    });
    if (!created) {
      res.json({
        message: "user history not created",
        result: null,
        error: "failed to create user history",
      });
      return;
    }
    res.json({
      message: "user history created",
      result: created,
      error: null,
    });
  } catch (error) {
    console.error(error);
  }
}

const updateUserHistory = async (req, res) => {
  try {
    const game = await Games.findOne({
      where: {
        name: 'rock paper scissors'
      }
    })

    const updated = await UserHistory.update(
      {
        win: req.body.win,
        lose: req.body.lose,
        draw: req.body.draw,
        total_score: (+req.body.win * game.win_score) + (+req.body.lose * game.lose_score) + (+req.body.draw * game.draw_score)
      },
      {
        where: {
          user_id: req.params.id,
        },
      }
    );
    if (!updated) {
      res.json({
        message: "failed to update user history",
        result: null,
      });
      return;
    }
    res.json({
      message: "success",
      result: updated,
    });
  } catch (error) {
    console.error(error);
  }
}

const deleteUserHistory = async (req, res) => {
  try {
    const deleted = await UserHistory.destroy({
      where: {
        user_id: req.params.id,
      },
    });
    if (!deleted) {
      res.json({
        message: "failed to delete user history",
        result: null,
      });
      return;
    }
    res.json({
      message: "user history deleted successfully",
      result: deleted,
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAllUsersHistory,
  getUserHistoryByID,
  createUserHistory,
  updateUserHistory,
  deleteUserHistory,
}