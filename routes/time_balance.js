const express = require('express');
const router = express.Router();
const controller = require('../controllers/time_balance');
const cache = require("cache-all");
const JWT = require("../middleware/jwt");
const isRoles = require("../middleware/authRole");
const Role = require("../middleware/role");
const config = require("../config/env");

router.get("/GET/:day_reports_id", JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), cache.middleware(config.cache_time, 'ddr_time_balance'), controller.getAll);
router.get("/GET/TOTAL/:day_reports_id", JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), cache.middleware(config.cache_time, 'ddr_time_balance'), controller.getTotalDuration);
router.post('/POST', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), controller.create);
router.patch('/PATCH/:time_balance_id', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), controller.update);
router.delete('/DELETE/:time_balance_id', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), controller.remove);

module.exports = router;