'use strict';
const express = require('express');
const RouteMapper = require('./RouteMapper');
const MiddleWares = require('./MiddleWares');

module.exports = class ExpressServer {
    constructor(nextHandler) {
        this.expressServer = express();
        new MiddleWares(this.expressServer);

        new RouteMapper(this.expressServer, nextHandler);
        return this.expressServer
    }
};