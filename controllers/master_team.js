const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const VMasterTeam = db.v_masters_teams;
const MasterTeam = db.masters_teams;
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
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('team_name'), 'varchar'),
                        {
                            [Op.iLike]: `%${req.query.search}%`
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
        const masters_teams = await VMasterTeam.findAndCountAll(query);
        res.status(200).json(masters_teams);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_masters_teams/);
    const master_team = await new MasterTeam({
        masters_id: req.body.masters_id,
        teams_id: req.body.teams_id
    });
    try {
        await master_team.save();
        res.status(201).json(master_team);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_masters_teams/);
        const master_team = await MasterTeam.update({
            masters_id: req.body.masters_id,
            teams_id: req.body.teams_id
        }, {
            where: {
                master_team_id: req.params.master_team_id
            }
        });
        res.status(200).json(master_team);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_masters_teams/);
        await MasterTeam.destroy({
            where: {
                master_team_id: req.params.master_team_id
            }
        });
        res.status(200).json({
            message: "Мастер и Бригада удалены."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};

