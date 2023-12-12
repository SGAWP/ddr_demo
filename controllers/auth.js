const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/env");
const errorHandler = require("../utils/errorHandler");
const db = require("../config/db.config.js");
const User = db.users;
const Role = db.roles;

module.exports.login = async function (req, res) {
    try {
        const query = {
            where: {
                username: req.body.username
            },
            include: [
                {
                    model: Role,
                    required: true
                }
            ]
        };
        const user = await User.findOne(query);
        if (user) {
            const passwordResult = bcrypt.compareSync(req.body.password, user.password);
            if (passwordResult) {
                const token = jwt.sign({
                    user_id: user.user_id,
                    role_name: user.role.role_name
                }, config.jwt_key, {
                    expiresIn: "1h",
                });
                res.status(200).json({
                    token: `Bearer ${token}`
                });
            } else {
                res.status(401).json({
                    message:
                        "К сожалению, вы ввели неверный пароль. Проверьте свой пароль еще раз."
                });
            }
        } else {
            res.status(404).json({
                message:
                    "Введенное вами имя пользователя не принадлежит аккаунту. Проверьте свое имя пользователя и повторите попытку."
            });
        }
    } catch (e) {
        errorHandler(res, e);
    }
};
