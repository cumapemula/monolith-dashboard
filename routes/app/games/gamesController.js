const { Games } = require("../../../models");

const getAllGames = async (req, res) => {
  try {
    const games = await Games.findAll({
      order: [["id", "ASC"]],
    });
    const column = Object.keys(Games.getAttributes());
    const row = games.map((game) => {
      return {
        id: game.id,
        name: game.name,
        genre: game.genre,
      };
    });
    res.render("Games/ListGames", {
      column,
      row,
    });
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

const getCreateGames = (req, res) => {
  res.render("Games/CreatePage");
};

const getUpdateGames = async (req, res) => {
  try {
    const game = await Games.findAll({
      where: {
        id: req.params.id,
      },
    });
    const column = Object.keys(Games.getAttributes());
    const row = game.map((games) => {
      return {
        id: games.id,
        name: games.name,
        genre: games.genre,
      };
    });
    res.render("Games/UpdatePage", {
      column,
      row,
      req: req.params.id,
    });
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

const getDeleteGames = async (req, res) => {
  try {
    const game = await Games.findAll({
      where: {
        id: req.params.id,
      },
    });
    const column = Object.keys(Games.getAttributes());
    const row = game.map((games) => {
      return {
        id: games.id,
        name: games.name,
        genre: games.genre,
      };
    });
    res.render("Games/DeletePage", {
      column,
      row,
      req: req.params.id,
    });
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

const createGames = async (req, res) => {
  try {
    await Games.create({
      name: req.body.name,
      genre: req.body.genre,
    });
    res.redirect("/dashboard/games");
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

const updateGames = async (req, res) => {
  try {
    await Games.update(
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
    res.redirect("/dashboard/games");
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

const deleteGames = async (req, res) => {
  try {
    await Games.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/dashboard/games");
  } catch (error) {
    console.error(error);
    res.render("500page");
  }
};

module.exports = {
  getAllGames,
  getCreateGames,
  getUpdateGames,
  getDeleteGames,
  createGames,
  updateGames,
  deleteGames,
};
