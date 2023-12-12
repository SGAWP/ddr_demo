const express = require('express');
const router = express.Router();
const controller = require('../controllers/spr_well_purpose');
const cache = require("cache-all");
const JWT = require("../middleware/jwt");
const isRoles = require("../middleware/authRole");
const Role = require("../middleware/role");
const config = require("../config/env");

router.get('/GET', JWT, isRoles([Role.Admin, Role.Curator]), cache.middleware(config.cache_time, 'ddr_well_purposes'), controller.getAll);
router.get('/GET/IS_ACTIVE', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), cache.middleware(config.cache_time, 'ddr_well_purposes'), controller.getAllIsActive);
router.post('/POST', JWT, isRoles([Role.Admin, Role.Curator]), controller.create);
router.patch('/PATCH/:well_purpose_id', JWT, isRoles([Role.Admin, Role.Curator]), controller.update);
router.delete('/DELETE/:well_purpose_id', JWT, isRoles([Role.Admin, Role.Curator]), controller.remove);

module.exports = router;
