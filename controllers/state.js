const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const VState = db.v_states;
const State = db.state;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                day_reports_id: req.params.day_reports_id,
                [Op.or]: [
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('bottom'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('density'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('visconsity'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('water_separation'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('state_time'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    )
                ]
            },
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize,
            order: [
                [req.query.sort, req.query.order]
            ]
        };
        const states = await VState.findAndCountAll(query);
        res.status(200).json(states);
    } catch (e) {
        errorHandler(res, e);
    }
};

// module.exports.getChart = async function (req, res) {
//     try {
//         const query = {
//             where: {
//                 day_reports_id: req.params.day_reports_id
//             },
//             order: [
//                 ['state_time', 'ASC']
//             ]
//         }
//         const states = await VState.findAll(query)
//         res.status(200).json(states)
//     } catch (e) {
//         errorHandler(res, e)
//     }
// }

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_states/);
    const state = await new State({
        bottom: req.body.bottom,
        density: req.body.density,
        visconsity: req.body.visconsity,
        water_separation: req.body.water_separation,
        state_times_id: req.body.state_times_id,
        time_balances_id: req.body.time_balances_id,
        day_reports_id: req.body.day_reports_id
    });
    try {
        await state.save();
        res.status(201).json(state);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_states/);
        const state = await State.update({
            bottom: req.body.bottom,
            density: req.body.density,
            visconsity: req.body.visconsity,
            water_separation: req.body.water_separation,
            time_balances_id: req.body.time_balances_id,
            day_reports_id: req.body.day_reports_id
        }, {
            where: {
                state_id: req.params.state_id
            }
        });
        res.status(200).json(state);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_states/);
        await State.destroy({
            where: {
                state_id: req.params.state_id
            }
        });
        res.status(200).json({
            message: "Состояние удалено."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};