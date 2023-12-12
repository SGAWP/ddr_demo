const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

router.post('/POST/LOGIN', controller.login);

module.exports = router;
