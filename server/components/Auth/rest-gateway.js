'use strict';
const {signToken} = require('../../../libs/jwt');
module.exports = class Auth {


    constructor(router) {
        this.registerRoutes(router)
    }

    registerRoutes(router) {
        router.get('/', this.login.bind(this))
    }

    login(req, res) {
        let data = {role: 'admin', uid: 1};
        const token = signToken(data);

        return res.cookie('token', token).sendStatus(200)
    }
};