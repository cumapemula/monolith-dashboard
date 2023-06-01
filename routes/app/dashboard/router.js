const dashboardRouter = require('express').Router();
const { getAdmin, getLoginPage } = require('./loginController');

dashboardRouter.get('/login', getLoginPage)
dashboardRouter.post('/login', getAdmin)


module.exports = dashboardRouter