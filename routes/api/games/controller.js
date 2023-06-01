const { Games } = require("../../../models");

const getAllGames = async (req, res) => {
  try {
    const games = await Games.findAll();
    if (!games) {
      res.json({
          message: "game not found",
          result: null,
          error: "game not found",
        });
        return
    }
    res.json({
      message: "success",
      result: games,
      error: null,
    });
  } catch (error) {
    console.error(error)
  }
};

const getListGameByID = async (req, res) => {
  try {
    const game = await Games.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!game) {
      res.json({
        message: "game with specified id not found",
        result: null,
        error: "couldn't find game",
      });
      return
    }
    res.json({
      message: "success",
      result: game,
      error: null,
    });
  } catch (error) {
    console.error(error)
  }
};

const createGame = async (req, res) => {
  try {
    const created = await Games.create({
      name: req.body.name,
      genre: req.body.genre,
    });
    if (!created) {
      res.json({
        message: "game not created",
        result: null,
        error: "failed to create game",
      });
      return
    }
    res.json({
      message: "game created",
      result: created,
      error: null,
    });
  } catch (error) {
    console.error(error);
  }
}

const updateGame = async (req, res) => {
  try {
    const updated = await Games.update(
      {
        name: req.body.name,
        genre: req.body.genre,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updated) {
      res.json({
          message: "failed to update game",
          result: null,
        });
      return
    }
    res.json({
      message: "success",
      result: updated,
    });
  } catch (error) {
    console.error(error);
  }
}

const deleteGame = async (req, res) => {
  try {
    const deleted = await Games.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleted) {
      res.json({
          message: "failed to delete game",
          result: null,
        });
      return
    }
    res.json({
      message: "game deleted successfully",
      result: deleted,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllGames,
  getListGameByID,
  createGame,
  updateGame,
  deleteGame
}