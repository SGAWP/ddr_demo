const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/errorHandler");
const cache = require('cache-all');
const Sequelize = require("sequelize");
const db = require("../config/db.config.js");
const VUser = db.v_users;
const User = db.users;
const Op = Sequelize.Op;

module.exports.getAll = async function (req, res) {
    try {
        const query = {
            where: {
                [Op.or]: [
                    {
                        full_name: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        username: {
                            [Op.iLike]: `%${req.query.search}%`
                        }
                    },
                    {
                        role_name: {
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
        const users = await VUser.findAndCountAll(query);
        res.status(200).json(users);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getProfile = async function (req, res) {
    try {
        const user = await VUser.findByPk(req.decoded.user_id);
        res.status(200).json(user);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    cache.removeByPattern(/ddr_users/);
    const salt = await bcrypt.genSaltSync(10);
    const password = await req.body.password;
    const user = new User({
        full_name: req.body.full_name,
        username: req.body.username,
        password: bcrypt.hashSync(password, salt),
        roles_id: req.body.roles_id
    });
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.update = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_users/);
        const user = await User.update(
            {
                full_name: req.body.full_name,
                username: req.body.username,
                roles_id: req.body.roles_id
            },
            {
                where: {
                    user_id: req.params.user_id
                }
            }
        );
        res.status(200).json(user);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.updatePassword = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_users/);
        const salt = await bcrypt.genSaltSync(10);
        const password = await req.body.password;
        const user = await User.update(
            {
                password: bcrypt.hashSync(password, salt)
            },
            {
                where: {
                    user_id: req.params.user_id
                }
            }
        );
        res.status(200).json(user);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.resetPassword = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_users/);
        const salt = await bcrypt.genSaltSync(10);
        const password = await req.body.password;
        const user = await User.update(
            {
                password: bcrypt.hashSync(password, salt)
            },
            {
                where: {
                    user_id: req.decoded.user_id
                }
            }
        );
        res.status(200).json(user);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        cache.removeByPattern(/ddr_users/);
        const query = {
            where: {
                user_id: req.params.user_id
            }
        }
        let user = await User.findOne(query);
        if (user._previousDataValues.username === 'admin') {
            res.status(403).json({
                message: "Нельзя удалить данного пользователя."
            });
        } else {
            await User.destroy(query);
            res.status(200).json({
                message: "Пользователь удален."
            });
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
