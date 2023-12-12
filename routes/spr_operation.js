const express = require('express');
const router = express.Router();
const controller = require('../controllers/spr_operation');
const cache = require("cache-all");
const JWT = require("../middleware/jwt");
const isRoles = require("../middleware/authRole");
const Role = require("../middleware/role");
const config = require("../config/env");

router.get('/GET', JWT, isRoles([Role.Admin, Role.Curator, Role.Operator]), cache.middleware(config.cache_time, 'ddr_operations'), controller.getAll);
router.get('/GET/UNIQUE', JWT, isRoles([Role.Admin, Role.Curator]), cache.middleware(config.cache_time, 'ddr_operations'), controller.getUnique);
router.post('/POST',  JWT, isRoles([Role.Admin, Role.Curator]), controller.create);
router.patch('/PATCH/:operation_id', JWT, isRoles([Role.Admin, Role.Curator]), controller.update);
router.delete('/DELETE/:operation_id',  JWT, isRoles([Role.Admin, Role.Curator]), controller.remove);

module.exports = router;