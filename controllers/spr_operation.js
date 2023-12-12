const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const db = require('../config/db.config.js');
const Operation = db.spr_operations;
const Sequelize = require('sequelize');

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            hierarchy: true
        };
        const operations = await Operation.findAll(query);
        res.status(200).json(operations);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getUnique = async function (req, res) {
    try {
        const query = {
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('group_name')), 'group_name']
            ],
            order: [
                ["group_name", "ASC"]
            ]
        };
        const operations = await Operation.findAll(query);
        res.status(200).json(operations);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_operations/);
    const operation = await new Operation({
        operation_full_name: req.body.operation_full_name,
        operation_short_name: req.body.operation_short_name,
        parentOperation_id: req.body.parentOperation_id,
        group_name: req.body.group_name
    });
    try {
        await operation.save();
        res.status(201).json(operation);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_operations/);
        const operation = await Operation.update({
            operation_full_name: req.body.operation_full_name,
            operation_short_name: req.body.operation_short_name,
            group_name: req.body.group_name
        }, {
            where: {
                operation_id: req.params.operation_id
            }
        });
        res.status(200).json(operation);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_operations/);
        await Operation.destroy(
            {
                where: {
                    operation_id: req.params.operation_id
                }
            }
        );
        res.status(200).json({
            message: "Операция удалена."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

