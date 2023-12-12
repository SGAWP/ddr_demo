const express = require('express');
const router = express.Router();
const controller = require('../controllers/role');
const JWT = require("../middleware/jwt");
const isRoles = require("../middleware/authRole");
const Role = require("../middleware/role");
const cache = require("cache-all");
const config = require("../config/env");

router.get("/GET", JWT, isRoles(Role.Admin), cache.middleware(config.cache_time, 'ddr_roles'), controller.getAll);

module.exports = router;