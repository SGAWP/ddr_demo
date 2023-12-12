const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const Turbodrill = db.spr_turbodrills;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                turbodrill_name: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            },
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize,
            order: [
                [
                    req.query.sort, req.query.order
                ]
            ]
        };
        const turbodrills = await Turbodrill.findAndCountAll(query);
        res.status(200).json(turbodrills);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_turbodrills/);
    const turbodrill = await new Turbodrill({
        turbodrill_name: req.body.turbodrill_name
    });
    try {
        await turbodrill.save();
        res.status(201).json(turbodrill);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_turbodrills/);
        const turbodrill = await Turbodrill.update({
            turbodrill_name: req.body.turbodrill_name
        }, {
            where: {
                turbodrill_id: req.params.turbodrill_id
            }
        });
        res.status(200).json(turbodrill);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_turbodrills/);
        await Turbodrill.destroy({
            where: {
                turbodrill_id: req.params.turbodrill_id
            }
        });
        res.status(200).json({
            message: "Турбобур удален."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};