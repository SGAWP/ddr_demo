const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const moment = require('moment');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const VDayReport = db.v_day_reports;
const DayReport = db.day_reports;
const MasterTeam = db.masters_teams;
const Master = db.masters;
const Team = db.teams;
const Wellplatform = db.spr_wellplatforms;
const Oilfield = db.spr_oilfields;
const PlannedSinkingWell = db.planned_sinkings_well;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                report_date: req.params.report_date,
                [Op.or]: [
                    {
                        well: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        master_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        wellplatform_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        oilfield_short_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('team_name'), 'varchar'),
                        {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    )
                ]
            },
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize
        };
        const dayReports = await VDayReport.findAndCountAll(query);
        res.status(200).json(dayReports);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async function (req, res) {
    try {
        const query = {
            where: {
                hour_id: req.params.hour_id
            },
            include: [
                {
                    model: MasterTeam,
                    required: true,
                    include: [
                        {
                            model: Master,
                            required: true
                        },
                        {
                            model: Team,
                            required: true
                        }
                    ]
                },
                {
                    model: Wellplatform,
                    required: true,
                    include: [
                        {
                            model: Oilfield,
                            required: true
                        }
                    ]
                }
            ]
        }
        const dayReport = await DayReport.findOne(query);
        res.status(200).json(dayReport);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_day_reports/);
    const dayReport = await new DayReport({
        report_date: req.body.report_date,
        vAbsorbing: req.body.vAbsorbing,
        rest_oil: req.body.rest_oil,
        percent_liquid: req.body.percent_liquid,
        urgent_need: req.body.urgent_need,
        well: req.body.well,
        msgrp: req.body.msgrp,
        sinking_day: req.body.sinking_day,
        drill_start_deviation: req.body.drill_start_deviation,
        masters_teams_id: req.body.masters_teams_id,
        spr_wellplatforms_id: req.body.spr_wellplatforms_id,
        users_id: req.decoded.user_id
    });
    try {
        const plannedSinkingsWell = await PlannedSinkingWell.findOne({
            where: {
                [Op.and]: [
                    {
                        spr_wellplatforms_id: req.body.spr_wellplatforms_id
                    },
                    {
                        well: req.body.well
                    },
                    {
                        masters_teams_id: req.body.masters_teams_id
                    }
                ]
            }
        });
        if (plannedSinkingsWell) {
            await dayReport.save();
            res.status(201).json(dayReport);
        } else {
            res.status(500).json({
                message: `Для начала внесите плановые данные по скважине ${req.body.well}.`
            });
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getSinkingYear = async function (req, res) {
    try {
        const findDayReport = await DayReport.findOne({
            where: {
                hour_id: req.params.hour_id
            },
            include: [
                {
                    model: MasterTeam,
                    required: true
                }
            ]
        });
        const findAllYear = await DayReport.findAll({
            where: {
                [Op.and]: [
                    {
                        report_date: {
                            [Op.between]: [new Date(findDayReport._previousDataValues.report_date).getFullYear() + '-01-01', findDayReport._previousDataValues.report_date]
                        },
                    },
                    Sequelize.where(Sequelize.col((MasterTeam, "teams_id"), "varchar"), {
                        [Op.eq]: findDayReport._previousDataValues.masters_team.teams_id
                    }),
                    Sequelize.where(Sequelize.col(("spr_wellplatforms_id"), "varchar"), {
                        [Op.eq]: findDayReport._previousDataValues.spr_wellplatforms_id
                    })
                ]
            },
            include: [
                {
                    model: MasterTeam,
                    required: true
                }
            ]
        });

        var get_sinking_year = 0;

        for (var i = 0; i < findAllYear.length; i++) {
            get_sinking_year += findAllYear[i].dataValues.sinking_day
        }
        res.status(200).json({ sinking_day: get_sinking_year });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getSinkingMonth = async function (req, res) {
    try {
        const findDayReport = await DayReport.findOne({
            where: {
                hour_id: req.params.hour_id
            },
            include: [
                {
                    model: MasterTeam,
                    required: true
                }
            ]
        });

        var date = new Date(findDayReport._previousDataValues.report_date)
        const findAllMonth = await DayReport.findAll({
            where: {
                [Op.and]: [
                    {
                        report_date: {
                            [Op.between]: [new Date(date.getFullYear(), date.getMonth(), 1), date]
                        },
                    },
                    Sequelize.where(Sequelize.col((MasterTeam, "teams_id"), "varchar"), {
                        [Op.eq]: findDayReport._previousDataValues.masters_team.teams_id
                    }),
                    Sequelize.where(Sequelize.col(("spr_wellplatforms_id"), "varchar"), {
                        [Op.eq]: findDayReport._previousDataValues.spr_wellplatforms_id
                    })
                ]
            },
            include: [
                {
                    model: MasterTeam,
                    required: true
                }
            ]
        });

        var get_sinking_month = 0;

        for (var i = 0; i < findAllMonth.length; i++) {
            get_sinking_month += findAllMonth[i].dataValues.sinking_day
        }
        res.status(200).json({ sinking_day: get_sinking_month });
    } catch (e) {
        errorHandler(res, e);
    }

};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_day_reports/);
        let dayReport = {
            report_date: req.body.report_date,
            vAbsorbing: req.body.vAbsorbing,
            rest_oil: req.body.rest_oil,
            percent_liquid: req.body.percent_liquid,
            urgent_need: req.body.urgent_need,
            well: req.body.well,
            msgrp: req.body.msgrp,
            sinking_day: req.body.sinking_day,
            drill_start_deviation: req.body.drill_start_deviation,
            masters_teams_id: req.body.masters_teams_id,
            spr_wellplatforms_id: req.body.spr_wellplatforms_id
        }
        const plannedSinkingsWell = await PlannedSinkingWell.findOne({
            where: {
                [Op.and]: [
                    {
                        spr_wellplatforms_id: req.body.spr_wellplatforms_id
                    },
                    {
                        well: req.body.well
                    },
                    {
                        masters_teams_id: req.body.masters_teams_id
                    }
                ]
            }
        });
        if (plannedSinkingsWell) {
            await DayReport.update(dayReport, {
                where: {
                    hour_id: req.params.hour_id
                }
            });
            res.status(200).json(dayReport);
        } else {
            res.status(500).json({
                message: `Для начала внесите плановые данные по скважине ${req.body.well}.`
            });
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_day_reports/);
        await DayReport.destroy({
            where: {
                hour_id: req.params.hour_id
            }
        });
        res.status(200).json({
            message: "Сводка удалена."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.defaultCreate = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_day_reports/);
        var yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
        const query = {
            where: {
                [Op.and]: [
                    {
                        report_date: yesterday
                    },
                    {
                        users_id: req.decoded.user_id
                    }
                ]
            }
        }
        const body = await DayReport.findAll(query);
        if (body.length) {
            for (var i = 0; i < body.length; i++) {
                const dayReport = await new DayReport({
                    report_date: new Date,
                    vAbsorbing: 0,
                    rest_oil: 0,
                    percent_liquid: 0,
                    urgent_need: '',
                    well: body[i].dataValues.well,
                    sinking_day: 0,
                    drill_start_deviation: 0,
                    msgrp: false,
                    masters_teams_id: body[i].dataValues.masters_teams_id,
                    spr_wellplatforms_id: body[i].dataValues.spr_wellplatforms_id,
                    users_id: req.decoded.user_id
                });
                await dayReport.save();
                res.status(201).json(dayReport);
            }
        } else {
            res.status(404).json({
                message: "У вас нет записей за предыдущий день."
            });
        }
    } catch (e) {
        errorHandler(res, e);
    }
};