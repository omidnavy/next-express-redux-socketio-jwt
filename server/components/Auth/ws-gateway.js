'use strict';
const {signToken} = require('../../../libs/jwt');
module.exports = class Auth {
    constructor() {
        this.permission = {
            login: ['guest']
        }
    }

    login(data) {
        data = {role: 'admin', uid: 1};
        const token = signToken(data)
        return token
    }

};