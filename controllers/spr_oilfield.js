const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const Oilfield = db.spr_oilfields;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                [Op.or]: [
                    {
                        oilfield_short_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        oilfield_full_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    }
                ]
            },
            order: [
                [req.query.sort, req.query.order]
            ],
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize
        };
        const oilfields = await Oilfield.findAndCountAll(query);
        res.status(200).json(oilfields);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getAllIsActive = async function (req, res) {
    try {
        const query = {
            where: {
                is_active: true,
                [Op.or]: [
                    {
                        oilfield_short_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        oilfield_full_name: {
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
        const oilfields = await Oilfield.findAndCountAll(query);
        res.status(200).json(oilfields);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getActiveForWellplatfroms = async function (req, res) {
    try {
        const query = {
            where: {
                is_active: true,
                oilfield_full_name: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            },
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize,
            order: [
                ['oilfield_full_name', 'ASC']
            ]
        };
        const oilfields = await Oilfield.findAndCountAll(query);
        res.status(200).json(oilfields);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_oilfields/);
    const oilfield = await new Oilfield({
        oilfield_short_name: req.body.oilfield_short_name,
        oilfield_full_name: req.body.oilfield_full_name,
        is_active: req.body.is_active
    });
    try {
        await oilfield.save();
        res.status(201).json(oilfield);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_oilfields/);
        const oilfield = await Oilfield.update({
            oilfield_short_name: req.body.oilfield_short_name,
            oilfield_full_name: req.body.oilfield_full_name,
            is_active: req.body.is_active
        }, {
            where: {
                oilfield_id: req.params.oilfield_id
            }
        });
        res.status(200).json(oilfield);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_oilfields/);
        await Oilfield.destroy({
            where: {
                oilfield_id: req.params.oilfield_id
            }
        });
        res.status(200).json({
            message: "Месторождение удалено."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};


