const dashboardRouter = require('express').Router();
const { getLoginPage } = require('./loginController');
const passport = require('../../../lib/passport')

dashboardRouter.get('/login', getLoginPage)
dashboardRouter.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard/users',
  failureRedirect: '/',
  failureFlash: true
}))


module.exports = dashboardRouter