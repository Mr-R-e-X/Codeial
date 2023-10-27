const express = require('express');

const router = express.Router();

const frndShip = require('../controllers/friendship_controller');

router.post('/send-req', frndShip.sendFrndReq);
router.post('/accept-req/:id', frndShip.acceptFrndReq);

module.exports = router;