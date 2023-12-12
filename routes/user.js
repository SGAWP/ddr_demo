const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const cache = require("cache-all");
const isRoles = require("../middleware/authRole");
const Role = require("../middleware/role");
const JWT = require("../middleware/jwt");
const config = require("../config/env");

router.get("/GET", JWT, isRoles(Role.Admin), cache.middleware(config.cache_time, 'ddr_users'), controller.getAll);
router.get("/PROFILE", JWT, controller.getProfile);
router.post('/POST', JWT, isRoles(Role.Admin), controller.create);
router.patch('/PATCH/:user_id', JWT, isRoles(Role.Admin), controller.update);
router.patch('/UPDATE/PASSWORD/:user_id', JWT, isRoles(Role.Admin), controller.updatePassword);
router.patch('/RESET/PASSWORD', JWT, controller.resetPassword);
router.delete('/DELETE/:user_id', JWT, isRoles(Role.Admin), controller.remove);

module.exports = router;