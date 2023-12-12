const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const Request = db.spr_requests;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                request_name: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            },
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize,
            order: [
                [req.query.sort, req.query.order]
            ]
        };
        const requests = await Request.findAndCountAll(query);
        res.status(200).json(requests);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getAllIsActive = async function (req, res) {
    try {
        const query = {
            where: [
                {
                    is_active: true
                },
                {
                    request_name: {
                        [Op.iLike]: `%${req.query.search}%`
                    }
                }
            ],
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize,
            order: [
                [req.query.sort, req.query.order]
            ]
        };
        const requests = await Request.findAndCountAll(query);
        res.status(200).json(requests);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_spr_requests/);
    const request = await new Request({
        request_name: req.body.request_name,
        is_active: req.body.is_active
    });
    try {
        await request.save();
        res.status(201).json(request);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_spr_requests/);
        const request = await Request.update({
            request_name: req.body.request_name,
            is_active: req.body.is_active
        }, {
            where: {
                request_id: req.params.request_id
            }
        });
        res.status(200).json(request);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_spr_requests/);
        await Request.destroy({
            where: {
                request_id: req.params.request_id
            }
        });
        res.status(200).json({
            message: "Заявка удалена."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};