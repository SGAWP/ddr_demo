const errorHandler = require('../utils/errorHandler');
const cache = require('cache-all');
const Sequelize = require('sequelize');
const db = require('../config/db.config.js');
const Team = db.teams;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                [Op.or]: [
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('team_name'), 'varchar'),
                        {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    ),
                    {
                        comment: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    }
                ]
            },
            order: [
                [req.query.sort, req.query.order]
            ],
            offset: +req.query.pageSize * (+req.query.page - 1),
            limit: +req.query.pageSize
        };
        const teams = await Team.findAndCountAll(query);
        res.status(200).json(teams);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getAllIsActive = async function (req, res) {
    try {
        const query = {
            where: {
                is_active: true,
                [Op.or]: [
                    Sequelize.where(
                        Sequelize.cast(Sequelize.col('team_name'), 'varchar'),
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
        const teams = await Team.findAndCountAll(query);
        res.status(200).json(teams);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_teams/);
    const team = await new Team({
        team_name: req.body.team_name,
        comment: req.body.comment,
        is_active: req.body.is_active
    });
    try {
        await team.save();
        res.status(201).json(team);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_teams/);
        const team = await Team.update({
            team_name: req.body.team_name,
            comment: req.body.comment,
            is_active: req.body.is_active
        },
            {
                where: {
                    team_id: req.params.team_id
                }
            }
        );
        res.status(200).json(team);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_teams/);
        await Team.destroy({
            where: {
                team_id: req.params.team_id
            }
        });
        res.status(200).json({
            message: "Бригада удалена."
        });
    } catch (e) {
        errorHandler(res, e);
    }
};