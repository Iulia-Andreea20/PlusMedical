const crypto = require('crypto');

const aesKey = crypto.randomBytes(32).toString('base64');
console.log('AES Key:', aesKey);
