const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const TypeSpindle = db.type_spindles;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                type_spindle: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            },
            order: [
                [req.query.sort, req.query.order]
            ],
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize
        };
        const typeSpindles = await TypeSpindle.findAndCountAll(query);
        res.status(200).json(typeSpindles);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getSelect = async function (req, res) {
    try {
        const typeSpindles = await TypeSpindle.findAll();
        res.status(200).json(typeSpindles);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_type_spindles/);
    const typeSpindle = await new TypeSpindle({
        type_spindle: req.body.type_spindle
    });
    try {
        await typeSpindle.save();
        res.status(201).json(typeSpindle);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_type_spindles/);
        const typeSpindle = await TypeSpindle.update({
            type_spindle: req.body.type_spindle
        }, {
            where: {
                type_spindle_id: req.params.type_spindle_id
            }
        });
        res.status(200).json(typeSpindle);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_type_spindles/);
        await TypeSpindle.destroy({
            where: {
                type_spindle_id: req.params.type_spindle_id
            }
        });
        res.status(200).json({
            message: "Тип шпинделя удален."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};


