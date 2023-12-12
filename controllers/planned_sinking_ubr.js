const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const PlannedSinkingUBR = db.planned_sinkings_ubr;
const VPlannedSinkingUBR = db.v_ubr_planned_sinkings;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                [Op.and]: [
                    {
                        months_id: req.params.months_id,
                        year: req.params.year
                    }
                ]
            }
        };
        const plannedSinkingsUBR = await VPlannedSinkingUBR.findOne(query);
        res.status(200).json(plannedSinkingsUBR);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_planned_data_ubr/);
    const plannedSinkingsUBR = await new PlannedSinkingUBR({
        sinking_month: req.body.sinking_month,
        months_id: req.body.months_id,
        years_id: req.body.years_id
    });
    try {
        await plannedSinkingsUBR.save();
        res.status(201).json(plannedSinkingsUBR);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_planned_data_ubr/);
        const plannedSinkingsUBR = await PlannedSinkingUBR.update({
            sinking_month: req.body.sinking_month
        }, {
            where: {
                planned_sinking_ubr_id: req.params.planned_sinking_ubr_id
            }
        });
        res.status(200).json(plannedSinkingsUBR);
    } catch (e) {
        errorHandler(res, e);
    }
};