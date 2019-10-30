const config = require("config");

module.exports = function (req, res, next) {
    
    if (!config.get("requiresAuthAdmin")) return next();

    if (!req.user.isAdmin) return res.status(403).send('Access denied.')
    next();
}