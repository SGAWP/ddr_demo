const express = require('express');
const router = express.Router();
const controller = require('../controllers/master_team');
const cache = require("cache-all");
const JWT = require("../middleware/jwt");
const isRoles = require("../middleware/authRole");
const Role = require("../middleware/role");
const config = require("../config/env");

router.get('/GET', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), cache.middleware(config.cache_time, 'ddr_masters_teams'), controller.getAll);
router.post('/POST', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), controller.create);
router.patch('/PATCH/:master_team_id', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), controller.update);
router.delete('/DELETE/:master_team_id', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), controller.remove);

module.exports = router;
