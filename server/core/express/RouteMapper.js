'use strict';
const {Router} = require('express');
const path = require('path');
const fs = require('fs');
const dir = path.join(__dirname, '../../components');
module.exports = class RouteMapper {

    constructor(server, nextHandler) {
        this.mapControllers(server);
        server.get('*', (req, res) => nextHandler(req, res));

    }

    mapControllers(server) {
        let Controller, router, urlPath, bindControllerRoutes;
        fs.readdirSync(dir).forEach((component) => {
            const componentDir = path.join(dir, component, 'rest-gateway.js');
            if (fs.existsSync(componentDir)) {
                router = Router();
                Controller = require(componentDir);
                urlPath = component.toString().toLowerCase();
                server.use("/api/" + urlPath, router);
                bindControllerRoutes = new Controller(router);
            }
        });
    }
};