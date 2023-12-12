const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const Master = db.masters;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                [Op.or]: [
                    {
                        master_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        assistant_master: {
                            [Op.iLike]: `%${req.query.search}%` 
                        }
                    },
                    {
                        second_assistant_master: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        comment: {
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
        const masters = await Master.findAndCountAll(query);
        res.status(200).json(masters);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getMTAll = async function (req, res) {
    try {
        const query = {
            where: {
                [Op.or]: [
                    {
                        master_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        assistant_master: {
                            [Op.iLike]: `%${req.query.search}%` 
                        }
                    },
                    {
                        second_assistant_master: {
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
        const masters = await Master.findAndCountAll(query);
        res.status(200).json(masters);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_masters/);
    const master = await new Master({
        master_name: req.body.master_name,
        assistant_master: req.body.assistant_master,
        second_assistant_master: req.body.second_assistant_master,
        comment: req.body.comment
    });
    try {
        await master.save();
        res.status(201).json(master);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_masters/);
        const master = await Master.update({
            master_name: req.body.master_name,
            assistant_master: req.body.assistant_master,
            second_assistant_master: req.body.second_assistant_master,
            comment: req.body.comment
        }, {
            where: {
                master_id: req.params.master_id
            }
        });
        res.status(200).json(master);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_masters/);
        await Master.destroy({
            where: {
                master_id: req.params.master_id
            }
        });
        res.status(200).json({
            message: "Мастер удален."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

