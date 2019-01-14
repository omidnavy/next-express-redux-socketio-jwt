const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const key = 'b2df428b9929d3ace7c598bbf4e496b2';
const inputEncoding = 'utf8';
const outputEncoding = 'hex';

exports.encryptAES = data => {
    const cipher = crypto.createCipher(algorithm, key);
    let crypted = cipher.update(data, inputEncoding, outputEncoding);
    crypted += cipher.final(outputEncoding);
    return crypted;
};

exports.decryptAES = data => {
    const decipher = crypto.createDecipher(algorithm, key);
    let dec = decipher.update(data, outputEncoding, inputEncoding);
    dec += decipher.final(inputEncoding);
    return dec;
};