const errorHandler = require('../utils/errorHandler');
const moment = require('moment');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const VRegime = db.v_regimes;
const Regime = db.regimes;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                day_reports_id: req.params.day_reports_id,
                [Op.or]: [
                    {
                        turbodrill_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        type: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        type_calibrator: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        type_spindle: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('slotting_n'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('start_slotting'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('slotting_end'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('pump_pressure'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('spindle'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('turbodrill_n'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('d1'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('d2'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('bit_number'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    )
                ]
            },
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize
        };
        const regimes = await VRegime.findAndCountAll(query);
        res.status(200).json(regimes);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_regimes/);
    const regime = await new Regime({
        slotting_n: req.body.slotting_n,
        duration: moment(req.body.duration).format("HH:mm"),
        start_slotting: req.body.start_slotting,
        slotting_end: req.body.slotting_end,
        pump_pressure: req.body.pump_pressure,
        spindle: req.body.pump_pressure,
        type_spindles_id: req.body.type_spindles_id,
        type_calibrators_id: req.body.type_calibrators_id,
        d1: req.body.d1,
        d2: req.body.d2,
        turbodrill_n: req.body.turbodrill_n,
        bit_number: req.body.bit_number,
        spr_bits_id: req.body.spr_bits_id,
        day_reports_id: req.body.day_reports_id,
        spr_turbodrills_id: req.body.spr_turbodrills_id
    });
    try {
        await regime.save();
        res.status(201).json(regime);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_regimes/);
        const regime = await Regime.update({
            slotting_n: req.body.slotting_n,
            duration: moment(req.body.duration).format("HH:mm"),
            start_slotting: req.body.start_slotting,
            slotting_end: req.body.slotting_end,
            pump_pressure: req.body.pump_pressure,
            spindle: req.body.pump_pressure,
            type_spindles_id: req.body.type_spindles_id,
            type_calibrators_id: req.body.type_calibrators_id,
            d1: req.body.d1,
            d2: req.body.d2,
            turbodrill_n: req.body.turbodrill_n,
            bit_number: req.body.bit_number,
            spr_bits_id: req.body.spr_bits_id,
            day_reports_id: req.body.day_reports_id,
            spr_turbodrills_id: req.body.spr_turbodrills_id
        }, {
            where: {
                regime_id: req.params.regime_id
            }
        });
        res.status(200).json(regime);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_regimes/);
        await Regime.destroy({
            where: {
                regime_id: req.params.regime_id
            }
        });
        res.status(200).json({
            message: "Баланс времени удален."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};
