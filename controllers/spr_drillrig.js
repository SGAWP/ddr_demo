const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const Drillrig = db.spr_drillrigs;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                drillrig_name: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            },
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize,
            order: [
                [req.query.sort, req.query.order]
            ]
        };
        const drillrigs = await Drillrig.findAndCountAll(query);
        res.status(200).json(drillrigs);
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
        const drillrigs = await Drillrig.findAll(query);
        res.status(200).json(drillrigs);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_drillrigs/);
    const drillrig = await new Drillrig({
        drillrig_name: req.body.drillrig_name,
        is_active: req.body.is_active
    });
    try {
        await drillrig.save();
        res.status(201).json(drillrig);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_drillrigs/);
        const drillrig = await Drillrig.update({
            drillrig_name: req.body.drillrig_name,
            is_active: req.body.is_active
        }, {
            where: {
                drillrig_id: req.params.drillrig_id
            }
        });
        res.status(200).json(drillrig);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_drillrigs/);
        await Drillrig.destroy({
            where: {
                drillrig_id: req.params.drillrig_id
            }
        });
        res.status(200).json({
            message: "Тип буровой установки удален."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

