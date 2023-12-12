const express = require('express');
const router = express.Router();
const controller = require('../controllers/year');
const JWT = require("../middleware/jwt");
const cache = require("cache-all");
const config = require("../config/env");

router.get("/GET", JWT, cache.middleware(config.cache_time, 'ddr_year'), controller.getAll);

module.exports = router;