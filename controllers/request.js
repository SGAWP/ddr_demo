const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const VRequest = db.v_requests;
const Request = db.requests;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: [
                {
                    day_reports_id: req.params.day_reports_id
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
        const requests = await VRequest.findAndCountAll(query);
        res.status(200).json(requests);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_requests/);
    const request = await new Request({
        date_request: req.body.date_request,
        spr_requests_id: req.body.spr_requests_id,
        day_reports_id: req.body.day_reports_id
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
        cache.removeByPattern(/ddr_requests/);
        const request = await Request.update({
            date_request: req.body.date_request,
            spr_requests_id: req.body.spr_requests_id,
            day_reports_id: req.body.day_reports_id
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
        cache.removeByPattern(/ddr_requests/);
        await Request.destroy({
            where: {
                request_id: req.params.request_id
            }
        });
        res.status(200).json({
            message: "Информация о заявке удалена."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};