'use strict';
const {verifyToken} = require("../../../libs/jwt");

module.exports = class BaseRest {
    permissionMiddleware(permission) {

        return (req, res, next) => {
            try {
                const cookies = req.cookies;
                const {role, uid} = verifyToken(cookies.token);
                if (!permission.includes(role)) return res.sendStatus(403);
                req.userdata = {role, uid};
                next()

            } catch (e) {
                return res.sendStatus(403)
            }

            // console.log(req.session.userdata)
            // console.log(req.session.userdata.role)
            // console.log(permission.includes(req.session.userdata.role))
            // if (req.session.userdata && req.session.userdata.role && permission.includes(req.session.userdata.role)) return next();
            // else next()
            return next()
        }

    }
}