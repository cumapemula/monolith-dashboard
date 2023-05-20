const gamesApi = require('express').Router();
const { Games } = require('../../../models')

// GET: /api/v1/games
// Endpoint list games
gamesApi.get('/games', async (req, res) => {
  const games = await Games.findAll()

  if(!games) {
    res.json({
      message: "game not found",
      result: null,
      error: "game not found"
    })
    return;
  }

  res.json({
    message: "success",
    result: games,
    error: null
  })
})

// GET: /api/v1/games/:id
// Endpoint list game by specified id
gamesApi.get('/games/:id', async (req, res) => {
  const game = await Games.findOne({
    where: {
      id: req.params.id
    }
  })

  if(!game) {
    res.json({
      message: "game by id not found",
      result: null,
      error: "couldn't find game"
    })
    return;
  }

  res.json({
    message: "success",
    result: game,
    error: null
  })
})

// POST: /api/v1/games
// Endpoint create game
gamesApi.post('/games', async (req, res) => {
  const created = await Games.create({
    name: req.body.name,
    genre: req.body.genre
  })

  if(!created) {
    res.json({
      message: 'game not created',
      result: null,
      error: 'failed to create game'
    })
    return;
  }

  res.json({
    message: 'game created',
    result: created,
    error: null
  })
})

// PUT: /api/v1/games/:id
// Endpoint update game by id
gamesApi.put('/games/:id', async (req, res) => {
  const updated = await Games.update(
    {
      name: req.body.name,
      genre: req.body.genre,
    },
    {
      where: {
        id: req.params.id,
      }
    }
  )

  if(!updated) {
    res.json({
      message: 'failed to update game',
      result: null
    })
    return;
  }

  res.json({
    message: 'success',
    result: updated
  })
})

// DELETE: /api/v1/games/:id
// Endpoint delete game by id
gamesApi.delete('/games/:id', async (req, res) => {
  const deleted = await Games.destroy({
    where: {
      id: req.params.id
    }
  })

  if(!deleted) {
    res.json({
      message: 'failed to delete game',
      result: null
    })
    return;
  }

  res.json({
    message: 'game deleted successfully',
    result: deleted
  })
})

module.exports = gamesApi