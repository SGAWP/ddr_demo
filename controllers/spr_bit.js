const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const Bit = db.spr_bits;
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
        const bits = await Bit.findAndCountAll(query);
        res.status(200).json(bits);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_requests/);
    const bit = await new Bit({
        type: req.body.type
    });
    try {
        await bit.save();
        res.status(201).json(bit);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_bits/);
        const bit = await Bit.update({
            type: req.body.type
        }, {
            where: {
                bit_id: req.params.bit_id
            }
        });
        res.status(200).json(bit);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_bits/);
        await Bit.destroy({
            where: {
                bit_id: req.params.bit_id
            }
        });
        res.status(200).json({
            message: "Долото удалено."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};