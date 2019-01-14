'use strict';
const BaseRest = require('../../core/express/gateway-base');
const components = require('./components');
const permissions = require('./permission');
module.exports = class User extends BaseRest {
    constructor(router) {
        super();
        this.registerRoutes(router)
    }

    registerRoutes(router) {
        router.get('/info/:id', this.permissionMiddleware(permissions.getinfo), this.getinfo.bind(this))
    }

    getinfo(req, res) {
        let response = components.getinfo({id: +req.params.id});
        res.send(response)
    }
};