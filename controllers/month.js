const errorHandler = require("../utils/errorHandler");
const db = require("../config/db.config.js");
const Month = db.months;

module.exports.getAll = async function (req, res) {
    try {
        const months = await Month.findAll();
        res.status(200).json(months);
    } catch (e) {
        errorHandler(res, e);
    }
};