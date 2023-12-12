const express = require('express');
const router = express.Router();
const controller = require('../controllers/type_spindle');
const cache = require("cache-all");
const JWT = require("../middleware/jwt");
const isRoles = require("../middleware/authRole");
const Role = require("../middleware/role");
const config = require("../config/env");

router.get("/GET", JWT, isRoles([Role.Admin, Role.Curator]), cache.middleware(config.cache_time, 'ddr_type_spindles'), controller.getAll);
router.get("/GET/SELECT", JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), cache.middleware(config.cache_time, 'ddr_type_spindles'), controller.getSelect);
router.post('/POST', JWT, isRoles([Role.Admin, Role.Curator]), controller.create);
router.patch('/PATCH/:type_spindle_id', JWT, isRoles([Role.Admin, Role.Curator]), controller.update);
router.delete('/DELETE/:type_spindle_id', JWT, isRoles([Role.Admin, Role.Curator]), controller.remove);

module.exports = router;