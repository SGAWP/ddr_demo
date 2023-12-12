const express = require('express');
const router = express.Router();
const controller = require('../controllers/spr_customer');
const cache = require("cache-all");
const JWT = require("../middleware/jwt");
const isRoles = require("../middleware/authRole");
const Role = require("../middleware/role");
const config = require("../config/env");

router.get('/GET', JWT, isRoles([Role.Admin, Role.Curator]), cache.middleware(config.cache_time, 'ddr_customers'), controller.getAll);
router.get('/GET/IS_ACTIVE', JWT, isRoles([Role.Admin, Role.Curator]), cache.middleware(config.cache_time, 'ddr_customers'), controller.getAllIsActive);
router.post('/POST', JWT, isRoles([Role.Admin, Role.Curator]), controller.create);
router.patch('/PATCH/:customer_id', JWT, isRoles([Role.Admin, Role.Curator]), controller.update);
router.delete('/DELETE/:customer_id', JWT, isRoles([Role.Admin, Role.Curator]), controller.remove);

module.exports = router;
