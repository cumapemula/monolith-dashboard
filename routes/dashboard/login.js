const dashboardRouter = require('express').Router();
const { Users } = require('../../models')

dashboardRouter.get('/login', (req, res) => {
  res.render('LoginPage')
})

dashboardRouter.post('/login', async (req, res) => {
  const isAdmin = await Users.findOne({
    where: {
      username: req.body.username,
      password: req.body.password,
      role: 'admin'
    }
  })

  if(!isAdmin) {
    res.redirect('/dashboard/login')
    return
  }

  res.redirect('/dashboard/users')
})


module.exports = dashboardRouter