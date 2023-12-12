const JWT = require("./jwt");

module.exports = function (roles = []) {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        JWT,
        (req, res, next) => {
            if (roles.length && !roles.includes(req.decoded.role_name)) {
                return res.status(403).json({ message: "У вас недостаточно прав." });
            }
            next();
        }
    ];
};
