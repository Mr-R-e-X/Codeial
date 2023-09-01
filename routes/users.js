const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
const { route } = require('./users');

// router.use('/users', route);
router.get('/profile', usersController.profile);

router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.create);

module.exports = router;