const express = require('express');
const router = express.Router();
const controller = require('../controllers/planned_sinking');
const cache = require("cache-all");
const JWT = require("../middleware/jwt");
const isRoles = require("../middleware/authRole");
const Role = require("../middleware/role");
const config = require("../config/env");

router.get('/GET/:months_id/:year', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), cache.middleware(config.cache_time, 'ddr_planned_sinking'), controller.getAll);
router.post('/POST', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), controller.create);
router.patch('/PATCH/:planned_sinking_id', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), controller.update);
router.delete('/DELETE/:planned_sinking_id', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), controller.remove);

module.exports = router;
