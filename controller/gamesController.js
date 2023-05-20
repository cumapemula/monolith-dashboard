const { Games } = require("../models");

const getAllGames = (req, res) => {
  Games.findAll({
    order: [['id', 'ASC']]
  }).then((game) => {
    const column = Object.keys(Games.getAttributes());
    const row = game.map((games) => {
      return {
        id: games.id,
        name: games.name,
        genre: games.genre,
      };
    });
    res.render("Games/ListGames", {
      column,
      row,
    });
  });
};

const getCreateGames = (req, res) => {
  res.render('Games/CreatePage')
}

const getUpdateGames = (req, res) => {
  Games.findAll({
    where: {
      id: req.params.id,
    },
  }).then((game) => {
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
  });
};

const getDeleteGames = (req, res) => {
  Games.findAll({
    where: {
      id: req.params.id,
    },
  }).then((game) => {
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
  });
};

const createGames = (req, res) => {
  Games.create({
    name: req.body.name,
    genre: req.body.genre,
  }).then(() => {
    res.redirect("/dashboard/games");
  });
};

const updateGames = (req, res) => {
  Games.update(
    {
      name: req.body.name,
      genre: req.body.genre,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(() => {
    res.redirect("/dashboard/games");
  });
};

const deleteGames = (req, res) => {
  Games.destroy({
    where: {
      id: req.params.id,
    }
  }).then(() =>{
    res.redirect("/dashboard/games");
  }).catch(err => {
    console.log(err);
  })
}

module.exports = {
  getAllGames,
  getCreateGames,
  getUpdateGames,
  getDeleteGames,
  createGames,
  updateGames,
  deleteGames
};
