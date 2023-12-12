const errorHandler = require("../utils/errorHandler");
const db = require("../config/db.config.js");
const Role = db.roles;

module.exports.getAll = async function (req, res) {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (e) {
        errorHandler(res, e);
    }
};