module.exports = class GatewayBase {
    constructor() {
        this.handler = {
            get: (target, prop, receiver) => {
                if (typeof target[prop] === "function") return (request, socket, data) => {
                    if (!target.permission[prop] || target.permission[prop].includes(socket.handshake.session.userdata.role)) return target[prop](request, socket, data)
                    else socket.emit(403, {request})
                };
                else return target[prop]
            }
        }
    }

};