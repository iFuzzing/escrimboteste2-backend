const {userSignup, userSignin, userInfo} = require('../Controllers/users.js');
const {validateUserSignup, validateUserSignin} = require('../Middleware/Validate/validateUsers.js');
const routeProtection = require('../Middleware/Protections/routeProtection.js');

const express = require('express');
const usersRouter = express.Router();

usersRouter.post('/signup', validateUserSignup, userSignup);
usersRouter.post('/signin', validateUserSignin, userSignin);
usersRouter.get('/me', routeProtection, userInfo);

module.exports = usersRouter;