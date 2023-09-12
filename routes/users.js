const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
const { route } = require('./users');

// router.use('/users', route);
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.create);
// router.post('/create-session', usersController.createSession);
// router.post('/sign-out', usersController.signOut);


// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failuerRedirect: '/users/sign-in'}
 ), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports = router;