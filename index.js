'use strict';
const {createServer} = require('http');

const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();

const ws = require('./server/core/ws');
const express = require('./server/core/express');

global.session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});

(async () => {
    await nextApp.prepare();
    const Express = new express(handle);
    const httpServer = createServer(Express);
    const WebSocket = new ws(httpServer);


    httpServer.listen(3000, () => console.log(`http/ws server listening on 3000`));

})();

