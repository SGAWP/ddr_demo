const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const Technology = db.spr_technologies;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                technology: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            },
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize,
            order: [
                [req.query.sort, req.query.order]
            ]
        };
        const technologies = await Technology.findAndCountAll(query);
        res.status(200).json(technologies);
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
        const technologies = await Technology.findAll(query);
        res.status(200).json(technologies);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_technologies/);
    const technology = await new Technology({
        technology: req.body.technology,
        is_active: req.body.is_active
    });
    try {
        await technology.save();
        res.status(201).json(technology);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_technologies/);
        const technology = await Technology.update({
            technology: req.body.technology,
            is_active: req.body.is_active
        }, {
            where: {
                technology_id: req.params.technology_id
            }
        });
        res.status(200).json(technology);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_technologies/);
        await Technology.destroy({
            where: {
                technology_id: req.params.technology_id
            }
        });
        res.status(200).json({
            message: "Технология удалена."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};