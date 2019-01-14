'use strict';
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");




module.exports = class MiddleWares {
    constructor(server) {
        server.use(session);
        server.use(express.static("public"));
        server.use(bodyParser.urlencoded({extended: false}));
        server.use(cookieParser());
    }

};