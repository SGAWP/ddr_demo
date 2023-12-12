const errorHandler = require("../utils/errorHandler");
const db = require("../config/db.config.js");
const StateTime = db.spr_state_time;

module.exports.getAll = async function (req, res) {
    try {
        const state_times = await StateTime.findAll();
        res.status(200).json(state_times);
    } catch (e) {
        errorHandler(res, e);
    }
};