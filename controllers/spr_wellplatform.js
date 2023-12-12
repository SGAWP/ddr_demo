const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const VWellplatform = db.v_wellplatforms;
const Wellplatform = db.spr_wellplatforms;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                [Op.or]: [
                    {
                        wellplatform_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        oilfield_short_name: {
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
        const wellplatforms = await VWellplatform.findAndCountAll(query);
        res.status(200).json(wellplatforms);
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
                        wellplatform_name: {
                            [Op.like]: `%${req.query.search}%`
                        }
                    },
                    {
                        oilfield_short_name: {
                            [Op.like]: `%${req.query.search}%`
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
        const wellplatforms = await VWellplatform.findAndCountAll(query);
        res.status(200).json(wellplatforms);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_wellplatforms/);
    const wellplatform = await new Wellplatform({
        wellplatform_name: req.body.wellplatform_name,
        is_active: req.body.is_active,
        spr_oilfields_id: req.body.spr_oilfields_id
    });
    try {
        await wellplatform.save();
        res.status(201).json(wellplatform);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_wellplatforms/);
        const wellplatform = await Wellplatform.update({
            wellplatform_name: req.body.wellplatform_name,
            is_active: req.body.is_active,
            spr_oilfields_id: req.body.spr_oilfields_id
        }, {
            where: {
                wellplatform_id: req.params.wellplatform_id
            }
        });
        res.status(200).json(wellplatform);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_wellplatforms/);
        await Wellplatform.destroy({
            where: {
                wellplatform_id: req.params.wellplatform_id
            }
        });
        res.status(200).json({
            message: "Куст удален."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};


