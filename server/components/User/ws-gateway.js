'use strict';
const BaseClass = require('../../core/ws/gateway-base');
const components = require('./components');
const permissions = require('./permission');
module.exports = class User extends BaseClass {
    constructor() {
        super();
        this.permission = permissions;
        return new Proxy(this, this.handler)
    }

    async getinfo(req, res, data) {
        try {
            res.send({
                request: req, response: await components.getinfo(data)
            })
        } catch (e) {
            res.emit('error-request', {req})
        }
    }


};