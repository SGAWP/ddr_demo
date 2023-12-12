const express = require('express');
const router = express.Router();
const controller = require('../controllers/spr_state_time');
const JWT = require("../middleware/jwt");

router.get("/GET", JWT, controller.getAll);

module.exports = router;