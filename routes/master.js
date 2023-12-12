const express = require('express');
const router = express.Router();
const controller = require('../controllers/master');
const cache = require("cache-all");
const JWT = require("../middleware/jwt");
const isRoles = require("../middleware/authRole");
const Role = require("../middleware/role");
const config = require("../config/env");

router.get('/GET', JWT, isRoles([Role.Admin, Role.Curator]), cache.middleware(config.cache_time, 'ddr_masters'), controller.getAll);
router.get('/GET_MT_ALL', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), cache.middleware(config.cache_time, 'ddr_masters'), controller.getMTAll);
router.post('/POST', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), controller.create);
router.patch('/PATCH/:master_id', JWT, isRoles([Role.Admin, Role.Curator]), controller.update);
router.delete('/DELETE/:master_id', JWT, isRoles([Role.Admin, Role.Curator]), controller.remove);

module.exports = router;
