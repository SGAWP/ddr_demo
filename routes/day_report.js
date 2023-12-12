const express = require('express');
const router = express.Router();
const controller = require('../controllers/day_report');
const cache = require("cache-all");
const JWT = require("../middleware/jwt");
const isRoles = require("../middleware/authRole");
const Role = require("../middleware/role");
const config = require("../config/env");

router.get('/GET/:report_date', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), cache.middleware(config.cache_time, 'ddr_day_reports'), controller.getAll);
router.get('/GET/BY/:hour_id', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), cache.middleware(config.cache_time, 'ddr_day_reports'),  controller.getById);
router.get('/GET/SINKING/YEAR/:hour_id', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), cache.middleware(config.cache_time, 'ddr_day_reports'), controller.getSinkingYear);
router.get('/GET/SINKING/MONTH/:hour_id', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]),  cache.middleware(config.cache_time, 'ddr_day_reports'), controller.getSinkingMonth);
router.post('/POST', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), controller.create);
router.post('/DEFAULT/POST', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), controller.defaultCreate);
router.patch('/PATCH/:hour_id', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), controller.update);
router.delete('/DELETE/:hour_id', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), controller.remove);

module.exports = router;
