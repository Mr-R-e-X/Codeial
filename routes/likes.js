const express = require('express');

const router = express.Router();

const likesController = require('../controllers/likes_conroller');

router.post('toggle', likesController.toggleLike);

module.exports = router;