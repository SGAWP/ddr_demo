const express = require('express');
const router = express.Router();
const controller = require('../controllers/planned_sinking_well');
const cache = require("cache-all");
const JWT = require("../middleware/jwt");
const isRoles = require("../middleware/authRole");
const Role = require("../middleware/role");
const config = require("../config/env");

router.get('/GET', JWT, isRoles([Role.Admin, Role.Operator, Role.Curator]), cache.middleware(config.cache_time, 'ddr_planned_data_well'), controller.getAll);
router.post('/POST', JWT, isRoles([Role.Admin, Role.Operator,  Role.Curator]), controller.create);
router.patch('/PATCH/:planned_sinking_well_id', JWT, isRoles([Role.Admin, Role.Operator,  Role.Curator]), controller.update);
router.delete('/DELETE/:spr_wellplatforms_id/:well', JWT, isRoles([Role.Admin, Role.Operator,  Role.Curator]), controller.remove);

module.exports = router;
