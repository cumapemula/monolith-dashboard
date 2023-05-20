const usersApi = require('express').Router()
const { Users, UserBiodata, UserHistory, Games } = require('../../../models')

Users.hasOne(UserBiodata, { foreignKey: 'user_id', sourceKey: 'id'})
Users.hasOne(UserHistory, { foreignKey: 'user_id', sourceKey: 'id'})
UserHistory.hasMany(Games, { foreignKey: 'id', sourceKey: 'game_id'})


// GET: /api/v1/users
// Endpoint list users dengan role 'Player'
usersApi.get('/users/account', async (req, res) => {
  const user = await Users.findAll({
    where: {
      role: 'player'
    },
    attributes: ['id', 'username', 'role'],
    include: [
      {
        model: UserBiodata
      },
      {
        model: UserHistory,
        include: [
          {
            model: Games
          }
        ]
      }
    ]
  })

  if(!user) {
    res.json({
      message: 'user not found',
      result: null,
      error: 'user not found'
    })
    return;
  }

  res.json({
    message: 'success',
    result: user,
    error: null
  })
})

// GET: /api/v1/users/:id
// Endpoint list users dengan role 'Player' by spesific ID
usersApi.get('/users/account/:id', async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
      role: 'player'
    },
    attributes: ['id', 'username', 'role']
  })

  if(!user) {
    res.json({
      message: 'user id not found',
      result: null,
      error: 'user id not found'
    })
    return;
  }

  res.json({
    message: 'success',
    result: user,
    error: null
  })
})

// POST: /api/v1/users
// Endpoint create user
usersApi.post('/users/account', async (req, res) => {
  const created = await Users.create({
    username: req.body.username,
    password: req.body.password,
    role: 'player'
  })

  await UserBiodata.create({
    user_id: created.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    hobby: req.body.hobby
  })

  res.json({
    message: "successfully created",
    result: created,
    error: null
  })
})

// PUT: /api/v1/users/:id
// Endpoint update user by ID
usersApi.put('/users/account/:id', async (req, res) => {
  const updated = await Users.update({
    username: req.body.username,
    password: req.body.password
  },
  {
    where: {
      id: req.params.id,
    }
  })

  if(!updated) {
    res.json({
      message: "failed to update",
      result: null,
      error: "failed to update",
    });
    return;
  }

  res.json({
    message: 'successfully updated',
    error: null
  })
})

// DELETE: /api/v1/users/:id
// Endpoint delete user by spesific ID
usersApi.delete('/users/account/:id', async (req, res) => {
  
  await UserHistory.destroy({
    where: {
      id: req.params.id
    }
  })

  await UserBiodata.destroy({
    where: {
      id: req.params.id
    }
  })

  const deleted = await Users.destroy({
    where: {
      id: req.params.id
    }
  })

  if (!deleted) {
    res.json({
      message: "failed to delete",
      result: null,
      error: "failed to delete",
    });
    return;
  }

  res.json({
    message: "successfully deleted",
    error: null,
  });
})

module.exports = usersApi