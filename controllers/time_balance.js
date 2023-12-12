const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const VTimeBalance = db.v_time_balances;
const TimeBalance = db.time_balance;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                day_reports_id: req.params.day_reports_id,
                [Op.or]: [
                    {
                        operation_short_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        operation_full_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('duration'), 'varchar'),
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
        const time_balances = await VTimeBalance.findAndCountAll(query);
        res.status(200).json(time_balances);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getTotalDuration = async function (req, res) {
    try {
        const query = {
            where: {
                day_reports_id: req.params.day_reports_id
            }
        };
        const totalDuration = await VTimeBalance.findAll(query);
        let hoursTally = 0;
        let minutesTally = 0;
        for (var i = 0; i < totalDuration.length; i++) {
            let time = totalDuration[i].dataValues.duration.toString().split('.');
            hoursTally += parseInt(time[0]);
            let minute = time[1];
            if (minute) {
                if (minute.length < 2) {
                    minutesTally += parseInt(minute) * 10;
                } else {
                    minutesTally += parseInt(minute);
                }
                if (minutesTally >= 60) {
                    hoursTally++;
                    minutesTally = minutesTally % 60;
                }
            }
        }
        total = parseFloat(hoursTally + "." + minutesTally);
        res.status(200).json({ total: total });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_time_balance/);
    const time_balance = await new TimeBalance({
        duration: req.body.duration,
        day_reports_id: req.body.day_reports_id,
        spr_operations_id: req.body.spr_operations_id
    });
    try {
        const time_balances = await TimeBalance.findAll({
            where: {
                day_reports_id: time_balance.dataValues.day_reports_id
            }
        });

        let hoursTally = 0;
        let minutesTally = 0;
        for (var i = 0; i < time_balances.length; i++) {
            let time = time_balances[i].dataValues.duration.toString().split('.');
            hoursTally += parseInt(time[0]);
            let minute = time[1];
            if (minute) {
                if (minute.length < 2) {
                    minutesTally += parseInt(minute) * 10;
                } else {
                    minutesTally += parseInt(minute);
                }
                if (minutesTally >= 60) {
                    hoursTally++;
                    minutesTally = minutesTally % 60;
                }
            }
        }

        var sum = 0;
        sum = parseFloat(hoursTally + "." + minutesTally);
        var total = 0;
        let hoursTallyArr = 0;
        let minutesTallyArr = 0;
        arr = [sum, parseFloat(time_balance.dataValues.duration)];
        for (var i = 0; i < arr.length; i++) {
            let timeArr = arr[i].toString().split('.');
            hoursTallyArr += parseInt(timeArr[0]);
            let minuteArr = timeArr[1];
            if (minuteArr) {
                if (minuteArr.length < 2) {
                    minutesTallyArr += parseInt(minuteArr) * 10;
                } else {
                    minutesTallyArr += parseInt(minuteArr);
                };
                if (minutesTallyArr >= 60) {
                    hoursTallyArr++;
                    minutesTallyArr = minutesTallyArr % 60;
                };
            };
        };

        total = parseFloat(hoursTallyArr + "." + minutesTallyArr);
        if (total > 24) {
            res.status(500).json({
                message: "Общая длительность не должна превышать 24 часа."
            });
        } else {
            await time_balance.save();
            res.status(201).json(time_balance);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_time_balance/);
        var body = {
            duration: req.body.duration,
            day_reports_id: req.body.day_reports_id,
            spr_operations_id: req.body.spr_operations_id
        }
        const tb = await TimeBalance.findOne({
            where: {
                time_balance_id: req.params.time_balance_id           
            }
        });
        
        const time_balances = await TimeBalance.findAll({
            where: {
                [Op.and]: [
                    {
                        day_reports_id: body.day_reports_id
                    },
                    {
                        duration: {
                            [Op.ne]: tb.dataValues.duration
                        }
                    }
                ]
            }
        });

        let hoursTally = 0;
        let minutesTally = 0;
        for (var i = 0; i < time_balances.length; i++) {
            let time = time_balances[i].dataValues.duration.toString().split('.');
            hoursTally += parseInt(time[0]);
            let minute = time[1];
            if (minute) {
                if (minute.length < 2) {
                    minutesTally += parseInt(minute) * 10;
                } else {
                    minutesTally += parseInt(minute);
                }
                if (minutesTally >= 60) {
                    hoursTally++;
                    minutesTally = minutesTally % 60;
                }
            }
        }

        var sum = 0;
        sum = parseFloat(hoursTally + "." + minutesTally);
        var total = 0;
        let hoursTallyArr = 0;
        let minutesTallyArr = 0;
        arr = [sum, parseFloat(body.duration)];
        for (var i = 0; i < arr.length; i++) {
            let timeArr = arr[i].toString().split('.');
            hoursTallyArr += parseInt(timeArr[0]);
            let minuteArr = timeArr[1];
            if (minuteArr) {
                if (minuteArr.length < 2) {
                    minutesTallyArr += parseInt(minuteArr) * 10;
                } else {
                    minutesTallyArr += parseInt(minuteArr);
                };
                if (minutesTallyArr >= 60) {
                    hoursTallyArr++;
                    minutesTallyArr = minutesTallyArr % 60;
                };
            };
        };

        total = parseFloat(hoursTallyArr + "." + minutesTallyArr);
        if (total > 24) {
            res.status(500).json({
                message: "Общая длительность не должна превышать 24 часа."
            });
        } else {
            await TimeBalance.update(body, {
                where: {
                    time_balance_id: req.params.time_balance_id
                }
            });
            res.status(200).json(body);
        }
    } catch (e) {
        errorHandler(res, e);
    }
};


module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_time_balance/);
        await TimeBalance.destroy({
            where: {
                time_balance_id: req.params.time_balance_id
            }
        });
        res.status(200).json({
            message: "Баланс времени удален."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};