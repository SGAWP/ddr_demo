const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const VPlannedSinkingWell = db.v_well_planned_sinkings;
const PlannedSinkingWell = db.planned_sinkings_well;
const DayReport = db.day_reports;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                [Op.or]: [
                    {
                        well: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        layer: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        customer_name: {
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
                    {
                        full_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        technology: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        type: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        drillrig_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('project_depth'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('chock'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    ),
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('diameter'), 'varchar'),
                        {
                            [Op.like]: `%${req.query.search}%`
                        }
                    )
                ]
            },
            order: [
                [req.query.sort, req.query.order]
            ],
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize
        };
        const plannedSinkingsWell = await VPlannedSinkingWell.findAndCountAll(query);
        res.status(200).json(plannedSinkingsWell);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_planned_data_well/);
    const plannedSinkingWell = await new PlannedSinkingWell({
        well: req.body.well,
        layer: req.body.layer,
        project_depth: req.body.project_depth,
        chock: req.body.chock,
        drill_start: req.body.drill_start,
        drill_end: req.body.drill_end,
        diameter: req.body.diameter,
        spr_customers_id: req.body.spr_customers_id,
        spr_wellplatforms_id: req.body.spr_wellplatforms_id,
        spr_well_purposes_id: req.body.spr_well_purposes_id,
        spr_technologies_id: req.body.spr_technologies_id,
        spr_types_id: req.body.spr_types_id,
        spr_drillrigs_id: req.body.spr_drillrigs_id,
        masters_teams_id: req.body.masters_teams_id
    });
    try {
        if (Date.parse(plannedSinkingWell.drill_start) < Date.parse(plannedSinkingWell.drill_end)) {
            await plannedSinkingWell.save();
            res.status(201).json(plannedSinkingWell);
        }
        else {
            res.status(500).json({
                message: "Дата конца не может быть меньше даты начала."
            });
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_planned_data_well/);
        let plannedSinkingWell = {
            well: req.body.well,
            layer: req.body.layer,
            project_depth: req.body.project_depth,
            chock: req.body.chock,
            drill_start: req.body.drill_start,
            drill_end: req.body.drill_end,
            diameter: req.body.diameter,
            spr_customers_id: req.body.spr_customers_id,
            spr_wellplatforms_id: req.body.spr_wellplatforms_id,
            spr_well_purposes_id: req.body.spr_well_purposes_id,
            spr_technologies_id: req.body.spr_technologies_id,
            spr_types_id: req.body.spr_types_id,
            spr_drillrigs_id: req.body.spr_drillrigs_id,
            masters_teams_id: req.body.masters_teams_id
        }
        if (Date.parse(plannedSinkingWell.drill_start) < Date.parse(plannedSinkingWell.drill_end)) {
            await PlannedSinkingWell.update(plannedSinkingWell, {
                where: {
                    planned_sinking_well_id: req.params.planned_sinking_well_id
                }
            });
            res.status(200).json(plannedSinkingWell);
        } else {
            res.status(500).json({
                message: "Дата конца не может быть меньше даты начала."
            });
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_planned_data_well/);
        cache.removeByPattern(/ddr_day_reports/);
        await PlannedSinkingWell.destroy({
            where: {
                [Op.and]: [
                    {
                        spr_wellplatforms_id: req.params.spr_wellplatforms_id
                    },
                    {
                        well: req.params.well
                    }
                ]
            }
        });
        await DayReport.destroy({
            where: {
                [Op.and]: [
                    {
                        spr_wellplatforms_id: req.params.spr_wellplatforms_id
                    },
                    {
                        well: req.params.well
                    }
                ]
            }
        });
        res.status(200).json({
            message: "Плановая и фактическая проходка для скважины удалена."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};



