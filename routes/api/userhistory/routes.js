const userHistoryApi = require('express').Router()
const { UserHistory } = require('../../../models')

// GET: /api/v1/users/history/:id
// Endpoint list user
userHistoryApi.get("/users/history", async (req, res) => {
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
});

// GET: /api/v1/users/history/:id
// Endpoint list user history by id
userHistoryApi.get("/users/history/:id", async (req, res) => {
  const user = await UserHistory.findOne(
    {
      where: {
        user_id: req.params.id
      }
    }
  );

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
});

// POST: /api/v1/users/history
// Endpoint create user history
userHistoryApi.post('/users/history', async (req, res) => {
  const created = await UserHistory.create({
    user_id: req.body.user_id,
    game_id: req.body.game_id,
    win: req.body.win,
    lose: req.body.lose,
    draw: req.body.draw
  })

  if(!created) {
    res.json({
      message: 'user history not created',
      result: null,
      error: 'failed to create user history',
    })
    return;
  }

  res.json({
    message: 'user history created',
    result: created,
    error: null
  })
})

// PUT: /api/v1/users/history/:id
// Endpoint update user history by id
userHistoryApi.put('/users/history/:id', async (req, res) => {
  const updated = await UserHistory.update(
    {
      win: req.body.win,
      lose: req.body.lose,
      draw: req.body.draw
    },
    {
      where: {
        user_id: req.params.id,
      }
    }
  )

  if(!updated) {
    res.json({
      message: 'failed to update user history',
      result: null
    })
    return;
  }

  res.json({
    message: 'success',
    result: updated
  })
})

// DELETE: /api/v1/users/history/:id
// Endpoint delete user history by id
userHistoryApi.delete('/users/history/:id', async (req, res) => {
  const deleted = await UserHistory.destroy({
    where: {
      user_id: req.params.id
    }
  })

  if(!deleted) {
    res.json({
      message: 'failed to delete user history',
      result: null
    })
    return;
  }

  res.json({
    message: 'user history deleted successfully',
    result: deleted
  })
})

module.exports = userHistoryApi