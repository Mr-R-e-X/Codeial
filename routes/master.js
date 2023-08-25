const express = require('express');
const router = express.Router();

const masterControl = require('../controllers/master_controller');

router.get('/masterControl', masterControl.master);

module.exports = router;