const userBiodataApi = require('express').Router()
const { UserBiodata } = require('../../../models')


// GET: /api/v1/users/biodata
// Endpoint list user biodata
userBiodataApi.get('/users/biodata', async (req, res) => {
  const user = await UserBiodata.findAll({
    attributes: ['user_id', 'first_name', 'last_name', 'hobby']
  })

  if(!user) {
    res.json({
      message: "user biodata by id not found",
      result: null,
      error: "couldn't find user biodata"
    })
    return;
  }

  res.json({
    message: "success",
    result: user,
    error: null
  })
})

// GET: /api/v1/users/biodata/:id
// Endpoint list user biodata by specified id
userBiodataApi.get('/users/biodata/:id', async (req, res) => {
  const user = await UserBiodata.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['user_id', 'first_name', 'last_name', 'hobby']
  })

  if(!user) {
    res.json({
      message: "user biodata by id not found",
      result: null,
      error: "couldn't find user biodata"
    })
    return;
  }

  res.json({
    message: "success",
    result: user,
    error: null
  })
})

// PUT: /api/v1/users/biodata/:id
// Endpoint update user biodata by id
userBiodataApi.put('/users/biodata/:id', async (req, res) => {
  const updated = await UserBiodata.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      hobby: req.body.hobby
    },
    {
      where: {
        user_id: req.params.id,
      }
    }
  )

  if(!updated) {
    res.json({
      message: 'failed to update user biodata',
      result: null
    })
    return;
  }

  res.json({
    message: 'success',
    result: updated
  })
})

// DELETE: /api/v1/user/biodata/:id
// Endpoint delete user biodata by id
userBiodataApi.delete("/users/biodata/:id", async (req, res) => {
  const deleted = await UserBiodata.destroy({
    where: {
      user_id: req.params.id,
    },
  });

  if (!deleted) {
    res.json({
      message: "failed to delete user biodata",
      result: null,
    });
    return;
  }

  res.json({
    message: "user biodata deleted successfully",
    result: deleted,
  });
});

module.exports = userBiodataApi