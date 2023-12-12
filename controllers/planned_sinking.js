const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const VPlannedSinking = db.v_planned_sinkings;
const PlannedSinking = db.planned_sinkings_team;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                [Op.and]: [
                    {
                        months_id: req.params.months_id,
                        year: req.params.year,
                        [Op.or]: [
                            Sequelize.where(
                                Sequelize.cast(Sequelize.col('sinking_month'), 'varchar'),
                                {
                                    [Op.like]: `%${req.query.search}%`
                                }
                            ),
                            {
                                master_name: {
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
                    }
                ]
            },
            order: [
                [req.query.sort, req.query.order]
            ],
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize
        };
        const plannedSinkings = await VPlannedSinking.findAndCountAll(query);
        res.status(200).json(plannedSinkings);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_planned_sinking/);
    const plannedSinking = await new PlannedSinking({
        sinking_month: req.body.sinking_month,
        months_id: req.body.months_id,
        years_id: req.body.years_id,
        masters_teams_id: req.body.masters_teams_id
    });
    try {
        await plannedSinking.save();
        res.status(201).json(plannedSinking);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_planned_sinking/);
        const plannedSinking = await PlannedSinking.update({
            sinking_month: req.body.sinking_month,
            masters_teams_id: req.body.masters_teams_id
        }, {
            where: {
                planned_sinking_id: req.params.planned_sinking_id
            }
        });
        res.status(200).json(plannedSinking);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_planned_sinking/);
        await PlannedSinking.destroy({
            where: {
                planned_sinking_id: req.params.planned_sinking_id
            }
        });
        res.status(200).json({
            message: "Плановая проходка удалена."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};


