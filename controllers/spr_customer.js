const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const Customer = db.spr_customers;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                customer_name: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            },
            order: [
                [req.query.sort, req.query.order]
            ],
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize
        };
        const customers = await Customer.findAndCountAll(query);
        res.status(200).json(customers);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getAllIsActive = async function (req, res) {
    try {
        const query = {
            where: {
                is_active: true
            }
        };
        const customers = await Customer.findAll(query);
        res.status(200).json(customers);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_customers/);
    const customer = await new Customer({
        customer_name: req.body.customer_name,
        is_active: req.body.is_active
    });
    try {
        await customer.save();
        res.status(201).json(customer);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_customers/);
        const customer = await Customer.update({
            customer_name: req.body.customer_name,
            is_active: req.body.is_active
        }, {
            where: {
                customer_id: req.params.customer_id
            }
        });
        res.status(200).json(customer);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_customers/);
        await Customer.destroy({
            where: {
                customer_id: req.params.customer_id
            }
        });
        res.status(200).json({
            message: "Заказчик удален."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};


