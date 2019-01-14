'use strict';
const jwt = require('jsonwebtoken');
const secret = 'my-secret-key';
exports.verifyToken = token => {
    return jwt.verify(token, secret)
};
exports.signToken = data => jwt.sign(data, secret);