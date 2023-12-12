const express = require("express");
const router = express.Router();
const report = require('../controllers/report')
const JWT = require("../middleware/jwt");

router.get('/GET/:report_date', report.getSvod);
router.get('/GET/SVOD_WORK_DRILLING/:report_date', JWT, report.getSvodWorkDrilling)

module.exports = router;