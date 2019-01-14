'use strict';
const sharedsession = require("express-socket.io-session");
const Components = new (require('./RouteMapper'));
const {verifyToken} = require('../../../libs/jwt');
const {parse} = require("cookie");
const {parseMessage} = require('./parseMessage');
let connectCounter = 0;
module.exports = class WebSocket {
    /**
     *
     * @param {Object} server Server object returned from http.createServer
     */
    constructor(server) {
        let io = require('socket.io')(server);
        io.use(sharedsession(session, {autoSave: true}));
        // io.origins('localhost:3000')
        this.handleConnection(io);
        console.log(io.engine.clientsCount);
        setInterval(() => console.log(io.engine.clientsCount), 5000)
    }

    handleConnection(io) {
        // noinspection JSUnresolvedFunction
        io.use((socket, next) => {
            try {
                const cookie = parse(socket.handshake.headers.cookie);
                const {role, uid} = verifyToken(cookie.token);
                socket.handshake.session.userdata = {role, uid};
                socket.handshake.session.save();
                next();
            } catch (e) {
                socket.disconnect()
            }


        });
        io.on('connection', socket => {
            socket.use((connection, next) => {
                try {
                    connection[1] = parseMessage(connection[1]);
                    next()
                } catch (e) {
                    console.log(e)
                    next(new Error('invalid request'))
                }
            });

            socket.on('message', async message => {
                const {request, method, component, endpoint, data} = message;
                try {
                     Components[component][`${method}${endpoint}`](request,socket,data)

                } catch (e) {
                    console.log(e)
                    socket.emit('error', new Error('500 internal error'))
                }

            });


            console.log('connected');
            connectCounter++;
            socket.on('disconnect', function () {
                console.log('disconnect');
                connectCounter--;
            });
        })

    }


};