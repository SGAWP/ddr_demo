const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const Type = db.spr_types;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                type: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            },
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize,
            order: [
                [req.query.sort, req.query.order]
            ]
        };
        const types = await Type.findAndCountAll(query);
        res.status(200).json(types);
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
        const types = await Type.findAll(query);
        res.status(200).json(types);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_types/);
    const type = await new Type({
        type: req.body.type,
        is_active: req.body.is_active
    });
    try {
        await type.save();
        res.status(201).json(type);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_types/);
        const type = await Type.update({
            type: req.body.type,
            is_active: req.body.is_active
        }, {
            where: {
                type_id: req.params.type_id
            }
        });
        res.status(200).json(type);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_types/);
        await Type.destroy({
            where: {
                type_id: req.params.type_id
            }
        });
        res.status(200).json({
            message: "Тип удален."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};