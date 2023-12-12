const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const WellPurpose = db.spr_well_purposes;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                [Op.or]: [
                    {
                        full_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    }
                ]
            },
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize,
            order: [
                [req.query.sort, req.query.order]
            ]
        };
        const well_purposes = await WellPurpose.findAndCountAll(query);
        res.status(200).json(well_purposes);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getAllIsActive = async function (req, res) {
    try {
        const query = {
            where: {
                is_active: true
            }
        };
        const well_purposes = await WellPurpose.findAll(query);
        res.status(200).json(well_purposes);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_well_purposes/);
    const well_purpose = await new WellPurpose({
        full_name: req.body.full_name,
        is_active: req.body.is_active
    });
    try {
        await well_purpose.save();
        res.status(201).json(well_purpose);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_well_purposes/);
        const well_purpose = await WellPurpose.update({
            full_name: req.body.full_name,
            is_active: req.body.is_active
        }, {
            where: {
                well_purpose_id: req.params.well_purpose_id
            }
        });
        res.status(200).json(well_purpose);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_well_purposes/);
        await WellPurpose.destroy({
            where: {
                well_purpose_id: req.params.well_purpose_id
            }
        });
        res.status(200).json({
            message: "Назначение удалено."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

