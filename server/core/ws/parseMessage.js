/**
 *
 * @param message
 */
const {capitalize} = require("../../../libs/strings");
exports.parseMessage = (message) => {
    const request = message.request.split('_');
    const method = request[0].toLowerCase();
    const component = capitalize(request[1].toLowerCase());
    const endpoint = request[2].toLowerCase();
    const data = message.data || false;
    return {request: message.request, method, component, endpoint, data};
};