const express = require("express");
const router = express.Router();

const userApi = require('../../../controllers/api/v1/users-api')

router.post('/creat-session', userApi.createSession);

module.exports = router;