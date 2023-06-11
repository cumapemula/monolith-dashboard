const { Games } = require("../../../models");

const getAllGames = async (req, res) => {
  try {
    const games = await Games.findAll({
      order: [["id", "ASC"]],
    });
    const row = games.map((game) => {
      return {
        id: game.id,
        name: game.name,
        genre: game.genre,
        "max player": game.max_player,
        "win score": game.win_score,
        "lose score": game.lose_score,
        "draw score": game.draw_score,
      };
    });
    const column = Object.keys(row[0]);
    res.render("Games/ListGames", {
      column,
      row,
      layout: "_layouts/main-layout",
      title: "Dashboard - Games",
      style: "/styles/games/listgames.css",
    });
  } catch (error) {
    console.error(error);
  }
};

const getCreateGames = (req, res) => {
  res.render("Games/CreatePage", {
    layout: "_layouts/main-layout",
    title: "Dashboard - Create Game",
    style: "/styles/games/create.css",
  });
};

const getUpdateGames = async (req, res) => {
  try {
    const game = await Games.findAll({
      where: {
        id: req.params.id,
      },
    });
    const row = game.map((games) => {
      return {
        id: games.id,
        name: games.name,
        genre: games.genre,
        "max player": games.max_player,
        "win score": games.win_score,
        "lose score": games.lose_score,
        "draw score": games.draw_score,
      };
    });
    const column = Object.keys(row[0] || {});
    res.render("Games/UpdatePage", {
      column,
      row,
      req: req.params.id,
      layout: "_layouts/main-layout",
      title: "Dashboard - Update Game",
      style: "/styles/games/update.css",
    });
  } catch (error) {
    console.error(error);
  }
};

const getDeleteGames = async (req, res) => {
  try {
    const game = await Games.findAll({
      where: {
        id: req.params.id,
      },
    });
    const row = game.map((games) => {
      return {
        id: games.id,
        name: games.name,
        genre: games.genre,
        "max player": games.max_player,
        "win score": games.win_score,
        "lose score": games.lose_score,
        "draw score": games.draw_score,
      };
    });
    const column = Object.keys(row[0] || {});
    res.render("Games/DeletePage", {
      column,
      row,
      req: req.params.id,
      layout: "_layouts/main-layout",
      title: "Dashboard - Delete Game",
      style: "/styles/games/delete.css",
    });
  } catch (error) {
    console.error(error);
  }
};

const createGames = async (req, res) => {
  try {
    await Games.create({
      name: req.body.name,
      genre: req.body.genre,
      max_player: req.body.max_player,
      win_score: req.body.win_score,
      lose_score: req.body.lose_score,
      draw_score: req.body.draw_score,
    });
    res.redirect("/dashboard/games");
  } catch (error) {
    console.error(error);
  }
};

const updateGames = async (req, res) => {
  try {
    await Games.update(
      {
        name: req.body.name,
        genre: req.body.genre,
        max_player: req.body.max_player,
        win_score: req.body.win_score,
        lose_score: req.body.lose_score,
        draw_score: req.body.draw_score,
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
