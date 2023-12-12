const jwt = require("jsonwebtoken");
const config = require("../config/env");

module.exports = function (req, res, next) {
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(403).send({ auth: false, message: "Токен не предоставлен." });
    }

    jwt.verify(token, config.jwt_key, function (err, decoded) {
        if (err)
            return res.status(401).send({ auth: false, message: "Не удалось аутентифицировать токен." });
        req.decoded = decoded;
        next();
    });
};
