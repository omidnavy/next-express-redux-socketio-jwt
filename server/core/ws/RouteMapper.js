'use strict';
const path = require('path');
const fs = require('fs');
const dir = path.join(__dirname, '../../components');
module.exports = class RouteMapper {
    constructor() {
        let components = {};
        fs.readdirSync(dir).forEach(component => {
            let componentDir = path.join(dir, component, 'ws-gateway.js');
            if (fs.existsSync(componentDir)) {
                let Controller = require(componentDir);
                components[component] = new Controller();
            }

        });
        return components
    }
};