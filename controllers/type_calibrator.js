const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const TypeCalibrator = db.type_calibrators;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                type_calibrator: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            },
            order: [
                [req.query.sort, req.query.order]
            ],
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize
        };
        const typeCalibrators = await TypeCalibrator.findAndCountAll(query);
        res.status(200).json(typeCalibrators);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getSelect = async function (req, res) {
    try {
        const typeCalibrators = await TypeCalibrator.findAll();
        res.status(200).json(typeCalibrators);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_type_calibrators/);
    const typeCalibrator = await new TypeCalibrator({
        type_calibrator: req.body.type_calibrator
    });
    try {
        await typeCalibrator.save();
        res.status(201).json(typeCalibrator);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_type_calibrators/);
        const typeCalibrator = await TypeCalibrator.update({
            type_calibrator: req.body.type_calibrator
        }, {
            where: {
                type_calibrator_id: req.params.type_calibrator_id
            }
        });
        res.status(200).json(typeCalibrator);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_type_calibrators/);
        await TypeCalibrator.destroy({
            where: {
                type_calibrator_id: req.params.type_calibrator_id
            }
        });
        res.status(200).json({
            message: "Тип калибратора удален."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};


