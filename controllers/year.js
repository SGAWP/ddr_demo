const errorHandler = require("../utils/errorHandler");
const db = require("../config/db.config.js");
const Year = db.years;

module.exports.getAll = async function (req, res) {
    try {
        const years = await Year.findAll();
        res.status(200).json(years);
    } catch (e) {
        errorHandler(res, e);
    }
};